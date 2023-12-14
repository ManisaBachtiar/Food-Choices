// let foodClose = document.getElementsByClassName("dropdown-content");
// let foodCloseBtn = document.getElementsByClassName("nextDrop");
// let foodLi = foodClose[0];
// let foodBtn = foodCloseBtn[0];
// // let last = foodClose.lastElementChild;
// foodBtn.addEventListener("click", () => {
//   if (foodLi.style.display === "none" || foodLi.style.display === "") {
//     foodLi.style.display = "block";
//   } else {
//     foodLi.style.display = "none";
//   }
// });
let closeBar = document.getElementsByClassName("bars");
let closeBarOpen = closeBar[0];
let sideBar = document.getElementsByClassName("slide-nav3");
let sideBarOpen = sideBar[0];
let barblur = document.getElementsByClassName("blur");
let blurBar = barblur[0];
let gaaaf = document.querySelector(".slide img");

let closeBarClose = document.getElementsByClassName("close-bar");
let sideBarClose = closeBarClose[0];
closeBarOpen.addEventListener("click", () => {
  if (
    sideBarOpen.style.display === "none" ||
    sideBarOpen.style.display === ""
  ) {
    sideBarOpen.style.display = "block";
    blurBar.style.display = "block";
  } else {
    sideBarOpen.style.display = "none";
  }
});
sideBarClose.addEventListener("click", () => {
  if (
    sideBarOpen.style.display === "none" ||
    sideBarOpen.style.display === ""
  ) {
    sideBarOpen.style.display = "block";
  } else {
    sideBarOpen.style.display = "none";
    blurBar.style.display = "none";
  }
});

// let searchButton = document.querySelector(".search-button");
// let inputKeyword = document.querySelector(".search");
//
// searchButton.addEventListener("click", function () {
//   fetch(
//     "https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&q=" +
//       inputKeyword.value,
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       let foodSearch = response.hits;
//       window.location.href = `index2.html?query=${encodeURIComponent(
//         inputKeyword.value,
//       )}`;
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// });
let searchButton = document.querySelector(".search-button");
let inputKeyword = document.querySelector(".search");

searchButton.addEventListener("click", fetchData);
inputKeyword.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    fetchData();
  }
});

function fetchData() {
  fetch(
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&q=" +
      inputKeyword.value,
  )
    .then((response) => response.json())
    .then((data) => {
      let foodSearch = data.hits;
      if (foodSearch.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Item Not Found",
          text: "Sorry, the item you are looking for was not found.",
        });
      } else {
        window.location.href = `index2.html?query=${encodeURIComponent(
          inputKeyword.value,
        )}`;
      }
      // window.location.href = `index2.html?query=${encodeURIComponent(
      //   inputKeyword.value,
      // )}`;
    })
    .catch((error) => {
      alert("Error fetching data:", error);
    });
}

let dishtypeFoods;
let mealtypeFoods;
let cuisinetypeFoods;
let healthtypeFoods;
let diettypeFoods;
window.addEventListener("load", function () {
  let dishtypeURL =
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&dishType=Biscuits%20and%20cookies&dishType=Bread&dishType=Cereals&dishType=Condiments%20and%20sauces&dishType=Desserts&dishType=Drinks&dishType=Main%20course&dishType=Pancake&dishType=Preps&dishType=Preserve&dishType=Salad&dishType=Sandwiches&dishType=Side%20dish&dishType=Soup&dishType=Starter&dishType=Sweets&random=true";

  let mealtypeURL =
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&mealType=Teatime&random=true";
  let cuisinetypeURL =
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&cuisineType=American&cuisineType=Asian&cuisineType=British&cuisineType=Caribbean&cuisineType=Central%20Europe&cuisineType=Chinese&cuisineType=Eastern%20Europe&cuisineType=French&cuisineType=Indian&cuisineType=Italian&cuisineType=Japanese&cuisineType=Kosher&cuisineType=Mediterranean&cuisineType=Mexican&cuisineType=Middle%20Eastern&cuisineType=Nordic&cuisineType=South%20American&cuisineType=South%20East%20Asian&random=true";
  let healthtypeURL =
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&health=alcohol-free&health=egg-free&health=fish-free&health=kidney-friendly&health=low-sugar&health=peanut-free&health=pork-free&health=vegan&health=vegetarian&random=true";
  let diettypeURL =
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&diet=high-protein&diet=low-carb&diet=low-fat&diet=low-sodium&random=true";
  Promise.all([
    fetch(dishtypeURL),
    fetch(mealtypeURL),
    fetch(cuisinetypeURL),
    fetch(healthtypeURL),
    fetch(diettypeURL),
  ])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json())),
    )
    .then(
      ([
        dishtypeData,
        mealtypeData,
        cuisinetypeData,
        healthtypeData,
        diettypeData,
      ]) => {
        dishtypeFoods = dishtypeData.hits;
        mealtypeFoods = mealtypeData.hits;
        cuisinetypeFoods = cuisinetypeData.hits;
        healthtypeFoods = healthtypeData.hits;
        diettypeFoods = diettypeData.hits;
        processData();
      },
    )
    .catch((error) => {
      console.log("eerrr", error);
    });
});

function processData() {
  let slides = "";
  let slides2 = "";
  let slides3 = "";
  let slides4 = "";
  let slides5 = "";
  if (dishtypeFoods && dishtypeFoods.length > 0) {
    dishtypeFoods.forEach((m) => {
      let image = m.recipe.image;
      let label = m.recipe.label;
      let type = m.recipe.dishType;
      let kataBatas = 5;
      let labelArray = label.split(" ");
      if (labelArray.length > kataBatas) {
        label = labelArray.slice(0, kataBatas).join(" ");
      }
      let typeBatas = 2;
      if (type.length > typeBatas) {
        type = type.slice(0, typeBatas).join(" ");
      }
      slides += showSlides({ image, label, type });
    });
  }

  if (mealtypeFoods && mealtypeFoods.length > 0) {
    mealtypeFoods.forEach((m) => {
      let image = m.recipe.image;
      let label = m.recipe.label;
      let type = m.recipe.mealType;
      let kataBatas = 5;
      let labelArray = label.split(" ");
      if (labelArray.length > kataBatas) {
        label = labelArray.slice(0, kataBatas).join(" ");
      }

      let typeBatas = 2;
      if (type.length > typeBatas) {
        type = type.slice(0, typeBatas).join(" ");
      }

      slides2 += showSlides2({ image, label, type });
    });
  }
  if (cuisinetypeFoods && cuisinetypeFoods.length > 0) {
    cuisinetypeFoods.forEach((m) => {
      let image = m.recipe.image;
      let label = m.recipe.label;
      let type = m.recipe.cuisineType;
      let kataBatas = 5;
      let labelArray = label.split(" ");
      if (labelArray.length > kataBatas) {
        label = labelArray.slice(0, kataBatas).join(" ");
      }
      let typeBatas = 2;
      if (type.length > typeBatas) {
        type = type.slice(0, typeBatas).join(" ");
      }

      slides3 += showSlides3({ image, label, type });
    });
  }
  if (healthtypeFoods && healthtypeFoods.length > 0) {
    healthtypeFoods.forEach((m) => {
      let image = m.recipe.image;
      let label = m.recipe.label;
      let type = m.recipe.healthLabels;
      let kataBatas = 5;
      let labelArray = label.split(" ");
      if (labelArray.length > kataBatas) {
        label = labelArray.slice(0, kataBatas).join(" ");
      }
      if (type.length > 2) {
        type = type.slice(0, 3).join(", ");
      }

      slides4 += showSlides4({ image, label, type });
    });
  }
  if (diettypeFoods && diettypeFoods.length > 0) {
    diettypeFoods.forEach((m) => {
      let image = m.recipe.image;
      let label = m.recipe.label;
      let type = m.recipe.dietLabels;
      let kataBatas = 5;
      let labelArray = label.split(" ");
      if (labelArray.length > kataBatas) {
        label = labelArray.slice(0, kataBatas).join(" ");
      }
      if (type.length > 2) {
        type = type.slice(0, 3).join(", ");
      }

      slides5 += showSlides5({ image, label, type });
    });
  }
  let slideContainer = document.querySelector(".slider-container");
  let slideContainer2 = document.querySelector(".slider-container2");
  let slideContainer3 = document.querySelector(".slider-container3");
  let slideContainer4 = document.querySelector(".slider-container4");
  let slideContainer5 = document.querySelector(".slider-container5");

  slideContainer.innerHTML = slides;
  slideContainer2.innerHTML = slides2;
  slideContainer3.innerHTML = slides3;
  slideContainer4.innerHTML = slides4;
  slideContainer5.innerHTML = slides5;
}

processData();
function showSlides({ image, label, type }) {
  return `<div class="slide">
    <img src="${image}" loading="lazy">
    <h4><a href="#"> ${label} </a></h4>
    <p>${type}</p>
  </div>`;
}

function showSlides2({ image, label, type }) {
  return `<div class="slide2">
    <img src="${image}" loading="lazy">
    <h4><a href="#">${label} </a></h4>
    <p>${type}</p>
  </div>`;
}

function showSlides3({ image, label, type }) {
  return `<div class="slide3">
    <img src="${image}" loading="lazy">
    <h4><a href="#">${label}</a></h4>
    <p>${type}</p>
  </div>`;
}
function showSlides4({ image, label, type }) {
  return `<div class="slide4">
    <img src="${image}" loading="lazy">
    <h4><a href="#">${label}</a></h4>
  <p>${type}</p>
  </div>`;
}
function showSlides5({ image, label, type }) {
  return `<div class="slide5">
    <img src="${image}" loading="lazy">
    <h4><a href="#"> ${label} </a></h4>
<p>${type}</p>
  </div>`;
}

//Pagination
// let paginationNext = document.querySelector(".pagination-button-next");
// let nextPage = "";
//
// paginationNext.addEventListener("click", function() {
//   fetchRecipeData();
// });
//
// function fetchRecipeData() {
//   const apiKey = "afef254282056eb258798674f41e04d2";
//   const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=${apiKey}&q=${inputKeyword.value}`;
//
//   const urlToFetch = nextPage ? nextPage : apiUrl;
//
//   fetch(urlToFetch)
//     .then((response) => response.json())
//     .then((data) => {
//       let foodSearch = data.hits;
//
//       nextPage =
//         data._links.next && data._links.next.href ? data._links.next.href : "";
//       console.log(nextPage);
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }
