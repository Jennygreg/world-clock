const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Proxy endpoint
app.get('/api/timezone', async (req, res) => {
    const { lat, lng } = req.query;
    try {
        const response = await axios.get(`http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lng}&username=mizbella`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from Geonames API');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});