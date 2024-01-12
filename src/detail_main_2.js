const btn = document.getElementById('btn') 
function watchMovie () {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODM0OTc1MzMxNjNlNzE3ZDU0YjM1NjIzYTJhMWM3YyIsInN1YiI6IjY1OTNiYmZhY2U0ZGRjNmQzODdlZWE5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0JWDAgp6GlPFD0IpzFiVfmAR3y3vH1s6Um7dQ8lwXUU'
    }
  };

  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'

  fetch(url, options)
    .then(res => res.json()).then(data => {
      console.log(data);
    })
    // .then(response => response.json())
    // .then(response => console.log(response))
    .catch(err => console.error(err));
}

btn.addEventListener('click', watchMovie);