document.addEventListener("DOMContentLoaded", () => {
  const currentId = window.localStorage.getItem("id");

  alert(currentId);

  if (currentId === null) {
    // currentMovieId 값이 없는 경우
    alert("현재 보고 계신 영화가 없습니다.");
    return;
  }

  // 영화 정보 객체를 배열로 변환
  const movieDataString = window.localStorage.getItem("movieData");

  if (movieDataString) {
    console.log("zz");
  } else {
    console.log("movieDataString nonono");
  }

  const movieList = JSON.parse(movieDataString);

  if (movieList) {
    console.log("ㅋㅋ");
  } else {
    console.log("nonono");
  }

  // 가져온 id 값으로 해당하는 movie 찾고, 관련 데이터 하나의 객체로 담는다 ~

  // currentId와 같은 id를 갖는 인덱스를 찾기
  const index = movieList.findIndex((movie) => movie.id === currentId);

  // innerHTML에 출력하기
  const currentMovie = document.querySelector("#currentMovie");

  currentMovie.innerHTML = `
        <li class="movie-data" id=${currentId}>
          <div>
            <p>currentMovie : ${currentId}</p>
            <p>${movieList[index].adult}</p>
            <p>${movieList[index].backdrop_path}</p>
            <p>${movieList[index].genre_ids}</p>
            <p>${movieList[index].id}</p>
            <p>${movieList[index].original_language}</p>
            <p>${movieList[index].original_title}</p>
            <p>${movieList[index].overview}</p>
            <p>${movieList[index].popularity}</p>
            <p>${movieList[index].poster_path}</p>
            <p>${movieList[index].release_date}</p>
            <p>${movieList[index].video}</p>
            <p>${movieList[index].vote_average}</p>
            <p>${movieList[index].vote_count}</p>
          </div>
        </li>
      `;
});
