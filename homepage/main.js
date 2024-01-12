
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODM0OTc1MzMxNjNlNzE3ZDU0YjM1NjIzYTJhMWM3YyIsInN1YiI6IjY1OTNiYmZhY2U0ZGRjNmQzODdlZWE5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0JWDAgp6GlPFD0IpzFiVfmAR3y3vH1s6Um7dQ8lwXUU'
}};

const url = 'https://api.themoviedb.org/3/movie/popular?language=ko&page=1'
const detailUrl = 'https://api.themoviedb.org/3/movie/343611?language=ko&page=1?&append_to_response=videos'

const dataToStore = {
  options: options,
  url: url
};

localStorage.setItem('movieApiData', JSON.stringify(dataToStore));
