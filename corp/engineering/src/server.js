require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { findMatches } = require('./matcher');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/match', async (req, res) => {
    const { description } = req.body;
    console.log('Received description:', description);

    res.header('Content-Type', 'application/json');

    try {
        const candidates = await findMatches(description);
        console.log('Number of candidates found:', candidates.length);
        res.json(candidates);
    } catch (err) {
        console.error('Error finding matches:', err);
        res.status(500).json({ error: 'Error finding matches' });
    }
});

app.listen(3000, () => {
    console.log('JobLynk Engine running on port 3000');
});