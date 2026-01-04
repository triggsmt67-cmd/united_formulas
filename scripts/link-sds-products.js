const axios = require('axios');
const path = require('path');

const USERNAME = 'AgentScript';
const PASSWORD = 'flvr sXSJ fakF dztg LRIs UTFb';
const BASE_URL = 'https://ufbackend.com';
const GRAPHQL_URL = `${BASE_URL}/graphql`;
const WC_API_URL = `${BASE_URL}/wp-json/wc/v3`;

const AUTH_HEADER = {
    Authorization: `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64')}`
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function normalize(str) {
    if (!str) return '';
    return str.toLowerCase().replace(/[\s-]/g, '').replace(/[^a-z0-9]/g, '');
}

async function fetchAllProducts() {
    let allProducts = [];
    let after = null;
    let hasNextPage = true;
    const query = `
        query GetProducts($after: String) {
            products(first: 100, after: $after) {
                pageInfo { hasNextPage endCursor }
                nodes { databaseId name }
            }
        }
    `;
    try {
        while (hasNextPage) {
            const response = await axios.post(GRAPHQL_URL, { query, variables: { after } });
            const { data } = response.data;
            if (!data?.products) break;
            allProducts = allProducts.concat(data.products.nodes);
            hasNextPage = data.products.pageInfo.hasNextPage;
            after = data.products.pageInfo.endCursor;
            await sleep(500); // Small delay to avoid 429
        }
    } catch (e) { console.error('Error fetching products:', e.message); }
    return allProducts;
}

async function fetchAllPDFs() {
    let allPDFs = [];
    let after = null;
    let hasNextPage = true;
    const query = `
        query GetPDFs($after: String) {
            mediaItems(first: 100, after: $after) {
                pageInfo { hasNextPage endCursor }
                nodes { mediaItemUrl mimeType }
            }
        }
    `;
    try {
        while (hasNextPage) {
            const response = await axios.post(GRAPHQL_URL, { query, variables: { after } });
            const { data } = response.data;
            if (!data?.mediaItems) break;
            const pdfs = data.mediaItems.nodes.filter(m =>
                m.mimeType === 'application/pdf' || (m.mediaItemUrl && m.mediaItemUrl.toLowerCase().endsWith('.pdf'))
            );
            allPDFs = allPDFs.concat(pdfs);
            hasNextPage = data.mediaItems.pageInfo.hasNextPage;
            after = data.mediaItems.pageInfo.endCursor;
            await sleep(500);
        }
    } catch (e) { console.error('Error fetching PDFs:', e.message); }
    return allPDFs;
}

async function updateProductSDS(productId, productName, sdsUrl, pdfName) {
    const url = `${WC_API_URL}/products/${productId}`;
    try {
        await axios.post(url, {
            meta_data: [{ key: 'sdsFile', value: sdsUrl }]
        }, { headers: AUTH_HEADER, timeout: 15000 });
        console.log(`✅ LINKED: [${productName}] -> [${pdfName}]`);
        return true;
    } catch (e) {
        const reason = e.response?.data?.message || e.message;
        console.log(`❌ FAILED: [${productName}] (Reason: ${reason})`);
        if (e.response?.status === 429) {
            console.log('   (Rate limited. Waiting 10 seconds...)');
            await sleep(10000);
            return await updateProductSDS(productId, productName, sdsUrl, pdfName); // Retry once
        }
        return false;
    }
}

async function startLinking() {
    const products = await fetchAllProducts();
    const pdfs = await fetchAllPDFs();
    console.log(`\nStarting with ${products.length} Products and ${pdfs.length} PDFs.\n`);

    let totalLinked = 0;
    for (const product of products) {
        const prodClean = normalize(product.name);
        if (!prodClean) continue;

        const match = pdfs.find(pdf => {
            const filename = path.basename(decodeURIComponent(pdf.mediaItemUrl || ''));
            const fileClean = normalize(filename.replace('.pdf', ''));
            return fileClean.includes(prodClean) || prodClean.includes(fileClean);
        });

        if (match) {
            const pdfName = path.basename(match.mediaItemUrl);
            const success = await updateProductSDS(product.databaseId, product.name, match.mediaItemUrl, pdfName);
            if (success) totalLinked++;
            await sleep(1500); // 1.5s delay between updates to prevent 429
        }
    }
    console.log(`\n--- Finished. Total Linked: ${totalLinked} ---`);
}

startLinking();
