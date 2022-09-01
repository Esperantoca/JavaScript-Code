const APIURL =
"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = 
"https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

movies(APIURL);

async function movies(url) {
    const response = await fetch(url);
    const responseData = await response.json();

    showMovies(responseData.results);
}

function showMovies(movie) {
    main.innerHTML = "";
    movie.forEach((item) => {
        const { poster_path, title, vote_average, overview } = item;

        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `
                <img 
                    src="${IMGPATH + poster_path}"
                    alt="${title}"
                />
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${movieRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Explanation:</h3>
                    ${overview}
                </div>
                `;
        main.appendChild(movieElement);
    });
}

function movieRate(rate) {
    if (rate >= 7) {
        return "green";
    } else if (rate >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const wantedMovie = search.ariaValueMax;

    if (wantedMovie) {
        movies(SEARCHAPI + wantedMovie);

        search.value = "";
    }
});