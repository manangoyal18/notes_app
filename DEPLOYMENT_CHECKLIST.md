# 📋 Deployment Checklist

Use this checklist to ensure smooth deployment of your Notes App.

## 🎯 Pre-Deployment Setup

### Backend Preparation
- [ ] `system.properties` file exists with Java 17
- [ ] `render.yaml` configuration file created
- [ ] PostgreSQL configuration in `application-postgres.properties`
- [ ] CORS enabled in controller (`@CrossOrigin(origins = "*")`)
- [ ] Environment variables configured for DATABASE_URL

### Frontend Preparation  
- [ ] `.env.example` file created
- [ ] API base URL configurable via environment variables
- [ ] Build process works locally (`npm run build`)
- [ ] All API calls use environment variable for base URL

### Repository Setup
- [ ] `.gitignore` configured for both frontend and backend
- [ ] All code committed to Git
- [ ] GitHub repository created and code pushed
- [ ] Repository is public (for free tier deployments)

## 🗄️ Database Deployment (Render)

- [ ] Render account created
- [ ] PostgreSQL database created with name `notes-db`
- [ ] Database name set to `notesdb`
- [ ] Username set to `notesuser`  
- [ ] Free plan selected
- [ ] Internal Database URL copied and saved
- [ ] External Database URL noted for testing

## ⚙️ Backend Deployment (Render)

- [ ] Web service created and linked to GitHub repository
- [ ] Service name set to `notes-backend`
- [ ] Environment set to `Java`
- [ ] Build command: `mvn clean install`
- [ ] Start command: `java -Dspring.profiles.active=postgres -jar target/notes-app-0.0.1-SNAPSHOT.jar`
- [ ] Environment variables configured:
  - [ ] `DATABASE_URL` (from database)
  - [ ] `SPRING_PROFILES_ACTIVE=postgres`
- [ ] Deployment successful (no errors in logs)
- [ ] Backend URL accessible and returns valid responses
- [ ] Test endpoint: `GET /notes` returns `[]` or sample data

## 🎨 Frontend Deployment (Vercel)

- [ ] Vercel account created  
- [ ] Project imported from GitHub repository
- [ ] Framework preset set to `Create React App`
- [ ] Root directory set to `notes-frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`
- [ ] Environment variable added:
  - [ ] `REACT_APP_API_BASE_URL` (backend URL from Render)
- [ ] Deployment successful
- [ ] Frontend loads without errors
- [ ] API calls work (check browser network tab)

## 🧪 End-to-End Testing

### Functionality Tests
- [ ] **Homepage loads** without errors
- [ ] **Create note** works (form submission successful)
- [ ] **View notes list** displays created notes  
- [ ] **View single note** shows full note details
- [ ] **Edit note** pre-fills form and saves changes
- [ ] **Delete note** removes note from list
- [ ] **Error handling** shows appropriate messages
- [ ] **Loading states** appear during API calls

### Cross-Browser Testing
- [ ] **Chrome** - All features work
- [ ] **Firefox** - All features work  
- [ ] **Safari** - All features work
- [ ] **Mobile Chrome** - Responsive and functional
- [ ] **Mobile Safari** - Responsive and functional

### Performance Checks
- [ ] **Page load time** under 3 seconds
- [ ] **API response time** under 2 seconds
- [ ] **No console errors** in browser dev tools
- [ ] **No 404 errors** for assets
- [ ] **Mobile responsive** design works

## 🔧 Post-Deployment Configuration

### Monitoring Setup
- [ ] **UptimeRobot** or similar service configured to keep backend awake
- [ ] **Render dashboard** bookmarked for monitoring
- [ ] **Vercel dashboard** bookmarked for frontend management

### Documentation Updates
- [ ] **README.md** updated with live URLs
- [ ] **GitHub repository description** includes live demo link
- [ ] **Environment variables** documented for team members

### Security Checks
- [ ] **No sensitive data** in client-side code
- [ ] **Environment variables** properly configured
- [ ] **CORS settings** appropriate for production
- [ ] **HTTPS enabled** (automatic on both platforms)

## 🌐 Sharing & Access

### URLs Documented
- [ ] **Frontend URL**: `https://notes-frontend-xxxx.vercel.app`
- [ ] **Backend URL**: `https://notes-backend-xxxx.onrender.com`
- [ ] **API Documentation**: Available at backend URL + `/notes`

### Access Testing
- [ ] **Share URL** with others to confirm public access
- [ ] **Mobile access** tested from different devices
- [ ] **Different networks** tested (WiFi, mobile data)

## 🚨 Troubleshooting Completed

### Common Issues Resolved
- [ ] **Cold start delays** on Render (expected behavior)
- [ ] **CORS errors** resolved
- [ ] **Environment variables** properly set
- [ ] **Build errors** fixed
- [ ] **Database connectivity** confirmed

### Monitoring Setup
- [ ] **Error tracking** configured or planned
- [ ] **Usage monitoring** set up via platform dashboards
- [ ] **Backup strategy** planned for database (manual exports)

## ✅ Final Launch Checklist

- [ ] **All tests passing**
- [ ] **Performance acceptable** 
- [ ] **Security reviewed**
- [ ] **Documentation complete**
- [ ] **Team notified** of live URLs
- [ ] **Social sharing** prepared (if applicable)

## 🎉 Success Metrics

After 24 hours of being live:
- [ ] **No critical errors** in logs
- [ ] **User feedback** collected (if applicable)
- [ ] **Performance metrics** reviewed
- [ ] **Usage analytics** checked

---

## 🆘 Emergency Contacts & Resources

- **Render Status**: https://status.render.com
- **Vercel Status**: https://vercel-status.com  
- **GitHub Status**: https://githubstatus.com

**🎊 Congratulations! Your Notes App is successfully deployed and live!**