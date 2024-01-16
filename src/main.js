document.addEventListener("DOMContentLoaded", () => {
  src = "https://code.jquery.com/jquery-3.7.1.js";
  integrity = "sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=";
  crossorigin = "anonymous";

  // 페이지 이동 시 또는 처음 렌더링 시 localStorage 초기화
  initializeLocalStorage();

  // let allMovies = [];

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

    console.log(data.results);

    // initializeLocalStorage();

    localStorage.setItem("movieData", JSON.stringify(data));

    localStorage.setItem(`adult`, "");
    localStorage.setItem(`backdrop_path`, "");
    localStorage.setItem(`genre_ids`, "");
    localStorage.setItem(`id`, "");
    localStorage.setItem(`original_language`, "");
    localStorage.setItem(`original_title`, "");
    localStorage.setItem(`overview`, "");
    localStorage.setItem(`popularity`, "");
    localStorage.setItem(`poster_path`, "");
    localStorage.setItem(`release_date`, "");
    localStorage.setItem(`video`, "");
    localStorage.setItem(`vote_average`, "");
    localStorage.setItem(`vote_count`, "");

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
            <p id=vote_average>${movie.vote_average}</p>
          </li>`
      )
      .join("");

    cardList.addEventListener("click", handleClickCard);

    function handleClickCard({ target }) {
      if (target === cardList) return;

      const card = target.closest(".movie-card");

      if (card) {
        alert(`영화 id: ${card.id}`);

        // 일단 다 넘기고 나중에 undefined만 거르는 것도 가능하겠지만 일단 이렇게~

        // // 객체 생성
        // const movie = {
        //   adult: `${card.adult}`,
        //   backdrop_path: `${card.backdrop_path}`,
        //   genre_ids: `${card.genre_ids}`,
        //   id: `${card.id}`,
        //   original_language: `${card.original_language}`,
        //   original_title: `${card.original_title}`,
        //   overview: `${card.overview}`,
        //   popularity: `${card.popularity}`,
        //   poster_path: `${card.poster_path}`,
        //   release_date: `${card.release_date}`,
        //   video: `${card.video}`,
        //   vote_average: `${card.vote_average}`,
        //   vote_count: `${card.vote_count}`
        // };

        // // JSON 문자열로 변환
        // const movieJson = JSON.stringify(movie);

        // // 로컬스토리지에 저장
        // localStorage.setItem("movie", movieJson);

        if (card.adult) {
          localStorage.setItem("adult", card.adult);
        } else {
          localStorage.setItem("adult", "");
        }

        if (card.backdrop_path) {
          localStorage.setItem("backdrop_path", card.backdrop_path);
        } else {
          localStorage.setItem("backdrop_path", "");
        }

        if (card.genre_ids) {
          localStorage.setItem("genre_ids", card.genre_ids);
        } else {
          localStorage.setItem("genre_ids", "");
        }

        if (card.id) {
          localStorage.setItem("id", card.id);
        } else {
          localStorage.setItem("id", "");
        }

        if (card.original_language) {
          localStorage.setItem("original_language", card.original_language);
        } else {
          localStorage.setItem("original_language", "");
        }

        if (card.original_title) {
          localStorage.setItem("original_title", card.original_title);
        } else {
          localStorage.setItem("original_title", "");
        }

        if (card.overview) {
          localStorage.setItem("overview", card.overview);
        } else {
          localStorage.setItem("overview", "");
        }

        if (card.popularity) {
          localStorage.setItem("popularity", card.popularity);
        } else {
          localStorage.setItem("popularity", "");
        }

        if (card.poster_path) {
          localStorage.setItem("poster_path", card.poster_path);
        } else {
          localStorage.setItem("poster_path", "");
        }

        if (card.release_date) {
          localStorage.setItem("release_date", card.release_date);
        } else {
          localStorage.setItem("poster_path", "");
        }

        if (card.video) {
          localStorage.setItem("video", card.video);
        } else {
          localStorage.setItem("poster_path", "");
        }

        if (card.vote_average) {
          localStorage.setItem("vote_average", card.vote_average);
        } else {
          localStorage.setItem("vote_average", "");
        }

        if (card.vote_count) {
          localStorage.setItem("vote_count", card.vote_count);
        } else {
          localStorage.setItem("vote_count", "");
        }

        window.location.href = "detail_index.html?index=" + card.id;
      }
    }
  }

  generateMovieCards();

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
});

// 페이지 이동 시 또는 처음 렌더링 시 localStorage 초기화 함수
function initializeLocalStorage() {
  const currentPage = window.location.pathname;

  // 페이지 이동 시 또는 처음 렌더링 시 localStorage 초기화
  if (currentPage !== "/index.html") {
    localStorage.clear(); // localStorage를 초기화합니다.
  }
}
