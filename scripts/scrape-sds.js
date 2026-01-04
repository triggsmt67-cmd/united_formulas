const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'https://unitedformulas.com/sds-sheets/';
const FOLDER_NAME = 'sds_verification';

async function downloadFile(url, folder) {
    const filename = path.basename(url);
    const filePath = path.join(folder, filename);

    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Failed to download ${url}: ${error.message}`);
    }
}

async function scrapeSDS() {
    try {
        console.log(`Fetching HTML from ${TARGET_URL}...`);
        const { data: html } = await axios.get(TARGET_URL);
        const $ = cheerio.load(html);

        const pdfLinks = [];
        $('a').each((i, el) => {
            const href = $(el).attr('href');
            if (href && href.toLowerCase().endsWith('.pdf')) {
                // Ensure absolute URL
                const absoluteUrl = href.startsWith('http') ? href : new URL(href, TARGET_URL).href;
                pdfLinks.push(absoluteUrl);
            }
        });

        const uniqueLinks = [...new Set(pdfLinks)];
        console.log(`Found ${uniqueLinks.length} unique PDF links.`);

        if (!fs.existsSync(FOLDER_NAME)) {
            fs.mkdirSync(FOLDER_NAME);
            console.log(`Created folder: ${FOLDER_NAME}`);
        }

        let count = 0;
        for (const link of uniqueLinks) {
            process.stdout.write(`Downloading (${count + 1}/${uniqueLinks.length}): ${path.basename(link)}... `);
            await downloadFile(link, FOLDER_NAME);
            console.log('Done.');
            count++;
        }

        console.log('\n--- Extraction Complete ---');
        console.log(`Total Count: ${count}`);
    } catch (error) {
        console.error(`Error during scraping: ${error.message}`);
    }
}

scrapeSDS();
