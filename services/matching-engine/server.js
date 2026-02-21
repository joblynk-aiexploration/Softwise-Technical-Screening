const express = require('express');
const cors = require('cors');
const { findMatches } = require('./matcher');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/match', async (req, res) => {
    const { description } = req.body;
    try {
        const candidates = await findMatches(description);
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ error: 'Error finding matches' });
    }
});

app.listen(3000, () => {
    console.log('JobLynk Engine running on port 3000');
});