const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors'); 
const app = express();
const chefrouter = express.Router();
app.use(cors()); 

///nishant/solved	{ username: "nishant" }
//this is known as dynamic routing 
chefrouter.get('/:username/solved', async (req, res) => {
    const { username } = req.params;
    console.log({username});

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

        
        await page.goto(`https://www.codechef.com/users/${username}/`, {
            waitUntil: 'networkidle2', // Wait until network is idle
        });

        // Use querySelectorAll to select elements
        await page.waitForSelector('.rating-data-section.problems-solved');

        // Evaluate the page to extract the required data
        let result = await page.evaluate(() => {
            const elements = document.querySelectorAll('.rating-data-section.problems-solved');
            return Array.from(elements)
                .map(element => element.innerText)
                .join('\n')
                .split('\n')
                .filter(text => text.trim() !== '' && text.trim() !== 'None')
                .map(text => text.trim());
        });

        if (result.length > 0) {
            // Extract the total problems solved
            const totalProblemsSolvedText = result.find(item => item.includes('Total Problems Solved'));
            const totalProblemsSolved = totalProblemsSolvedText ? parseInt(totalProblemsSolvedText.match(/\d+/)[0], 10) : 0;

            console.log('Total Problems Solved:', totalProblemsSolved);
            res.json({ totalProblemsSolved});
        } else {
            console.log('No elements found with the specified selector.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch data. Please try again later.' });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
});

module.exports = chefrouter;
