const axios = require('axios');
(async () => {
    try {
        console.log('Fetching 1 product...');
        const res = await axios.post('https://ufbackend.com/graphql', {
            query: '{ products(first: 1) { nodes { databaseId name } } }'
        });
        const product = res.data.data.products.nodes[0];
        console.log('Product:', product.name);

        console.log('Fetching media...');
        const res2 = await axios.post('https://ufbackend.com/graphql', {
            query: '{ mediaItems(first: 50) { nodes { mediaItemUrl mimeType } } }'
        });
        const pdf = res2.data.data.mediaItems.nodes.find(m => m.mimeType === 'application/pdf' || m.mediaItemUrl?.endsWith('.pdf'));
        console.log('PDF URL:', pdf?.mediaItemUrl);

        if (product && pdf) {
            console.log('Updating product...');
            const USERNAME = 'antigravity';
            const PASSWORD = 'Grx4 B77N qJtB QqOU rMPe JqPq';
            const auth = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

            const res3 = await axios.post(`https://ufbackend.com/wp-json/wc/v3/products/${product.databaseId}`, {
                meta_data: [{ key: 'sds_sheet', value: pdf.mediaItemUrl }]
            }, {
                headers: { Authorization: `Basic ${auth}` }
            });
            console.log('Update Status:', res3.status);
            console.log('Meta Updated:', JSON.stringify(res3.data.meta_data.find(m => m.key === 'sds_sheet')));
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
})();
