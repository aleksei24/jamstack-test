const axios = require('axios');
const countries = require('./development.json');
require('dotenv').config();

async function getNews(country) {
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.API_KEY}`
        );
        return { country: country, articles: response.data.articles };
    } catch (error) {
        console.error(error);
    }
}

module.exports = async function () {
    const newsPromise = countries.map(getNews);
    return Promise.all(newsPromise).then((newsObjects) => {
        console.log('News Objects:', newsObjects);
        return [].concat.apply([], newsObjects);
    });
};
