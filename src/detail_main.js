document.addEventListener("DOMContentLoaded", () => {
  const src = "https://code.jquery.com/jquery-3.7.1.js";
  const integrity = "sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=";
  const crossorigin = "anonymous";

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

    // localStorage.setItem("movieData", JSON.stringify(data));

    return data.results;
  }

  // 페이지 이동 시 또는 처음 렌더링 시 localStorage 초기화 함수
  function initializeLocalStorage() {
    const currentPage = window.location.pathname;

    // 페이지 이동 시 또는 처음 렌더링 시 localStorage 초기화
    if (currentPage !== "/index.html") {
      localStorage.clear(); // localStorage를 초기화합니다.
    }
  }

  const currentId = window.localStorage.getItem("id");

  alert(currentId);

  if (currentId === null) {
    // currentMovieId 값이 없는 경우
    alert("현재 보고 계신 영화가 없습니다.");
    return;
  }

  // localStorage에서 영화 정보 객체를 가져온다.
  const movieDataValue = localStorage.getItem("movieData");

  // movieData의 값이 존재하는지 확인한다.
  if (movieDataValue) {
    try {
      // JSON 형태의 문자열을 객체로 파싱한다.
      const movieDataObject = JSON.parse(movieDataValue);
      console.log(movieDataObject);

      // movieDataObject에서 results에 접근한다.
      const results = movieDataObject.results;
      // console.log(results);

      // results가 존재하고 배열인지 확인한다.
      if (results && Array.isArray(results)) {
        // results 배열을 순회하면서 'id' 값을 비교한다.
        let isMatchFound = false;

        for (const resultItem of results) {
          console.log("resultItem.id : " + resultItem.id);
          console.log("currentId : " + currentId);

          // 'id' key가 존재하고 localStorage.id와 값이 같은지 확인한다.
          if (resultItem.id && resultItem.id === currentId) {
            console.log("일치하는 값이 찾아졌습니다.");
            isMatchFound = true;
            // 여기에서 필요한 추가 작업을 수행할 수 있습니다.
            break; // 일치하는 값이 찾아졌으므로 루프를 종료합니다.
          }
        }

        if (!isMatchFound) {
          alert("일치하는 값이 없어요!!");
        }
      } else {
        console.error("results가 존재하지 않거나 배열이 아닙니다.");
      }
    } catch (error) {
      console.error("movieData를 파싱하는 동안 오류가 발생했습니다.", error);
    }
  } else {
    console.error("movieData가 localStorage에 존재하지 않습니다.");
  }

  async function generateCurrentMovie() {
    const movieDatas = await fetchMovieData();

    // innerHTML에 출력하기
    const currentMovie = document.querySelector("#currentMovie");

    // currentMovie가 null이 아닌지 확인
    if (currentMovie) {
      // innerHTML에 출력하기 전에 undefined인지 판단해서 undefined는 출력하지 않도록 수정
      currentMovie.innerHTML = `
        <li class="movie-data" id=${currentId}>
          <div>
            <p>currentMovie : ${currentId}</p>
            ${localStorage.poster_path ? `<p>${localStorage.poster_path}</p>` : ""}
            ${localStorage.release_date ? `<p>${localStorage.release_date}</p>` : ""}
            ${localStorage.vote_count ? `<p>${localStorage.vote_count}</p>` : ""}
            ${localStorage.adult ? `<p>${localStorage.adult}</p>` : ""}
            ${localStorage.video ? `<p>${localStorage.video}</p>` : ""}
            ${localStorage.genre_ids ? `<p>${localStorage.genre_ids}</p>` : ""}
            ${localStorage.original_language ? `<p>${localStorage.original_language}</p>` : ""}
            ${localStorage.backdrop_path ? `<p>${localStorage.backdrop_path}</p>` : ""}
            ${localStorage.vote_average ? `<p>${localStorage.vote_average}</p>` : ""}
            ${localStorage.overview ? `<p>${localStorage.overview}</p>` : ""}
            ${localStorage.id ? `<p>${localStorage.id}</p>` : ""}
            ${localStorage.original_title ? `<p>${localStorage.original_title}</p>` : ""}
            ${localStorage.popularity ? `<p>${localStorage.popularity}</p>` : ""}
          </div>
        </li>
      `;
    } else {
      console.error("#currentMovie 요소를 찾을 수 없습니다.");
    }
  }

  generateCurrentMovie();
});
