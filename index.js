const axios = require("axios");
const cheerio = require("cheerio");

(async function () {
  const Options = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/114.0.5735.99 Mobile/15E148 Safari/604.1",
    },
  };

  const titleName = "bruxa de blair";

  async function findLink(query) {
    try {
      const url = `https://www.themoviedb.org/search?query=${encodeURIComponent(
        query
      )}`;
      const { data } = await axios.get(url, Options);
      const $ = cheerio.load(data);

      // procura o primeiro link de resultado
      const link = $(".results .card .title a").first().attr("href");

      if (!link) throw new Error("Nenhum resultado encontrado.");
      return { link, searchUrl: url };
    } catch (err) {
      throw new Error("Erro ao buscar filme: " + err.message);
    }
  }

  async function findDetails(link) {
    try {
      const url = `https://www.themoviedb.org${link}`;
      const { data } = await axios.get(url, Options);
      const $ = cheerio.load(data);

      // Poster
      let image = $("main section .poster img").attr("src");
      if (image && image.startsWith("/")) {
        image = "https://www.themoviedb.org" + image;
      }

      // Sinopse
      const sinopse = $("main section .header_info .overview p")
        .text()
        .trim();

      // Background
      let background = $("section .media .backdrop img").attr("src");
      if (background && background.startsWith("/")) {
        background = "https://www.themoviedb.org" + background;
      }

      return { image, sinopse, background, detailsUrl: url };
    } catch (err) {
      throw new Error("Erro ao buscar detalhes: " + err.message);
    }
  }

  try {
    const { link, searchUrl } = await findLink(titleName);
    const result = await findDetails(link);

    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
})();
