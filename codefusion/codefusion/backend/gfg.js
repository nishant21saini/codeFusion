const express = require('express');
const puppeteer = require('puppeteer');

const port = process.env.PORT || 5001;
const cors = require('cors'); 
const app = express();
app.use(cors()); 

app.get('/:username/solved', async (req, res) => {
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
        await page.goto(`https://www.geeksforgeeks.org/user/${username}/`, {
            waitUntil: 'networkidle2',
        });

        // Use querySelectorAll to select elements
        const solvedElements = await page.evaluate(() => {
            const elements = document.querySelectorAll('.scoreCard_head__nxXR8');
            return Array.from(elements).map(element => element.textContent.trim());
        });
        console.log(solvedElements);
       

        const level = await page.evaluate(() => {
            // Select all <a> tags within the solved_problem_section
            const links = document.querySelectorAll('.solved_problem_section .tabs .tab a');
    
            // Initialize an array to store the extracted data
            const data = [];
    
            // Iterate through each link
            links.forEach(link => {
                const text = link.innerText; // Get the text of the link
                const match = text.match(/\((\d+)\)/); // Use regex to extract the number in parentheses
    
                if (match) {
                    const count = parseInt(match[1], 10); // Parse the number
                    const category = text.split(' ')[0]; // Extract the category (first word)
                    
                    // Push the extracted data to the array
                    data.push({ category, count });
                }
            });
    
            return data; // Return the array of extracted data
        });
        
        // Log the result
        console.log(level);
        

        if (solvedElements.length > 0) {
            const text = solvedElements[1];
            const number = parseInt(text.replace(/\D/g, ''), 10);
            res.json({ number});
        } else {
            res.json({ message: 'No elements found with the class scoreCard_head__nxXR8.' });
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
