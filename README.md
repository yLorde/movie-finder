# 🎬 Movie Scraper (TMDB)

Este projeto é um **web scraper** em Node.js que busca informações de
filmes diretamente do site [TheMovieDB](https://www.themoviedb.org).\
Ele pesquisa um título, coleta o link, poster, sinopse e imagem de
background.

------------------------------------------------------------------------

## 🚀 Tecnologias utilizadas

-   [Node.js](https://nodejs.org/)
-   [Axios](https://axios-http.com/) → Requisições HTTP\
-   [Cheerio](https://cheerio.js.org/) → Parse do HTML para navegar como
    se fosse jQuery

------------------------------------------------------------------------

## 📂 Estrutura do código

-   **findLink(query)** → Pesquisa o título no TMDB e retorna o primeiro
    link encontrado.\
-   **findDetails(link)** → Acessa a página do filme e extrai poster,
    sinopse e background.\
-   **Execução principal** → Combina os dados e exibe em JSON no
    terminal.

------------------------------------------------------------------------

## 🔧 Como executar

1.  Clone o repositório:

    ``` bash
    git clone https://github.com/ylorde/movie-finder.git
    cd movie-scraper
    ```

2.  Instale as dependências:

    ``` bash
    npm install axios cheerio
    ```

3.  Execute o script:

    ``` bash
    node index.js
    ```

------------------------------------------------------------------------

## 📋 Exemplo de saída

``` json
{
  "title": "bruxa de blair",
  "image": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/abc123.jpg",
  "sinopse": "Um grupo de jovens se aventura na floresta...",
  "background": "https://www.themoviedb.org/t/p/original/xyz456.jpg",
  "link_1": "https://www.themoviedb.org/search?query=bruxa%20de%20blair",
  "link_2": "https://www.themoviedb.org/movie/1234"
}
```

------------------------------------------------------------------------

## ⚠️ Observações

-   Este projeto usa **scraping de HTML**, o que pode quebrar caso o
    TMDB altere sua estrutura de páginas.\
-   Para projetos em produção, recomenda-se utilizar a [API oficial do
    TMDB](https://developer.themoviedb.org/reference/intro/getting-started)
    (grátis, só precisa de chave de API).

------------------------------------------------------------------------

## 📜 Licença

Este projeto é livre para estudos e uso pessoal.
