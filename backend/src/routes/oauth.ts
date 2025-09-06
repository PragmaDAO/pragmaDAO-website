import express from 'express';
import passport from 'passport';

const router = express.Router();

// Google OAuth
router.get('/google',
  (req, res, next) => {
    console.log('Inside /api/auth/google');
    next();
  },
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), // Redirect to login on failure
  (req, res) => {
    // Successful authentication, redirect home or to a success page
    res.redirect('http://localhost:3000/lessons'); // Redirect to frontend lessons page
  }
);

// GitHub OAuth
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }), // Redirect to login on failure
  (req, res) => {
    // Successful authentication, redirect home or to a success page
    res.redirect('http://localhost:3000/lessons'); // Redirect to frontend lessons page
  }
);

export default router;