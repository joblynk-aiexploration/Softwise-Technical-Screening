const { Client } = require('pg');

async function setupDatabase() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        await client.query('CREATE EXTENSION IF NOT EXISTS vector;');
        await client.query(`
            CREATE TABLE IF NOT EXISTS candidates (
                id SERIAL PRIMARY KEY,
                name TEXT,
                resume_text TEXT,
                embedding vector(1536)
            );
        `);
        console.log('Database setup complete');
    } catch (err) {
        console.error('Database setup error', err);
    } finally {
        await client.end();
    }
}

setupDatabase();