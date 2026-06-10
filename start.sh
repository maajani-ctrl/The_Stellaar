#!/bin/bash

# The Stellaar - Premium Family Club Experience
# Unified Start Script — Availability & Recovery Optimized

# --- Color Definitions ---
GOLD='\033[0;33m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GOLD}🚀 Initializing The Stellaar Premium Experience...${NC}"

# --- Helper: IP Detection ---
get_local_ip() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "127.0.0.1"
    else
        hostname -I | awk '{print $1}' 2>/dev/null || echo "127.0.0.1"
    fi
}

# --- Functions ---
cleanup_ports() {
    echo -e "${CYAN}🧹 Cleaning up existing processes on port 3000...${NC}"
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    sleep 1
}

check_database() {
    echo -e "${CYAN}🗄 Verifying Cloud Registry (Supabase)...${NC}"
    if [ ! -f ".env.local" ]; then
        echo -e "${RED}⚠️  Environment file (.env.local) missing!${NC}"
        echo -e "Please create it using .env.example as a template."
        exit 1
    fi

    # Check for Supabase URL in .env.local
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        echo -e "${GREEN}✅ Supabase Cloud Registry verified.${NC}"
    else
        echo -e "${RED}❌ Supabase configuration not found in .env.local.${NC}"
        exit 1
    fi
}

install_deps() {
    echo -e "${CYAN}📦 Installing dependencies...${NC}"
    npm install --loglevel=error
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install dependencies.${NC}"
        exit 1
    fi
}

# Function to kill background processes on exit
cleanup() {
    echo -e "\n${RED}🛑 Shutting down Stellaar services...${NC}"
    
    # Run final sync before exit
    echo -e "${CYAN}🔄 Performing final data synchronization...${NC}"
    npx tsx scripts/sync.ts
    
    kill $NEXT_PID $SYNC_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

run_dev() {
    cleanup_ports
    check_database
    
    # Run initial sync
    echo -e "${CYAN}🔄 Synchronizing cloud data to local backups...${NC}"
    npx tsx scripts/sync.ts
    
    # Start background sync loop (hourly)
    ./scripts/sync-loop.sh &
    SYNC_PID=$!
    
    local IP=$(get_local_ip)
    echo -e "\n${GOLD}✨ THE STELLAAR IS NOW LIVE${NC}"
    echo -e "------------------------------------------------"
    echo -e "${GREEN}💻 Local:      ${NC} http://localhost:3000"
    echo -e "${GREEN}🌐 Network:    ${NC} http://$IP:3000"
    echo -e "------------------------------------------------"
    echo -e "${CYAN}Admin Panel:   ${NC} /staff"
    echo -e "${CYAN}Blog Engine:   ${NC} /blogs"
    echo -e "------------------------------------------------"
    echo -e "${GOLD}Background Sync: ${NC} ACTIVE (Hourly)"
    echo -e "------------------------------------------------"
    echo -e "Press Ctrl+C to stop all services."
    
    npm run dev -- -H 0.0.0.0 &
    NEXT_PID=$!
    wait $NEXT_PID
}

run_prod() {
    cleanup_ports
    check_database
    echo -e "${CYAN}🏗️  Building Production Bundle...${NC}"
    npm run build
    echo -e "${GREEN}✨ Build Complete. Launching Production Server...${NC}"
    npm run start -- -H 0.0.0.0
}

# --- Execution ---
if [[ "$1" == "--help" ]]; then
    echo "Usage: ./start.sh [OPTION]"
    echo "Options:"
    echo "  --prod    Run in production mode"
    echo "  --clean   Clean workspace before starting"
    exit 0
fi

if [[ "$1" == "--clean" ]]; then
    echo -e "${RED}🧹 Cleaning workspace...${NC}"
    rm -rf .next node_modules package-lock.json
fi

# Auto-install dependencies
if [ ! -d "node_modules" ]; then
    install_deps
fi

if [[ "$1" == "--prod" ]]; then
    run_prod
else
    run_dev
fi
