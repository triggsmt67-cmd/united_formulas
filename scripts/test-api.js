const axios = require('axios');
async function test() {
    console.log('Testing ufbackend.com/graphql...');
    try {
        const res = await axios.post('https://ufbackend.com/graphql', {
            query: '{ __schema { queryType { name } } }'
        });
        console.log('Success!', res.status);
    } catch (e) {
        console.error('Fail', e.message);
    }
}
test();
