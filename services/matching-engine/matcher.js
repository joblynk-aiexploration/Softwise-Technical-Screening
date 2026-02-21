const { Client } = require('pg');
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function findMatches(jobDescription) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: jobDescription,
    });
    const jobVector = response.data[0].embedding;

    try {
        await client.connect();
        const res = await client.query(
            'SELECT name FROM candidates ORDER BY embedding <=> $1 LIMIT 5',
            [JSON.stringify(jobVector)]
        );
        console.log('Matched candidates:', res.rows);
    } catch (err) {
        console.error('Error finding matches:', err);
    } finally {
        await client.end();
    }
}

module.exports = { findMatches };