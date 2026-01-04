const axios = require('axios');
(async () => {
    try {
        console.log('Sending request...');
        const res = await axios.post('https://ufbackend.com/graphql', {
            query: '{ products(first: 1) { nodes { name } } }'
        });
        console.log('Result:', JSON.stringify(res.data));
    } catch (e) {
        console.error('Error:', e.message);
    }
})();
