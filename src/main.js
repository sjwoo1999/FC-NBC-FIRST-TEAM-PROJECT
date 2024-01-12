document.addEventListener("DOMContentLoaded", () => {
  let allMovies = [];

  async function fetchMovieData() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmFjMDczZmM2NGZhZGE5YTMxNTU1MzlkNWYzMGViZCIsInN1YiI6IjY1OTc3Yzc4NTkwN2RlNTQ2ZTYzYzA3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UicVG0R1cpvWhApW9lCa5MASIhIm99FNmHtVGJ6mIjU"
      }
    };
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&include_adult=false",
      options
    );
    const data = await response.json();
    return data.results;
  }

  async function generateMovieCards() {
    const movies = await fetchMovieData();
    allMovies = movies;
    const cardList = document.querySelector("#card-list");

    cardList.innerHTML = movies
      .map(
        (movie) => `
          <li class="movie-card" id=${movie.id}>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3 class="movie-title">${movie.title}</h3>
            <p>${movie.overview}</p>
            <p>Rating: ${movie.vote_average}</p>
          </li>`
      )
      .join("");

    cardList.addEventListener("click", handleClickCard);

    function handleClickCard({ target }) {
      if (target === cardList) return;

      const card = target.closest(".movie-card");

      if (card) {
        alert(`영화 id: ${card.id}`);
      }
    }
  }

  function renderMovieCards(movies, cardList) {
    cardList.innerHTML = movies
      .map(
        (movie) => `
          <li class="movie-card" id=${movie.id}>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3 class="movie-title">${movie.title}</h3>
            <p>${movie.overview}</p>
            <p>Rating: ${movie.vote_average}</p>
          </li>`
      )
      .join("");
  }

  async function handleSearch(searchKeyword) {
    const cardList = document.querySelector("#card-list");
    const filteredMovies = allMovies.filter((movie) => movie.title.toLowerCase().includes(searchKeyword.toLowerCase()));
    renderMovieCards(filteredMovies, cardList);
  }

  async function init() {
    await generateMovieCards();
  }

  init();

  const searchInput = document.querySelector("#search-input");
  searchInput.focus();

  const form = document.querySelector("#search-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSearch(searchInput.value);
  });
});
