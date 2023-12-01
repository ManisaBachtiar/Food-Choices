let nextPage = null;

window.addEventListener("load", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get("query");

  if (queryParam) {
    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&q=${queryParam}`,
    )
      .then((response) => response.json())
      .then((response) => {
        let foodSearch = response.hits;
        let cards = "";
        let pagination = "";
        foodSearch.forEach((m) => (cards += showCards(m)));
        pagination = showPagination(); //ini memanggil function
        let paginationContainer = document.querySelector(
          ".pagination-container",
        ); //memanggil container pagination
        let foodContainer = document.querySelector(".food-container");
        foodContainer.innerHTML = cards;
        paginationContainer.innerHTML = pagination; //ini untuk menampilkan button pagination next dan previous agar berjalan bareng/setelah items muncul

        nextPage = response._links.next ? response._links.next.href : null; // mengecek apakah property next ada dalam object data._links, jika ada maka di isi dengan nilai next.href, jika tidak di isi null

        let paginationNext = document.querySelector(".pagination-button-next");
        paginationNext.addEventListener("click", function() {
          fetchRecipeData();
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else {
    console.error("Query parameter not found");
  }
});

function fetchRecipeData() {
  if (nextPage) {
    fetch(nextPage)
      .then((response) => response.json())
      .then((data) => {
        let paginationPage = "";
        let nextSearch = data.hits; //ini mengambil data hits yang API nya sudah di fetch (nextPage)
        nextPage = data._links.next ? data._links.next.href : null; //mengecek apakah ada data next di dalam API yang sudah di fetch
        console.log(nextPage);
        nextSearch.forEach((n) => (paginationPage += showCards(n))); // data hits yang sudah diambil di loop untuk ditampilkan di showCard
        let foodContainer = document.querySelector(".food-container");
        foodContainer.innerHTML = paginationPage;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
}

function showCards(m) {
  return `<div class="card">
    <img src="${m.recipe.image}" >
    <h5> ${m.recipe.label} </h5>
  </div>`;
}

function showPagination() {
  return `<button class="pagination-button-previous">Previous</button>
    <button class="pagination-button-next">Next</button>`;
}
