const axios = require('axios');
const cheerio = require('cheerio');

(async function () {
    const Options = {
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/114.0.5735.99 Mobile/15E148 Safari/604.1"
        }
    }

    const titleName = "bruxa de blair";

    let image;
    let link;
    let sinopse;
    let background;

    async function findLink() {
        await axios.get(`https://www.themoviedb.org/search?query=${String(titleName).replaceAll(' ', '%20')}`, Options).catch((err) => {
            throw new Error('Erro ao buscar filme\n', err);
        }).then(response => {
            if (response) {
                const $ = cheerio.load(response.data);
                link = $('div .results').find('div .card .wrapper .details .title').find('a').attr('href');
            };
        });
    };

    async function findDetails() {
        await axios.get(`https://www.themoviedb.org${link}`, Options).catch((err) => {
            throw new Error('Erro ao buscar detalhes do filme\n', err);
        }).then(response => {
            if (response) {
                const $ = cheerio.load(response.data);

                image = $('main').find('section .poster')
                    .find('img').attr('srcset').split(',')[1].toString().split(' ')[1].replace(' x2', '');

                sinopse = $('main').find('section .header_info .overview').find('p').text();

                background = $('section .media .backdrop')
                    .find('img').attr('srcset').split(',')[1].toString().split(' ')[1].replace(' x2', '');
            };
        });
    };

    await findLink().finally(findDetails);

    const data = {
        title: titleName,
        image: image,
        sinopse: sinopse,
        background: background,
        link_1: `https://www.themoviedb.org/search?query=${String(titleName).replaceAll(' ', '%20')}`,
        link_2: `https://www.themoviedb.org${link}`,
    };

    console.log(data);
})()