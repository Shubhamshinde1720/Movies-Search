console.log("hello");
//Started javascript for index.html page...

// fetch(`http://www.omdbapi.com/?t=${e.target.value}&apikey=${access_token}`)
//token access by following id
let access_token = "a6aa9d5a";
// const btn = document.getElementById("btn");
const search = document.getElementById("search");
const suggestion = document.getElementById("match-list");
let currentMovie = {};


// This favMovie function adds the clicked movie to the favorite Movies list in local storage....... 
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

//add an event for movie details.....
function movieDetails(event) {
  let results = JSON.parse(localStorage.getItem("results")) || [];
  let current_movie = results[Number(event.target.id)];
  localStorage.setItem("current_movie", JSON.stringify(current_movie));
  window.location.assign("movie.html");
}


// This fetches the API of words typed by the user when the user enters anything in the search bar...
search.addEventListener("input", (e) => {
  const fetchApi = async function () {
    const response = await fetch(
      `https://www.omdbapi.com/?t=${e.target.value}&apikey=${access_token}`);
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
    )} onclick="favMovie(event)">Add in Favorite</button>
        <button class="btn btn-primary" id="${
          results.length - 1
        }" onclick=movieDetails(event)>Movie Details</button>
      </div>`;

   
  };

  fetchApi();
});
