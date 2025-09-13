# PragmaDAO Deployment Guide

## Overview
This guide covers deploying the PragmaDAO website to either Vercel (frontend only) or Render (full-stack).

## Prerequisites
- Your GitHub repository pushed with latest changes
- Account on your chosen platform (Vercel or Render)
- Database provider account (for backend deployment)

## Option 1: Vercel Deployment (Frontend + Separate Backend)

### Step 1: Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project" and import your GitHub repository
3. Vercel will auto-detect it as a React app
4. **Environment Variables** - Add in Vercel dashboard:
   ```
   REACT_APP_BACKEND_URL=https://your-backend-url.com
   ```
5. Deploy - Vercel will use the `vercel.json` configuration

### Step 2: Deploy Backend Separately
You'll need to deploy your backend to a service like:
- Railway
- Render
- Heroku
- DigitalOcean App Platform

**Backend Environment Variables Needed:**
```
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
```

## Option 2: Render Deployment (Full-Stack)

### Step 1: Create Render Account
1. Go to [render.com](https://render.com) and sign up/login
2. Connect your GitHub account

### Step 2: Deploy Using Blueprint (render.yaml)
1. In Render dashboard, click "New" → "Blueprint"
2. Connect your GitHub repository
3. Render will detect the `render.yaml` file automatically
4. **Set Environment Variables:**

**Frontend Service:**
```
REACT_APP_BACKEND_URL=https://pragmadao-backend.onrender.com
```

**Backend Service:**
```
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters
NODE_ENV=production
```

### Step 3: Database Setup
1. Render will create a PostgreSQL database automatically
2. Copy the DATABASE_URL from the database service
3. Paste it into your backend service environment variables

## Environment Variables Explained

### Frontend Variables
- `REACT_APP_BACKEND_URL`: URL where your backend API is hosted

### Backend Variables
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens (use a long, random string)
- `NODE_ENV`: Set to "production"

## Generating Secure JWT Secret
```bash
# Option 1: Using openssl
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online generator
# Visit: https://generate-secret.vercel.app/32
```

## Database Setup Options

### Option 1: Render PostgreSQL (Recommended for Render deployment)
- Automatically included in render.yaml
- Free tier available
- Automatic backups

### Option 2: Supabase (Works with any deployment)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Format: `postgresql://postgres:[password]@[host]:5432/postgres`

### Option 3: Railway PostgreSQL
1. Go to [railway.app](https://railway.app)
2. Create new PostgreSQL database
3. Get connection string from database settings

### Option 4: PlanetScale (MySQL alternative)
1. Go to [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string (you'll need to update Prisma schema)

## Post-Deployment Steps

1. **Database Migration:**
   ```bash
   # Your backend should run this automatically, but if needed:
   npx prisma migrate deploy
   npx prisma generate
   ```

2. **Test the Application:**
   - Try registering a new user
   - Login and test lesson progress
   - Verify Solidity compilation works

3. **Custom Domain (Optional):**
   - Vercel: Add domain in project settings
   - Render: Add custom domain in service settings

## Troubleshooting

### Common Issues:

1. **"Cannot connect to database"**
   - Check DATABASE_URL format
   - Ensure database is running
   - Check firewall settings

2. **"JWT Secret not found"**
   - Verify JWT_SECRET environment variable is set
   - Must be at least 32 characters long

3. **"Cannot fetch from backend"**
   - Check REACT_APP_BACKEND_URL is correct
   - Ensure backend is running
   - Check CORS settings in backend

4. **Build fails on Vercel**
   - Check if all dependencies are in package.json
   - Verify Node.js version compatibility

### Environment Variable Debugging:
```javascript
// Add to your frontend for debugging (remove in production):
console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);

// Add to your backend:
console.log('Database URL set:', !!process.env.DATABASE_URL);
console.log('JWT Secret set:', !!process.env.JWT_SECRET);
```

## Security Notes

- Never commit .env files to GitHub
- Use strong, unique JWT secrets
- Enable HTTPS in production
- Consider rate limiting for API endpoints
- Regularly update dependencies

## Cost Estimates

### Vercel (Frontend only)
- **Free tier**: 100GB bandwidth, unlimited projects
- **Pro**: $20/month per member

### Render (Full-stack)
- **Free tier**: Web service + PostgreSQL (limited)
- **Starter**: $7/month web service + $7/month database

### Database Options
- **Render PostgreSQL**: Free (limited) or $7/month
- **Supabase**: Free tier available, paid plans start at $25/month
- **Railway**: $5/month for PostgreSQL

Choose the option that best fits your budget and scaling needs!