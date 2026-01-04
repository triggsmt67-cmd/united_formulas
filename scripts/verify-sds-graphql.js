const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_URL = 'https://ufbackend.com/graphql';
const LOCAL_FOLDER = 'sds_verification';

const MEDIA_QUERY = `
  query GetMedia($after: String) {
    mediaItems(first: 100, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        mediaItemUrl
      }
    }
  }
`;

async function fetchAllMedia() {
    let allMedia = [];
    let after = null;
    let hasNextPage = true;

    console.log('Fetching media via GraphQL...');

    try {
        while (hasNextPage) {
            const response = await axios.post(API_URL, {
                query: MEDIA_QUERY,
                variables: { after }
            });

            const { data } = response.data;
            if (!data || !data.mediaItems) {
                console.error('Unexpected response structure:', response.data);
                break;
            }

            allMedia = allMedia.concat(data.mediaItems.nodes);
            hasNextPage = data.mediaItems.pageInfo.hasNextPage;
            after = data.mediaItems.pageInfo.endCursor;
            console.log(`Fetched ${allMedia.length} items...`);
        }
    } catch (error) {
        console.error('GraphQL Error:', error.message);
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

    const remoteMedia = await fetchAllMedia();

    // sourceUrl might contain encoded chars, let's decode for matching
    const remoteFilenames = new Set(remoteMedia.map(item => {
        const url = item.mediaItemUrl || '';
        return path.basename(decodeURIComponent(url));
    }));

    console.log('\n--- Verification Report (GraphQL) ---\n');

    let matches = 0;
    let misses = 0;

    localFiles.forEach(file => {
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
