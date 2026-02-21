// Test the findMatches function
const { findMatches } = require('./matcher');

async function testMatch() {
    const jobDescription = 'Expert in Node.js and Database optimization';
    await findMatches(jobDescription);
}

testMatch();