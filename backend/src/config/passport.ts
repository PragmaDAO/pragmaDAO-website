import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

passport.serializeUser((user: User, done: (err: any, id?: string) => void) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: (err: any, user?: User | null) => void) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: 'http://localhost:3003/api/auth/google/callback',
    scope: ['profile', 'email'],
  },
  async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: User | null) => void) => {
    try {
      let user = await prisma.user.findUnique({ where: { googleId: profile.id } });

      if (user) {
        // User found by googleId, check if email is updated or link if not already linked
        if (user.email !== profile.emails?.[0]?.value) {
          // Optionally update email if it changed on Google
          user = await prisma.user.update({
            where: { id: user.id },
            data: { email: profile.emails?.[0]?.value },
          });
        }
        return done(null, user);
      }

      // No user found by googleId, check by email
      user = await prisma.user.findUnique({ where: { email: profile.emails?.[0]?.value } });

      if (user) {
        // User found by email, link Google account
        user = await prisma.user.update({
          where: { id: user.id },
          data: { googleId: profile.id },
        });
        return done(null, user);
      }

      // No user found, create a new one
      const newUser = await prisma.user.create({
        data: {
          username: profile.displayName || profile.emails?.[0]?.value.split('@')[0],
          email: profile.emails?.[0]?.value!,
          googleId: profile.id,
          // password is not required for social logins
        },
      });
      done(null, newUser);
    } catch (error) {
      done(error, null);
    }
  }
));

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: 'http://localhost:3003/api/auth/github/callback',
    scope: ['user:email'], // Request email scope
  },
  async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: User | null) => void) => {
    try {
      let user = await prisma.user.findUnique({ where: { githubId: profile.id.toString() } });

      if (user) {
        // User found by githubId, check if email is updated or link if not already linked
        if (profile.emails?.[0]?.value && user.email !== profile.emails[0].value) {
          // Optionally update email if it changed on GitHub
          user = await prisma.user.update({
            where: { id: user.id },
            data: { email: profile.emails[0].value },
          });
        }
        return done(null, user);
      }

      // No user found by githubId, check by email
      user = await prisma.user.findUnique({ where: { email: profile.emails?.[0]?.value } });

      if (user) {
        // User found by email, link GitHub account
        user = await prisma.user.update({
          where: { id: user.id },
          data: { githubId: profile.id.toString() },
        });
        return done(null, user);
      }

      // No user found, create a new one
      const newUser = await prisma.user.create({
        data: {
          username: profile.displayName || profile.username!,
          email: profile.emails?.[0]?.value!,
          githubId: profile.id.toString(),
          // password is not required for social logins
        },
      });
      done(null, newUser);
    } catch (error) {
      done(error, null);
    }
  }
));

export default passport;