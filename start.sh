#!/bin/bash

# Stellaar Project Start Script

echo "🚀 Initializing Stellaar Website..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 node_modules not found. Installing dependencies..."
    npm install
fi

# Function to run development mode
run_dev() {
    echo "🛠️ Starting Development Server..."
    npm run dev
}

# Function to run production mode
run_prod() {
    echo "🏗️ Building for Production..."
    npm run build
    echo "✨ Starting Production Server..."
    npm run start
}

# Check for arguments
if [ "$1" == "--prod" ]; then
    run_prod
else
    run_dev
fi
