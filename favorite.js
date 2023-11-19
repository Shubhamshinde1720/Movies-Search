let favm = document.getElementById("fav_movie");
//Here we will write a function when the user clicks on a favourite button and we will fetch favmovie by ID saved in local storage and display it.
function renderMovie() {
  let movieList = document.querySelector("#fav_movie");
  if (movieList) movieList.innerHTML = "";
  let favmovie = localStorage.getItem("favMovie");

  let savedMovie = JSON.parse(favmovie);
  if (savedMovie == null) {
    favmovie = [];
  } else {
    savedMovie.forEach(function (el) {
      const avatar = el.Title;
      const imgsrc = el.Poster;

      favm.innerHTML += ` 
   <ul>
    <li>
    <div class="card-body">
    <h5 class="card-title">${avatar}</h5>
    <img src="${imgsrc}"  class="img-mov"  >
    <button class="btn btn-primary" id="unfav">Unfavorite</button>
  </div>
  </li>
  <ul>`;
// here is the function for removing the movie from the favorite list
      let Unfavouritelist = document.querySelectorAll("#unfav");
      Unfavouritelist.forEach((unfav) => {
        unfav.addEventListener("click", function () {
          let favmovie = JSON.parse(localStorage.getItem("favMovie")) || [];
          let text = unfav.parentElement.innerText.split("\n")[0];
          console.log("text", favmovie[0].Title === text);
          let filteredFavMovie = favmovie.filter(
            (movie) => movie.Title !== text
          );
          console.log("filtered array", filteredFavMovie);
          localStorage.setItem("favMovie", JSON.stringify(filteredFavMovie));
          renderMovie();
        });
      });
    });
  }
}
renderMovie();
