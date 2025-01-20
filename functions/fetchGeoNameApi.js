const axios = require('axios');

exports.handler = async (event, context) => {
    const { lat, lng } = event.queryStringParameters;

    if (!lat || !lng) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Latitude and Longitude are required' }),
        };
    }

    try {
        const response = await axios.get(`http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lng}&username=mizbella`);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch timezone data' }),
        };
    }
};