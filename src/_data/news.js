const axios = require('axios');
const countries = require('./development.json');
require('dotenv').config();

async function getNews(country) {
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.API_KEY}`
        );
        return {
            country: country,
            articles: responce.data.articles,
        };
    } catch (error) {
        console.error(error);
    }
}

module.exports = async function () {
    var newsPromises = countries.map(getNews);
    return Promise.all(newsPromises).then((newsObjects) => {
        console.log('News Objects: ', newsObjects);
        return [].concat.apply([], newsObjects);
    });
};
