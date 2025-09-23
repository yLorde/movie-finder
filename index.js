const axios = require('axios');
const cheerio = require('cheerio');

(async function () {
    try {

        const title = "bruxa de blair";
        const base_url = 'https://www.themoviedb.org';

        let image;
        let link;
        let sinopse;
        let background;

        async function findLink() {
            await axios.get(`${base_url}/search?query=${String(title).replaceAll(' ', '%20')}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/114.0.5735.99 Mobile/15E148 Safari/604.1"
                }
            }).catch((err) => {
                if (err) {
                    return;
                };
            }).then(response => {
                if (response) {
                    const $ = cheerio.load(response.data);
                    link = $('div .results').find('div .card').find('div .wrapper').find('div .details').find('div .title').find('div').find('a').attr('href');
                };
            });
        };

        async function findBanner() {
            await axios.get(`${base_url}${link}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/114.0.5735.99 Mobile/15E148 Safari/604.1"
                }
            }).catch((err) => {
                if (err) {
                    return;
                };
            }).then(response => {
                if (response) {
                    const $ = cheerio.load(response.data);

                    image = $('main').find('section').find('div .poster').find('img').attr('srcset').split(',')[1].toString().split(' ')[1].replace(' x2', '');
                    sinopse = $('main').find('section').find('div .header_info').find('div .overview').find('p').text();
                    background = $('section .media').find('div .backdrop').find('img').attr('srcset').split(',')[1].toString().split(' ')[1].replace(' x2', '');
                };
            });
        };

        await findLink();
        await findBanner();

        const data = {
            image: image,
            sinopse: sinopse,
            background: background,
            link_1: `${base_url}/search?query=${String(title).replaceAll(' ', '%20')}`,
            link_2: `${base_url}${link}`,
        };

        console.log(data);
    } catch (err) {
        console.log(err);
    };
})()