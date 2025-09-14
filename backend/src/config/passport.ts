import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: process.env.NODE_ENV === 'production'
    ? "https://pragmadao-backend.onrender.com/api/auth/github/callback"
    : "/api/auth/github/callback"
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
  try {
    console.log('GitHub profile:', profile);
    return done(null, profile);
  } catch (error) {
    console.error('GitHub strategy error:', error);
    return done(error, null);
  }
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.NODE_ENV === 'production'
    ? "https://pragmadao-backend.onrender.com/api/auth/google/callback"
    : "/api/auth/google/callback"
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
  try {
    console.log('Google profile:', profile);
    return done(null, profile);
  } catch (error) {
    console.error('Google strategy error:', error);
    return done(error, null);
  }
}));

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
