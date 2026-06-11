// ---------- Phase 1: select elements ----------
const appTitle = document.getElementById("app-title");
const movieCount = document.getElementById("movie-count");
const movieForm = document.getElementById("movie-form");
const titleInput = document.getElementById("title-input");
const genreInput = document.getElementById("genre-input");
const movieList = document.getElementById("movie-list");
const clearWatchedBtn = document.getElementById("clear-watched-btn");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

// ---------- Phase 3 + 4: add a movie ----------
movieForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = titleInput.value;
  const genre = genreInput.value;
  const card = createMovieCard(title, genre);
  movieList.appendChild(card);
  updateCount();
  movieForm.reset();
  console.log(title);
  console.log(genre);
});

// ---------- Phase 4: build a card ----------
function createMovieCard(title, genre) {
  const li = document.createElement("li");
  li.className = "movie-card";
  li.setAttribute("data-genre", genre);

  const info = document.createElement("div");
  info.className = "movie-info";

  const titleSpan = document.createElement("span");
  titleSpan.className = "movie-title";
  titleSpan.textContent = title;

  const genreSpan = document.createElement("span");
  genreSpan.className = "movie-genre";
  if (genre === "") {
    genreSpan.textContent = "No genre";
  } else {
    genreSpan.textContent = genre;
  }

  info.appendChild(titleSpan);
  info.appendChild(genreSpan);

  const actions = document.createElement("div");
  actions.className = "movie-actions";

  const watchBtn = document.createElement("button");
  watchBtn.className = "watch-btn";
  watchBtn.textContent = "Mark Watched";

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove";

  actions.appendChild(watchBtn);
  actions.appendChild(removeBtn);

  li.appendChild(info);
  li.appendChild(actions);

  return li;
}

// ---------- Phase 5: card buttons ----------
movieList.addEventListener("click", function (event) {
  if (event.target.tagName !== "BUTTON") return;
  const card = event.target.closest("li");

  if (event.target.classList.contains("remove-btn")) {
    card.remove();
    updateCount();
    applyFilter(currentFilter);
  }

  if (event.target.classList.contains("watch-btn")) {
    card.classList.toggle("watched");
    if (card.classList.contains("watched")) {
      event.target.textContent = "Unmark Watched";
    } else {
      event.target.textContent = "Mark Watched";
    }
    applyFilter(currentFilter);
  }
});

// ---------- Phase 6: count ----------
function updateCount() {
  const cards = document.querySelectorAll(".movie-card");
  movieCount.textContent = cards.length + " movies";
}

// ---------- Phase 6: filters ----------
function updateFilterButtons(activeFilter) {
  filterBtns.forEach(function (btn) {
    btn.classList.remove("active-filter");
  });
  document.getElementById("filter-" + activeFilter).classList.add("active-filter");
}

function applyFilter(filter) {
  currentFilter = filter;
  updateFilterButtons(filter);
  const cards = document.querySelectorAll(".movie-card");
  cards.forEach(function (card) {
    if (filter === "all") {
      card.classList.remove("filtered-out");
    } else if (filter === "watched") {
      if (card.classList.contains("watched")) {
        card.classList.remove("filtered-out");
      } else {
        card.classList.add("filtered-out");
      }
    } else if (filter === "unwatched") {
      if (card.classList.contains("watched")) {
        card.classList.add("filtered-out");
      } else {
        card.classList.remove("filtered-out");
      }
    }
  });
}

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const filterType = btn.id.replace("filter-", "");
    applyFilter(filterType);
  });
});

// ---------- Phase 6: clear watched ----------
clearWatchedBtn.addEventListener("click", function () {
  const watched = document.querySelectorAll(".movie-card.watched");
  watched.forEach(function (card) {
    card.remove();
  });
  updateCount();
  applyFilter(currentFilter);
});

// getAttribute("value") reads the original value written in the HTML.
// .value reads the current text the user typed into the input right now.

// The listener is on the list, not each button, so it also works for cards
// added later (event delegation). closest("li") walks up from the clicked
// button to find the whole card it belongs to.