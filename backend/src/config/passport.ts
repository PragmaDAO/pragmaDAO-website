import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Only configure GitHub strategy if credentials are provided
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
} else {
  console.warn('GitHub OAuth not configured - GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables are missing');
}

passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
  done(null, user.id || user);
});

passport.deserializeUser(async (id: any, done: (err: any, user?: any) => void) => {
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
