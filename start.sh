#!/bin/bash

# TravelHub Application Startup Script
# This script starts the frontend development server on the configured port

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   TravelHub Application Startup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}Error: .env file not found!${NC}"
    echo -e "${YELLOW}Creating .env from .env.example...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}Created .env file. Please review and update it with your configuration.${NC}"
    else
        echo -e "${RED}Error: .env.example not found. Please create a .env file manually.${NC}"
        exit 1
    fi
fi

# Load environment variables from .env
if [ -f .env ]; then
    echo -e "${GREEN}Loading environment variables from .env...${NC}"
    export $(grep -v '^#' .env | grep -v '^$' | xargs)
else
    echo -e "${RED}Error: Could not load .env file${NC}"
    exit 1
fi

# Set default port if not specified
PORT=${FRONTEND_PORT:-8787}

echo -e "${GREEN}Configuration:${NC}"
echo -e "  Frontend Port: ${GREEN}${PORT}${NC}"
echo -e "  Backend URL: ${GREEN}${BACKEND_URL:-http://localhost:8000}${NC}"
echo -e "  Default Language: ${GREEN}${DEFAULT_LANGUAGE:-en}${NC}"
echo ""

# Check if the port is already in use
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}Warning: Port $PORT is already in use${NC}"
    echo -e "${YELLOW}Attempting to kill the process...${NC}"

    # Kill the process using the port
    kill -9 $(lsof -ti:$PORT) 2>/dev/null || true

    # Wait a moment for the port to be released
    sleep 2

    # Check again
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        echo -e "${RED}Error: Could not free port $PORT${NC}"
        echo -e "${YELLOW}Please manually stop the process using port $PORT and try again${NC}"
        exit 1
    fi
    echo -e "${GREEN}Port $PORT freed successfully${NC}"
fi

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: Python 3 is not installed${NC}"
    echo -e "${YELLOW}Please install Python 3 and try again${NC}"
    exit 1
fi

PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
echo -e "${GREEN}Using Python version: ${PYTHON_VERSION}${NC}"
echo ""

# Create logs directory if it doesn't exist
mkdir -p logs

# Start the development server
echo -e "${GREEN}Starting frontend development server on port ${PORT}...${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${GREEN}Frontend URL: ${FRONTEND_URL:-http://localhost:$PORT}${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
echo ""
echo -e "${BLUE}========================================${NC}"
echo ""

# Log file for the server
LOG_FILE="logs/server_$(date +%Y%m%d_%H%M%S).log"

# Start Python HTTP server
python3 -m http.server $PORT 2>&1 | tee "$LOG_FILE"

# Cleanup on exit
trap "echo -e '\n${YELLOW}Shutting down server...${NC}'; exit 0" INT TERM
