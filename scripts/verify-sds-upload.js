const axios = require('axios');
const fs = require('fs');
const path = require('path');

const LOCAL_FOLDER = 'sds_verification';
const API_URL = 'https://ufbackend.com/wp-json/wp/v2/media/';

async function fetchRemoteMedia() {
    let allMedia = [];
    let page = 1;
    let hasMore = true;

    console.log('Fetching remote media list from WordPress...');

    try {
        while (hasMore) {
            console.log(`Fetching: ${API_URL}?per_page=100&page=${page}`);
            const response = await axios.get(`${API_URL}?per_page=100&page=${page}`, { timeout: 10000 });

            if (media.length === 0) {
                hasMore = false;
            } else {
                allMedia = allMedia.concat(media);
                console.log(`Fetched page ${page} (${allMedia.length} items total)`);
                page++;
            }
        }
    } catch (error) {
        // If we get a 400 from a page that doesn't exist, it means we reached the end
        if (error.response && error.response.status === 400) {
            hasMore = false;
        } else {
            console.error(`Error fetching media: ${error.message}`);
            hasMore = false;
        }
    }

    return allMedia;
}

async function verifyUploads() {
    if (!fs.existsSync(LOCAL_FOLDER)) {
        console.error(`Error: Local folder "${LOCAL_FOLDER}" not found.`);
        return;
    }

    const localFiles = fs.readdirSync(LOCAL_FOLDER).filter(file => file.toLowerCase().endsWith('.pdf'));
    console.log(`Found ${localFiles.length} local PDF files.`);

    const remoteMedia = await fetchRemoteMedia();

    // Create a set of remote filenames for fast lookup
    // source_url usually looks like: https://ufbackend.com/wp-content/uploads/2026/01/filename.pdf
    const remoteFilenames = new Set(remoteMedia.map(item => {
        const url = item.source_url || '';
        return path.basename(decodeURIComponent(url));
    }));

    console.log('\n--- Verification Report ---\n');

    let matches = 0;
    let misses = 0;

    localFiles.forEach(file => {
        // WordPress sometimes strips characters or modifies names, 
        // but path.basename on the source_url is the most reliable match.
        if (remoteFilenames.has(file)) {
            console.log(`✅ Found ${file}`);
            matches++;
        } else {
            console.log(`❌ MISSING ${file}`);
            misses++;
        }
    });

    console.log('\n--- Summary ---');
    console.log(`Total Local Files: ${localFiles.length}`);
    console.log(`Matches Found: ${matches}`);
    console.log(`Missing Files: ${misses}`);
}

verifyUploads();
