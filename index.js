console.log("hello");
// fetch(`http://www.omdbapi.com/?t=${e.target.value}&apikey=${access_token}`)

let access_token = "a6aa9d5a";
// const btn = document.getElementById("btn");
const search = document.getElementById("search");
const suggestion = document.getElementById("match-list");
let currentMovie = {};
//This favMovie() function will add the clicked movie to the favourite list in local storage 
function favMovie(e) {
  const first = e.target.name.split(" ");
  const movieName = first[0] + first[1];
  console.log("details", movieName);
  if (e.target.innerHTML == "Favourite") {
    e.target.innerHTML = "Unfavourite";
    let favmovie = JSON.parse(localStorage.getItem("favMovie")) || [];
    let results = JSON.parse(localStorage.getItem("results")) || [];
    favmovie.push(results[Number(e.target.id)]);
    localStorage.setItem("favMovie", JSON.stringify(favmovie));
    e.target.value = " ";
    // var div = this.parentElement;
    // div.style.display = "none";
  }
}

function movieDetails(event) {
  let results = JSON.parse(localStorage.getItem("results")) || [];
  let current_movie = results[Number(event.target.id)];
  localStorage.setItem("current_movie", JSON.stringify(current_movie));
  window.location.assign("movie.html");
}
//This will fetch the API of words typed by the user whenever it enters the words in the input tag
search.addEventListener("input", (e) => {
  const fetchApi = async function () {
    //  await fetch(`https://www.omdbapi.com/?t=${e.target.value}&apikey=${access_token}`)
    // .then(response => response.json())
    // .then((data => {
    //   console.log(data);
    // data = JSON.parse();
    const response = await fetch(
      `https://www.omdbapi.com/?t=${e.target.value}&apikey=${access_token}`
    );
    const data = await response.json();
    console.log(data);
    //  Object.entries(data).forEach(v => {
    let results = JSON.parse(localStorage.getItem("results")) || [];
    results.push(data);
    localStorage.setItem("results", JSON.stringify(results));
    const avatar = data.Title;
    const imgsrc = data.Poster;
    currentMovie = data;
    suggestion.innerHTML += `
          <div class="card-body">
        <h5 class="card-title">${avatar}</h5>
        <img src="${imgsrc}" class="img-mov" >
        <button class="btn btn-primary" id="${results.length - 1}" name=${JSON.stringify(
      data
    )} onclick="favMovie(event)">Favourite</button>
        <button class="btn btn-primary" id="${
          results.length - 1
        }" onclick=movieDetails(event)>Details</button>
      </div>`;

   
  };

  fetchApi();
});
