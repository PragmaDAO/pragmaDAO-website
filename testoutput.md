# GitHub OAuth Profile Page Fix - Complete Solution

## Problem Diagnosis
Your profile page doesn't appear after GitHub OAuth because there's a mismatch between your authentication flows:
- OAuth uses Passport sessions (stores user in `req.user`)
- Profile page expects JWT tokens from `AuthContext`
- Missing OAuth callback handler to bridge this gap

## Required Environment Variables
Add to your `.env` file:
```
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
JWT_SECRET=your_jwt_secret_key
```

## 1. Update OAuth Router (routes/oauth.ts)
```typescript
import express, { Request, Response, Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router: Router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req: Request, res: Response) => {
    try {
      const githubUser = req.user as any;
      
      if (!githubUser) {
        return res.redirect('/login?error=oauth_failed');
      }

      let user = await prisma.user.findUnique({
        where: { email: githubUser.emails[0].value }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            username: githubUser.username || githubUser.displayName,
            email: githubUser.emails[0].value,
          }
        });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.redirect(`http://localhost:3000/?token=${token}&user=${encodeURIComponent(JSON.stringify({ id: user.id, username: user.username, email: user.email }))}`);
      
    } catch (error) {
      console.error('OAuth callback error:', error);
      res.redirect('/login?error=oauth_callback_failed');
    }
  }
);

router.get('/session-to-jwt', (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const user = req.user as any;
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
});

export default router;
```

## 2. Update Passport Configuration (config/passport.ts)
```typescript
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: "/api/auth/github/callback"
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
  try {
    console.log('GitHub profile:', profile);
    return done(null, profile);
  } catch (error) {
    console.error('GitHub strategy error:', error);
    return done(error, null);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user.id || user);
});

passport.deserializeUser(async (id: any, done) => {
  try {
    if (typeof id === 'string' && id.match(/^\d+$/)) {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } else {
      done(null, id);
    }
  } catch (error) {
    done(error, null);
  }
});
```

## 3. Install Required Dependencies
```bash
npm install passport-github2
npm install @types/passport-github2 --save-dev
```

## 4. Add OAuth Callback Handler to App.tsx
Add this function inside your App component:
```typescript
import { useAuth } from './context/AuthContext';

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const { login } = useAuth();
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userStr = urlParams.get('user');
        
        if (token && userStr) {
            try {
                const user = JSON.parse(decodeURIComponent(userStr));
                login(token, user);
                window.history.replaceState({}, document.title, window.location.pathname);
                setCurrentPage('profile');
            } catch (error) {
                console.error('Error parsing OAuth callback:', error);
            }
        }
    }, [login]);
    
    // ... rest of your component
}
```

## 5. Add GitHub Login Button
In your LoginPage.tsx or RegisterPage.tsx:
```typescript
<button 
  onClick={() => window.location.href = 'http://localhost:3003/api/auth/github'}
  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
>
  Sign in with GitHub
</button>
```

## 6. Update Your Database Schema (if needed)
Add GitHub ID field to your User model in Prisma schema:
```prisma
model User {
  id        String   @id @default(cuid())
  username  String   @unique
  email     String   @unique
  githubId  String?  @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 7. GitHub OAuth App Setup
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App with:
   - Application name: Your App Name
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3003/api/auth/github/callback`
3. Copy Client ID and Client Secret to your `.env` file

## Flow Summary
1. User clicks "Sign in with GitHub" → Redirects to `/api/auth/github`
2. GitHub OAuth → Redirects to `/api/auth/github/callback`
3. Callback creates/finds user → Generates JWT token
4. Redirects to frontend with token in URL params
5. Frontend extracts token → Updates AuthContext
6. Profile page now works with JWT authentication

## Security Notes
- URL token passing is acceptable for development but consider secure cookies for production
- Ensure HTTPS in production
- Set proper CORS origins
- Use secure session secrets

This solution bridges the gap between OAuth sessions and JWT authentication, allowing your profile page to work correctly after GitHub authentication.
]
## Commit that has test cases section:
f82bbec

If I ever ask for this the test cases section in one of the lessons, please grab the test cases section code from this commit.