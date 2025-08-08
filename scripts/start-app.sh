#!/bin/bash

# Define the path to the main.js file
APP_DIR="apps/static-server/dist"
MAIN_JS="main.js"

# Navigate to the directory
cd "$APP_DIR" || {
  echo "Failed to navigate to $APP_DIR. Directory does not exist."
  exit 1
}

# Check if main.js exists
if [ ! -f "$MAIN_JS" ]; then
  echo "Error: $MAIN_JS not found in $APP_DIR."
  exit 1
fi

# Start the application
echo "Starting $MAIN_JS..."
node "$MAIN_JS"