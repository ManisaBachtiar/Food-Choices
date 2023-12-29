function updateScrollbarVisibility() {
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (screenWidth <= 600) {
      document.querySelectorAll('.slider-container, .slider-container2, .slider-container3, .slider-container4, .slider-container5').forEach(function(element) {
          element.classList.add('desktop-scrollbar');
      });
  } else {
      document.querySelectorAll('.slider-container, .slider-container2, .slider-container3, .slider-container4, .slider-container5').forEach(function(element) {
          element.classList.remove('desktop-scrollbar');
      });
  }
}
window.addEventListener('load', updateScrollbarVisibility);
window.addEventListener('resize', updateScrollbarVisibility);

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
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&dishType=Biscuits%20and%20cookies&dishType=Bread&dishType=Cereals&random=true";
  let mealtypeURL =
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&dishType=Main%20course&random=true";
  let cuisinetypeURL =
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&dishType=Starter&random=true";
  let healthtypeURL =
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&dishType=Condiments%20and%20sauces&random=true";
  let diettypeURL =
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&dishType=Preserve&random=true";
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
        let loadElements = document.getElementsByClassName("loader");
        Array.from(loadElements).forEach((element) => {
          element.style.display = "none";
        });
        document.querySelectorAll(".labelLink1").forEach((link, index) => {
          link.addEventListener("click", function (event) {
            event.preventDefault();
            handleCardClick(dishtypeFoods[index].recipe);
          });
        });
        document.querySelectorAll(".labelLink2").forEach((link, index) => {
          link.addEventListener("click", function (event) {
            event.preventDefault();
            handleCardClick(mealtypeFoods[index].recipe);
          });
        });
        document.querySelectorAll(".labelLink3").forEach((link, index) => {
          link.addEventListener("click", function (event) {
            event.preventDefault();
            handleCardClick(cuisinetypeFoods[index].recipe);
          });
        });
        document.querySelectorAll(".labelLink4").forEach((link, index) => {
          link.addEventListener("click", function (event) {
            event.preventDefault();
            handleCardClick(healthtypeFoods[index].recipe);
          });
        });
        document.querySelectorAll(".labelLink5").forEach((link, index) => {
          link.addEventListener("click", function (event) {
            event.preventDefault();
            handleCardClick(diettypeFoods[index].recipe);
          });
        });
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

      slides2 += showSlides2({ image, label, type });
    });
  }
  if (cuisinetypeFoods && cuisinetypeFoods.length > 0) {
    cuisinetypeFoods.forEach((m) => {
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

      slides3 += showSlides3({ image, label, type });
    });
  }
  if (healthtypeFoods && healthtypeFoods.length > 0) {
    healthtypeFoods.forEach((m) => {
      let image = m.recipe.image;
      let label = m.recipe.label;
      let type = m.recipe.dishType;
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
      let type = m.recipe.dishType;
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

    <h4><a href="" class="labelLink1">${label}</a></h4>
    <p>${type}</p>
  </div>`;
}

function showSlides2({ image, label, type }) {
  return `<div class="slide2">
    <img src="${image}" loading="lazy">

    <h4><a href="" class="labelLink2">${label}</a></h4>
    <p>${type}</p>
  </div>`;
}

function showSlides3({ image, label, type }) {
  return `<div class="slide3">
    <img src="${image}" loading="lazy">

    <h4><a href="" class="labelLink3">${label}</a></h4>
    <p>${type}</p>
  </div>`;
}
function showSlides4({ image, label, type }) {
  return `<div class="slide4">
    <img src="${image}" loading="lazy">
    <h4><a href="" class="labelLink4">${label}</a></h4>
  <p>${type}</p>
  </div>`;
}
function showSlides5({ image, label, type }) {
  return `<div class="slide5">
    <img src="${image}" loading="lazy">

    <h4><a href="" class="labelLink5">${label}</a></h4>
  <p>${type}</p>
  </div>`;
}

function handleCardClick(recipe) {
  localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
  window.location.href = "index3.html";
}
let seeMeal = document.querySelectorAll(".menu");
console.log(seeMeal);
seeMeal.forEach((meal, index1) => {
  meal.addEventListener("click", () => {
    window.location.href = `index2.html?index1=${index1}`;
  });
});

let seeDish = document.querySelectorAll(".fa-angle-right");
seeDish.forEach((dish, index) => {
  dish.addEventListener("click", () => {
    window.location.href = `index2.html?index=${index}`;
  });
});