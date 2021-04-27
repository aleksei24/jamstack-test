const axios = require('axios');
require('dotenv').config();

module.exports = async function getUser() {
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${process.env.API_KEY}`
        );
        return response.data;
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};
