# 🚀 Free Deployment Guide: Vercel + Render

Deploy your complete Notes App for **FREE** using Vercel (frontend) and Render (backend + database).

## 🏗️ Architecture Overview

```
Frontend (React)     Backend (Spring Boot)     Database
    Vercel       ←→        Render           ←→   Render PostgreSQL
   (Free tier)            (Free tier)           (Free tier)
```

## 📋 Prerequisites

1. **GitHub Account** (for code hosting)
2. **Vercel Account** (sign up at vercel.com)
3. **Render Account** (sign up at render.com)
4. **Git installed** locally

## 🎯 Step 1: Prepare Your Code Repository

### 1.1 Initialize Git Repository (if not already done)

```bash
# In your notes_app directory
git init
git add .
git commit -m "Initial commit with React frontend and Spring Boot backend"
```

### 1.2 Create GitHub Repository

1. Go to **GitHub.com** and create a new repository called `notes-app`
2. **Don't** initialize with README (we already have files)
3. Copy the repository URL

### 1.3 Push Code to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/notes-app.git
git branch -M main
git push -u origin main
```

## 🗄️ Step 2: Deploy Database on Render

### 2.1 Create PostgreSQL Database

1. **Go to [Render.com](https://render.com)** and sign up/login
2. **Click "New +"** → **"PostgreSQL"**
3. **Configure database:**
   - **Name**: `notes-db`
   - **Database**: `notesdb`
   - **User**: `notesuser`
   - **Region**: Choose closest to you
   - **Plan**: **Free** (500MB storage, 90 days retention)
4. **Click "Create Database"**

### 2.2 Get Database Connection Details

Once created, you'll see:
- **Internal Database URL**: Used by your backend
- **External Database URL**: For external connections
- **Host, Port, Database, Username, Password**

**Save these details** - you'll need them for the backend deployment.

## ⚙️ Step 3: Deploy Backend on Render

### 3.1 Create Web Service

1. **In Render Dashboard** → **"New +"** → **"Web Service"**
2. **Connect Repository:**
   - Choose **"Build and deploy from a Git repository"**
   - **Connect your GitHub account** if not already connected
   - **Select** your `notes-app` repository

### 3.2 Configure Web Service

```yaml
Name: notes-backend
Environment: Java
Region: [Same as your database]
Branch: main
Build Command: mvn clean install
Start Command: java -Dspring.profiles.active=postgres -jar target/notes-app-0.0.1-SNAPSHOT.jar
```

### 3.3 Set Environment Variables

In the **Environment** tab, add:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | [Internal Database URL from Step 2.2] |
| `DB_USERNAME` | `notesuser` |
| `DB_PASSWORD` | [Database password from Step 2.2] |
| `SPRING_PROFILES_ACTIVE` | `postgres` |

### 3.4 Deploy Backend

1. **Click "Create Web Service"**
2. **Wait 5-10 minutes** for deployment
3. **Your backend URL** will be: `https://notes-backend-XXXX.onrender.com`

### 3.5 Test Backend

Visit: `https://YOUR_BACKEND_URL.onrender.com/notes`

You should see: `[]` (empty array) or sample notes if data.sql loaded.

## 🎨 Step 4: Deploy Frontend on Vercel

### 4.1 Prepare Frontend for Deployment

Create environment file for production:

```bash
# In notes-frontend directory
echo "REACT_APP_API_BASE_URL=https://YOUR_BACKEND_URL.onrender.com" > .env.production
```

**Replace `YOUR_BACKEND_URL`** with your actual Render backend URL.

### 4.2 Deploy to Vercel

**Option A: Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd notes-frontend

# Deploy
vercel --prod

# Follow prompts:
# - Setup and deploy? Y
# - Which scope? [Your account]
# - Link to existing project? N
# - What's your project's name? notes-frontend
# - In which directory is your code located? ./
# - Want to override the settings? N
```

**Option B: Vercel Dashboard**

1. **Go to [Vercel.com](https://vercel.com)** and login
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure:**
   - **Framework Preset**: Create React App
   - **Root Directory**: `notes-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. **Add Environment Variable:**
   - `REACT_APP_API_BASE_URL`: `https://YOUR_BACKEND_URL.onrender.com`
6. **Click "Deploy"**

### 4.3 Get Frontend URL

After deployment, your frontend will be available at:
`https://notes-frontend-XXXX.vercel.app`

## 🎉 Step 5: Test Your Deployment

### 5.1 Test Complete Flow

1. **Visit your frontend URL**
2. **Create a new note**
3. **Edit the note**
4. **Delete the note**
5. **Verify all CRUD operations work**

### 5.2 Check Backend Logs

If something doesn't work:
1. **Go to Render Dashboard** → **Your backend service**
2. **Click "Logs"** to see backend errors
3. **Common issues:**
   - Database connection problems
   - CORS issues
   - Environment variables not set

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Backend won't start
```bash
# Check Render logs for:
- Java version issues → Ensure system.properties has java.runtime.version=17
- Maven build failures → Check pom.xml
- Database connection → Verify DATABASE_URL
```

**Problem**: 500 Internal Server Error
```bash
# Common causes:
- Database not accessible
- Missing environment variables
- Application properties misconfiguration
```

### Frontend Issues

**Problem**: Can't connect to backend
```bash
# Check:
- REACT_APP_API_BASE_URL is set correctly
- Backend URL is accessible
- No CORS errors in browser console
```

**Problem**: Build fails on Vercel
```bash
# Solutions:
- Ensure package.json is in notes-frontend directory
- Check for TypeScript errors
- Verify all dependencies are in package.json
```

### Database Issues

**Problem**: Database connection timeout
```bash
# Solutions:
- Ensure backend and database are in same region
- Check DATABASE_URL format
- Verify database is active (Render free tier sleeps)
```

## 💡 Optimization Tips

### 1. Keep Services Awake

**Render Free Tier** services sleep after 15 minutes of inactivity:

```bash
# Use a service like UptimeRobot to ping your backend every 10 minutes
# Ping URL: https://YOUR_BACKEND_URL.onrender.com/notes
```

### 2. Environment Variables

**For different environments:**

```bash
# Development
REACT_APP_API_BASE_URL=http://localhost:8080

# Production  
REACT_APP_API_BASE_URL=https://notes-backend-XXXX.onrender.com
```

### 3. Custom Domain (Optional)

**Vercel** allows custom domains on free tier:
1. **Go to Project Settings** → **Domains**
2. **Add your custom domain**
3. **Configure DNS** as instructed

## 📊 Free Tier Limits

### Vercel (Frontend)
- ✅ **Unlimited** personal projects
- ✅ **100GB** bandwidth/month
- ✅ **Custom domains**
- ✅ **HTTPS included**

### Render (Backend)
- ✅ **750 hours/month** (enough for one always-on service)
- ✅ **500MB RAM**
- ❌ **Sleeps after 15 min** inactivity
- ❌ **Cold start delays**

### Render PostgreSQL (Database)
- ✅ **500MB** storage
- ✅ **90 days** retention
- ❌ **Expires after 90 days** (need to recreate)

## 🔄 Continuous Deployment

Both platforms support **automatic deployments**:

- **Vercel**: Redeploys frontend on every push to `main`
- **Render**: Redeploys backend on every push to `main`

## 🌟 Production Checklist

Before going live:

- [ ] Backend responds to all API endpoints
- [ ] Frontend can create, read, update, delete notes
- [ ] Database persists data correctly
- [ ] Error handling works (try invalid requests)
- [ ] Mobile responsive design works
- [ ] HTTPS enabled (automatic on both platforms)
- [ ] Environment variables set correctly
- [ ] Logs are clean (no errors in Render logs)

## 📝 Final URLs

After successful deployment, you'll have:

```
🌐 Frontend: https://notes-frontend-XXXX.vercel.app
🔧 Backend:  https://notes-backend-XXXX.onrender.com  
🗄️ Database: [Internal to Render]
```

## 🚀 Share Your Project

Your app is now live and **shareable**! Anyone can visit your frontend URL and use your Notes App.

**Pro tip**: Add your live URL to your GitHub repository description for easy access.

---

## 🆘 Need Help?

If you run into issues:

1. **Check the logs** in Render dashboard
2. **Inspect network tab** in browser dev tools
3. **Verify environment variables** are set correctly
4. **Test API endpoints** directly with curl or Postman

**Common deployment errors** and solutions are in the troubleshooting section above.

**🎉 Congratulations!** Your Notes App is now deployed and accessible worldwide for free!