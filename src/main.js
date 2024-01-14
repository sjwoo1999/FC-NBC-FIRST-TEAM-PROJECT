document.addEventListener("DOMContentLoaded", () => {
  async function fetchMovieData() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmFjMDczZmM2NGZhZGE5YTMxNTU1MzlkNWYzMGViZCIsInN1YiI6IjY1OTc3Yzc4NTkwN2RlNTQ2ZTYzYzA3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UicVG0R1cpvWhApW9lCa5MASIhIm99FNmHtVGJ6mIjU"
      }
    };
    const urlPopular = "https://api.themoviedb.org/3/movie/popular?language=ko&page=1";
    const response = await fetch(urlPopular, options);
    const data = await response.json();

    localStorage.setItem("movieData", JSON.stringify(data));
    // mainPage default currentMovieId 값 : 0
    localStorage.setItem("currentMovieId", "0");

    return data.results;
  }

  //   카드 생성
  async function generateMovieCards() {
    const movies = await fetchMovieData();
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

        // 현재 영화 아이디
        localStorage.setItem("currentMovieId", card.id);

        window.location.href = "detail_index.html?index=" + card.id;
      }
    }
  }
  generateMovieCards();
});

//   검색기능
const searchInput = document.querySelector("#search-input");
if (searchInput) {
  searchInput.focus();
} else {
  // search-input 요소가 존재하지 않습니다.
}

const form = document.querySelector("#search-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch(searchInput.value);
});

async function handleSearch(searchKeyword) {
  const movies = await fetchMovieData();
  const cardList = document.querySelector("#card-list");

  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchKeyword.toLowerCase()));

  renderMovieCards(filteredMovies, cardList);
}
