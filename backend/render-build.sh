#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
echo "Installing dependencies..."
npm install

# Install Puppeteer and Chromium
echo "Installing Puppeteer and Chromium..."
mkdir -p /opt/render/.cache/puppeteer
npx puppeteer browsers install chrome

# Dynamically determine the Chromium version
CHROMIUM_VERSION=$(ls /opt/render/.cache/puppeteer/chrome/linux-*/chrome-linux64/chrome | grep -oP '(?<=linux-)[^/]+')
export PUPPETEER_EXECUTABLE_PATH="/opt/render/.cache/puppeteer/chrome/linux-${CHROMIUM_VERSION}/chrome-linux64/chrome"

# Verify the Chromium executable path
if [[ -f $PUPPETEER_EXECUTABLE_PATH ]]; then
  echo "Chromium executable found at: $PUPPETEER_EXECUTABLE_PATH"
else
  echo "Error: Chromium executable not found at: $PUPPETEER_EXECUTABLE_PATH"
  exit 1
fi

# Build the project (if needed)
# echo "Building the project..."
# npm run build
