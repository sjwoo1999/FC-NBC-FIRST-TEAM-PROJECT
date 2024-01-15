document.addEventListener("DOMContentLoaded", () => {
  const localStorage = window.localStorage;

  const currentMovieId = localStorage.getItem("currentMovieId");

  if (currentMovieId === null) {
    // currentMovieId 값이 없는 경우
    alert("현재 보고 계신 영화가 없습니다.");
    return;
  }

  // 영화 정보 객체를 배열로 변환
  const movieList = [window.localStorage.movieData];

  console.log(movieList);

  // 영화 정보 출력
  const moiveData = document.querySelector("dataCard");

  if (currentMovieId !== 0) {
    alert("exist : " + currentMovieId);
  } else {
    alert("return");
    return;
  }

  moiveData.innerHTML = movieList
    .map(
      (movie) => `
        <li class="dataCard" id=${currentMovieId}>
          <div>
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
          </div>
          <div>
            <h1 class="movie-title">${movie.title}</h1>
            <h2 class="subtitle">${movie.subtitle}</h2>
            <ul>
              <h3 class="release">${movie.release}</h3>
              <h3 class="rating">${movie.rating}</h3>
              <h3 class="genre">${movie.genre}</h3>
            </ul>
          </div>
        </li>
      `
    )
    .join("");
});

/*
        <p class="overview">${movie.overview}</p>
          <h3>출연진</h3>
          <ul>
            <li class="cast">
              <img class="castImg" src="https://image.tmdb.org/t/p/w500/${movie.cast.profile_path}" alt="${movie.cast.name}">
              <h3 class="castName">${movie.cast.name}</h3>
              <h3 class="char">${movie.cast.character}</h3>
            </li>
          </ul>
*/
