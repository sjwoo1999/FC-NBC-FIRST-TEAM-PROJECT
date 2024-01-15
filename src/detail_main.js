document.addEventListener("DOMContentLoaded", () => {
  const currentId = window.localStorage.getItem("id");

  if (currentId === null) {
    // currentMovieId 값이 없는 경우
    alert("현재 보고 계신 영화가 없습니다.");
    return;
  }

  // 영화 정보 객체를 배열로 변환
  const movieList = [window.localStorage.movieData];

  for (let i = 0; i < movieList.length(); i++) {
    console.log(movieList[i]);
  }

  if (currentId !== 0) {
    alert("exist : " + currentId);
  } else {
    alert("return");
    return;
  }

  // currentMovieId가 가르키고 있는 movie에 대한 정보를 받아오는 currentMovie 객체를 하나 만들어서
  // 그걸 innerHTML에 뿌려준다

  // currentMovieId가 가르키고 있는 영화 정보 객체를 가져온다
  // const currentMovie = movieList.find((movie) => movie.id === currentMovieId);
  const currentMovie = document.querySelector("#currentMovie");

  currentMovie.innerHTML = `
        <li class="movie-data" id=${currentId}>
          <div>
            
          </div>
        </li>
      `;
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
