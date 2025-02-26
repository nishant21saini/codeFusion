
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const geekrouter = express.Router();
const app = express();
app.use(cors());

geekrouter.get('/:username/solved', async (req, res) => {
    const { username } = req.params;
    console.log({ username });
    console.log("fetching data" ,{username});

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto(`https://www.geeksforgeeks.org/user/${username}/`, {
            waitUntil: 'networkidle2',
        });

        // Extract solved problems count
        const solvedElements = await page.evaluate(() => {
            const elements = document.querySelectorAll('.scoreCard_head__nxXR8');
            return Array.from(elements).map(element => element.textContent.trim());
        });

        // Extract difficulty level counts
        const difficultyLevels = await page.evaluate(() => {
            const levels = [];
            const levelElements = document.querySelectorAll('.problemNavbar_head_nav__a4K6P');

            levelElements.forEach(element => {
                const text = element.querySelector('.problemNavbar_head_nav--text__UaGCx').innerText;
                const match = text.match(/\((\d+)\)/); 
                if (match) {
                    const count = parseInt(match[1], 10);
                    const category = text.split(' ')[0];
                    levels.push({ category, count });
                }
            });

            return levels;
        });

        console.log('Solved Elements:', solvedElements);
        console.log('Difficulty Levels:', difficultyLevels);

        
        let solvedCount = 0;
        if (solvedElements.length > 0) {
            const text = solvedElements[1];
            solvedCount = parseInt(text.replace(/\D/g, ''), 10);
        }

        res.json({
            solvedCount,
            difficultyLevels,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch data. Please try again later.' });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
});

module.exports = geekrouter;