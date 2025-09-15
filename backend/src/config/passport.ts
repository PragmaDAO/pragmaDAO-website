import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: "https://api.pragmadao.com/api/auth/github/callback"
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
  try {
    console.log('GitHub profile:', profile);
    return done(null, profile);
  } catch (error) {
    console.error('GitHub strategy error:', error);
    return done(error, null);
  }
}));

// Only configure Google OAuth if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://api.pragmadao.com/api/auth/google/callback"
  }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      console.log('Google profile:', profile);
      return done(null, profile);
    } catch (error) {
      console.error('Google strategy error:', error);
      return done(error, null);
    }
  }));
} else {
  console.log('Google OAuth not configured - GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET required');
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
