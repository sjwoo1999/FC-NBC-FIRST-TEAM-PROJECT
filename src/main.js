document.addEventListener("DOMContentLoaded", () => {
  src = "https://code.jquery.com/jquery-3.7.1.js";
  integrity = "sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=";
  crossorigin = "anonymous";

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

    localStorage.setItem("adult", "");
    localStorage.setItem("backdrop_path", "");
    localStorage.setItem("genre_ids", "");
    localStorage.setItem("id", "");
    localStorage.setItem("original_language", "");
    localStorage.setItem("original_title", "");
    localStorage.setItem("overview", "");
    localStorage.setItem("popularity", "");
    localStorage.setItem("poster_path", "");
    localStorage.setItem("release_date", "");
    localStorage.setItem("video", "");
    localStorage.setItem("vote_average", "");
    localStorage.setItem("vote_count", "");

    console.log(data.results);

    return data.results;
  }

  // 카드 생성
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
        alert(card + `영화 id: ${card.id}`);

        console.log("card.adult : " + card.adult);
        console.log("card.backdrop_path : " + card.backdrop_path);
        console.log("card.genre_ids : " + card.genre_ids);
        console.log("card.id : " + card.id);
        console.log("card.original_language : " + card.original_language);
        console.log("card.original_title : " + card.original_title);
        console.log("card.overview : " + card.overview);
        console.log("card.popularity : " + card.popularity);
        console.log("card.poster_path : " + card.poster_path);
        console.log("card.release_date : " + card.release_date);
        console.log("card.title : " + card.title);
        console.log("card.video : " + card.video);
        console.log("card.vote_average : " + card.vote_average);
        console.log("card.vote_count : " + card.vote_count);

        localStorage.setItem("adult", card.adult);
        localStorage.setItem("backdrop_path", card.backdrop_path);
        localStorage.setItem("genre_ids", card.genre_ids);
        localStorage.setItem("id", card.id);
        localStorage.setItem("original_language", card.original_language);
        localStorage.setItem("original_title", card.original_title);
        localStorage.setItem("overview", card.overview);
        localStorage.setItem("popularity", card.popularity);
        localStorage.setItem("poster_path", card.poster_path);
        localStorage.setItem("release_date", card.release_date);
        localStorage.setItem("title", card.title);
        localStorage.setItem("video", card.video);
        localStorage.setItem("vote_average", card.vote_average);
        localStorage.setItem("vote_count", card.vote_count);

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
