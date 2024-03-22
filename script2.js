let previousPages = [];
let nextPage = null;
let clickedIndex = null;
let clickedIndex1 = null;
window.addEventListener("load", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get("query");

  if (queryParam) {
    fetchRecipes(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=076f43bf&app_key=3e6837f40ecfd40b40632b5fb3e5e42c&q=${queryParam}`,
    );
  } else {
    console.error("Parameter query tidak ditemukan");
  }

  clickedIndex1 = parseInt(urlParams.get("index1"));
  if (!isNaN(clickedIndex1)) {
    switch (clickedIndex1) {
      case 0:
        fetchRecipes1(
          "https://api.edamam.com/api/recipes/v2?type=public&app_id=370c2990&app_key=e174ba5713b2f4e84b8d4f93274afaf9&mealType=Breakfast",
        );
        break;

      case 1:
        fetchRecipes1(
          "https://api.edamam.com/api/recipes/v2?type=public&app_id=ffdd7a56&app_key=325e9b4cd35cbdb222d08623818e9fc4&mealType=Lunch",
        );
        break;
      case 2:
        fetchRecipes1(
          "https://api.edamam.com/api/recipes/v2?type=public&app_id=d0814049&app_key=b76f9cc2c88b9aee175950ded1a03b8b&mealType=Dinner",
        );
        break;
      case 3:
        fetchRecipes(
          "https://api.edamam.com/api/recipes/v2?type=public&app_id=293debff&app_key=81b324e2ab4b50ab8a6434389c41e462&dishType=Drinks",
        );
        break;
      default:
        console.error("Invalid index:", clickedIndex1);
    }
  }

  clickedIndex = parseInt(urlParams.get("index"));
  if (!isNaN(clickedIndex)) {
    switch (clickedIndex) {
      case 0:
        fetchRecipes(
          "https://api.edamam.com/api/recipes/v2?type=public&app_id=293debff&app_key=81b324e2ab4b50ab8a6434389c41e462&dishType=Biscuits%20and%20cookies&dishType=Bread&dishType=Cereals",
        );
        break;
      case 1:
        fetchRecipes(
          "https://api.edamam.com/api/recipes/v2?type=public&app_id=ffdd7a56&app_key=325e9b4cd35cbdb222d08623818e9fc4&dishType=Main%20course",
        );
        break;
      case 2:
        fetchRecipes(
          "https://api.edamam.com/api/recipes/v2?type=public&app_id=370c2990&app_key=e174ba5713b2f4e84b8d4f93274afaf9&dishType=Starter",
        );
        break;
      case 3:
        fetchRecipes(
          "https://api.edamam.com/api/recipes/v2?type=public&app_id=370c2990&app_key=e174ba5713b2f4e84b8d4f93274afaf9&dishType=Condiments%20and%20sauces",
        );
        break;
      case 4:
        fetchRecipes(
          "https://api.edamam.com/api/recipes/v2?type=public&app_id=076f43bf&app_key=3e6837f40ecfd40b40632b5fb3e5e42c&dishType=Preserve",
        );
        break;
      default:
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
function fetchRecipes1(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let paginationPage = "";
      let foodSearch = data.hits;
      nextPage = data._links.next ? data._links.next.href : null;

      foodSearch.forEach((n) => (paginationPage += showCards1(n)));

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
        fetchRecipes1(nextPage);
      });

      let paginationPrevious = document.querySelector(".pagination-previous");
      paginationPrevious.addEventListener("click", function () {
        fetchPreviousData1();
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
function fetchPreviousData1() {
  if (previousPages.length > 1) {
    previousPages.pop();

    let previousPage = previousPages.pop();
    fetchRecipes1(previousPage.url);
  }
}

function showCards(m) {
  return `<div class="card">
    <img src="${m.recipe.image}" loading="lazy">
    <h5><a href="#" class="labelLink">${m.recipe.label}</a></h5>
    <p>${m.recipe.dishType}</p>
  </div>`;
}
function showCards1(m) {
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
