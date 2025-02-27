const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());
const leetEvent = express.Router();


leetEvent.get('/tracker' , async (req,res) => {
    console.log("fetching Event data ...");

    const browser = await puppeteer.launch({
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome-stable', 
               headless: "new",
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36');
    await page.goto('https://leetcode.com/contest/', { waitUntil: 'networkidle2' });

    try {
        
        await page.waitForSelector('a[href^="/contest/"]', { timeout: 20000 });

        const anchorHrefs = await page.evaluate(() => {
            const anchor = Array.from(document.querySelectorAll('a[href^="/contest/"]'));
        
            const upcoming = anchor.slice(0, 2).map(a => a.href);
            const prev = anchor.slice(5, 7).map(a => a.href);
            
            return { upcoming, prev };
        });
        
        const we_coming = String(anchorHrefs.upcoming[0]).split('-').pop();
        const bi_coming = String(anchorHrefs.upcoming[1]).split('-').pop();
        const we_past = String(anchorHrefs.prev[0]).split('-').pop();
        const bi_past = String(anchorHrefs.prev[1]).split('-').pop();

        const data = [
            { title: "Weekly Contest " + we_coming, link:  anchorHrefs.upcoming[0], bgImage: "https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png" },
            { title: "Biweekly Contest " + bi_coming, link: anchorHrefs.upcoming[1], bgImage: "https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png" },
            { title: "Weekly Contest " + we_past, link: anchorHrefs.prev[0], bgImage: "https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png" },
            { title:"Biweekly Contest " + bi_past, link: anchorHrefs.prev[1], bgImage:"https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png" },
        ];
        
        res.send(data);
    } catch (error) {
        console.error("Error fetching anchor tags:", error);
    }

    await browser.close();
} )

module.exports = leetEvent;
