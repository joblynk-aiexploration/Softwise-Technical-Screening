const { Client } = require('pg');
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function seedDatabase() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    const candidates = [
        { name: 'Alice', resume: 'Frontend React Developer' },
        { name: 'Bob', resume: 'Backend Node.js/Postgres Developer' },
        { name: 'Charlie', resume: 'Agile Project Manager' }
    ];

    try {
        await client.connect();
        for (const candidate of candidates) {
            const response = await openai.embeddings.create({
                model: 'text-embedding-3-small',
                input: candidate.resume,
            });
            const vector = response.data[0].embedding;
            await client.query(
                'INSERT INTO candidates (name, resume_text, embedding) VALUES ($1, $2, $3)',
                [candidate.name, candidate.resume, JSON.stringify(vector)]
            );
        }
        console.log('Seeding complete');
    } catch (err) {
        console.error('Seeding error', err);
    } finally {
        await client.end();
    }
}

seedDatabase();