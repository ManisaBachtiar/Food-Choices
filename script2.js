let previousPages = [];
let nextPage = null;

window.addEventListener("load", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get("query");

  if (queryParam) {
    fetchRecipes(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&q=${queryParam}`,
    );
  } else {
    console.error("Parameter query tidak ditemukan");
  }

  const clickedIndex = parseInt(urlParams.get("index"));

  if (!isNaN(clickedIndex)) {
    if (clickedIndex === 0) {
      fetchRecipes(
        "https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&dishType=Biscuits%20and%20cookies&dishType=Bread&dishType=Cereals&dishType=Condiments%20and%20sauces&dishType=Desserts&dishType=Drinks&dishType=Main%20course&dishType=Pancake&dishType=Preps&dishType=Preserve&dishType=Salad&dishType=Sandwiches&dishType=Side%20dish&dishType=Soup&dishType=Starter&dishType=Sweets",
      );
    } else if (clickedIndex === 1) {
      fetchRecipes(
        "https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&mealType=Teatime",
      );
    } else {
      console.error("Invalid index:", clickedIndex);
    }
  }
});

function fetchRecipes(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data received:", data); // Log the received data
      let paginationPage = "";
      let foodSearch = data.hits;
      nextPage = data._links.next ? data._links.next.href : null;

      foodSearch.forEach((n) => (paginationPage += showCards(n)));

      let foodContainer = document.querySelector(".food-container");
      foodContainer.innerHTML = paginationPage;

      previousPages.push({ url, data });

      let paginationContainer = document.querySelector(".pagination-container");
      paginationContainer.innerHTML = showPagination();

      document.querySelectorAll(".labelLink").forEach((link, index) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          handleCardClick(foodSearch[index].recipe);
        });
      });

      let paginationNext = document.querySelector(".pagination-next");
      paginationNext.addEventListener("click", function () {
        fetchRecipes(nextPage);
      });

      let paginationPrevious = document.querySelector(".pagination-previous");
      paginationPrevious.addEventListener("click", function () {
        fetchPreviousData();
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function fetchPreviousData() {
  if (previousPages.length > 1) {
    previousPages.pop();

    let previousPage = previousPages.pop();
    fetchRecipes(previousPage.url);
  }
}

function showCards(m) {
  return `<div class="card">
    <img src="${m.recipe.image}" loading="lazy">
    <h5><a href="#" class="labelLink">${m.recipe.label}</a></h5>
    <p>${m.recipe.mealType}</p>
  </div>`;
}

function showPagination() {
  return `<button class="pagination-previous">Previous</button>
    <button class="pagination-next">Next</button>`;
}

function handleCardClick(recipe) {
  localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
  window.location.assign("index3.html");
}
