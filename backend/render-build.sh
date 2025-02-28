# Install dependencies
echo "Installing dependencies..."
npm install

# Install Puppeteer and Chromium
echo "Installing Puppeteer and Chromium..."
mkdir -p /opt/render/.cache/puppeteer
npx puppeteer browsers install chrome

# Set the Puppeteer executable path
export PUPPETEER_EXECUTABLE_PATH=/opt/render/.cache/puppeteer/chrome/linux-$(npx puppeteer --version)/chrome-linux64/chrome

# Verify the Chromium executable path
if [[ -f $PUPPETEER_EXECUTABLE_PATH ]]; then
  echo "Chromium executable found at: $PUPPETEER_EXECUTABLE_PATH"
else
  echo "Error: Chromium executable not found at: $PUPPETEER_EXECUTABLE_PATH"
  exit 1
fi
