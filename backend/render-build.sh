#!/usr/bin/env bash
set -o errexit  # Exit on error

echo "Installing dependencies..."
npm install

# Ensure Puppeteer cache is stored between builds
if [[ ! -d "$PUPPETEER_CACHE_DIR" ]]; then 
  echo "...Copying Puppeteer Cache from Build Cache" 
  cp -R "$XDG_CACHE_HOME/puppeteer/" "$PUPPETEER_CACHE_DIR"
elif [[ "$(realpath "$PUPPETEER_CACHE_DIR")" != "$(realpath "$XDG_CACHE_HOME")" ]]; then
  echo "...Storing Puppeteer Cache in Build Cache" 
  cp -R "$PUPPETEER_CACHE_DIR" "$XDG_CACHE_HOME"
else
  echo "...Cache is already correct, skipping copy."
fi

# Install Chrome for Puppeteer
echo "Installing Puppeteer Chrome..."
npx puppeteer browsers install chrome

echo "Starting server..."
npm start
