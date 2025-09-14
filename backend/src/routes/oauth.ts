import express, { Request, Response, Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router: Router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login` }),
  async (req: Request, res: Response) => {
    try {
      const githubUser = req.user as any;
      
      if (!githubUser) {
        return res.redirect(`${FRONTEND_URL}/login?error=oauth_failed`);
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

      res.redirect(`${FRONTEND_URL}/?token=${token}&user=${encodeURIComponent(JSON.stringify({ id: user.id, username: user.username, email: user.email }))}`);

    } catch (error) {
      console.error('OAuth callback error:', error);
      res.redirect(`${FRONTEND_URL}/login?error=oauth_callback_failed`);
    }
  }
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login` }),
  async (req: Request, res: Response) => {
    try {
      const googleUser = req.user as any;

      if (!googleUser) {
        return res.redirect(`${FRONTEND_URL}/login?error=oauth_failed`);
      }

      let user = await prisma.user.findUnique({
        where: { email: googleUser.emails[0].value }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            username: googleUser.displayName || googleUser.name.givenName,
            email: googleUser.emails[0].value,
          }
        });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.redirect(`${FRONTEND_URL}/?token=${token}&user=${encodeURIComponent(JSON.stringify({ id: user.id, username: user.username, email: user.email }))}`);

    } catch (error) {
      console.error('Google OAuth callback error:', error);
      res.redirect(`${FRONTEND_URL}/login?error=oauth_callback_failed`);
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