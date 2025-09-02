#!/bin/bash

# Notes App - Quick Deployment Script
# This script helps you deploy your app to Vercel and Render

echo "🚀 Notes App Deployment Helper"
echo "================================"

# Check if we're in the right directory
if [ ! -f "pom.xml" ] || [ ! -d "notes-frontend" ]; then
    echo "❌ Error: Please run this script from the notes_app root directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Notes App with React frontend and Spring Boot backend"
else
    echo "✅ Git repository already initialized"
fi

# Check if GitHub remote is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "🐙 GitHub Setup Required:"
    echo "1. Go to https://github.com and create a new repository called 'notes-app'"
    echo "2. Copy the repository URL (https://github.com/USERNAME/notes-app.git)"
    echo ""
    read -p "Enter your GitHub repository URL: " repo_url
    
    if [ -n "$repo_url" ]; then
        git remote add origin "$repo_url"
        git branch -M main
        echo "📤 Pushing code to GitHub..."
        git push -u origin main
        echo "✅ Code pushed to GitHub successfully!"
    else
        echo "❌ No repository URL provided. Please set up GitHub manually."
        exit 1
    fi
else
    echo "✅ GitHub remote already configured"
    echo "📤 Pushing latest changes..."
    git add .
    git commit -m "Deployment preparation" || true
    git push
fi

echo ""
echo "🎯 Next Steps:"
echo "=============="
echo ""
echo "1. 🗄️  Deploy Database (Render):"
echo "   • Go to https://render.com"
echo "   • Create account/login"
echo "   • Click 'New +' → 'PostgreSQL'"
echo "   • Name: notes-db"
echo "   • Database: notesdb"
echo "   • User: notesuser"
echo "   • Plan: Free"
echo "   • Click 'Create Database'"
echo ""
echo "2. ⚙️  Deploy Backend (Render):"
echo "   • Click 'New +' → 'Web Service'"
echo "   • Connect your GitHub repository"
echo "   • Name: notes-backend"
echo "   • Environment: Java"
echo "   • Build Command: mvn clean install"
echo "   • Start Command: java -Dspring.profiles.active=postgres -jar target/notes-app-0.0.1-SNAPSHOT.jar"
echo "   • Add environment variables from your database"
echo ""
echo "3. 🎨 Deploy Frontend (Vercel):"
echo "   • Go to https://vercel.com"
echo "   • Create account/login"
echo "   • Import your GitHub repository"
echo "   • Root Directory: notes-frontend"
echo "   • Add environment variable:"
echo "     REACT_APP_API_BASE_URL=https://YOUR_BACKEND_URL.onrender.com"
echo ""
echo "📖 For detailed instructions, see: DEPLOYMENT.md"
echo ""
echo "🎉 Happy deploying!"