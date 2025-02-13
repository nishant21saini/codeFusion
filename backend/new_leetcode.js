const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5005;


app.use(cors());

// Route to fetch solved problems
app.get('/:username/solved', async (req, res) => {
    const { username } = req.params;
    console.log(`Fetching data for user: ${username}`);

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    let browser;
    try {
        
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
            ],
        });

        const page = await browser.newPage();

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        );

        await page.goto(`https://leetcode.com/${username}/`, {
            waitUntil: 'networkidle2',
        });

        // Wait for the solved problems section to load
        await page.waitForSelector('.text-xs.font-medium.text-sd-easy', { timeout: 10000 });

        // Extract problem counts
        const problemCounts = await page.evaluate(() => {
            const getCount = (selector) => {
                const label = document.querySelector(selector);
                if (!label) {
                    console.warn(`Selector not found: ${selector}`);
                    return 0;
                }

                const countElement = label.nextElementSibling;
                if (!countElement) {
                    console.warn(`Count element not found for selector: ${selector}`);
                    return 0;
                }

                return parseInt(countElement.innerText.split('/')[0].trim(), 10) || 0;
            };

            return {
                easy: getCount('.text-xs.font-medium.text-sd-easy'),
                medium: getCount('.text-xs.font-medium.text-sd-medium'),
                hard: getCount('.text-xs.font-medium.text-sd-hard'),
            };
        });

        console.log(`Fetched data for ${username}:`, problemCounts);
        res.json(problemCounts);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data. Please try again later.' });
    } finally {
        // Close the browser
        if (browser) {
            await browser.close();
        }
    }
});

// Start the server
console.log('Starting server...');
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

