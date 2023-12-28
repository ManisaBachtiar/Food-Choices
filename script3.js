document.addEventListener("DOMContentLoaded", function () {
  const selectedRecipe = JSON.parse(localStorage.getItem("selectedRecipe"));

  if (selectedRecipe) {
    displayRecipeDetails(selectedRecipe);
  } else {
    console.error("No selected recipe found.");
  }

  function displayRecipeDetails(recipe) {
    const recipeDetailsContainer = document.getElementById(
      "recipeDetailsContainer",
    );

    recipeDetailsContainer.innerHTML = showRecipeDetails(recipe);
  }
});
function showRecipeDetails(recipe) {
  return `<div class="container">
    <div class="section">
      <img src="${recipe.image}" />
      <div class="title-link">
        <div class="title">${recipe.label}</div>
        <a href="${recipe.url}" class="link">See Detail Recipe</a>
      </div>
    </div>
  </div>
  <div class="container2">
  <div class="detail2">
  <div class="row">
    <div class="column">
      <h4>Dish Type :</h4>
      <p>${recipe.dishType}</p>
    </div>
    <div class="column">
      <h4>Meal Type :</h4>
      <p>${recipe.mealType}</p>
    </div>
  </div>
  <div class="row">
    <div class="column">
      <h4>Cuisine Type :</h4>
      <p>${recipe.cuisineType}</p>
    </div>
    <div class="column">
      <h4>Diet Type :</h4>
      <p>${recipe.dietLabels}</p>
    </div>
  </div>
</div>
  <div class="detail3">
  <h4>Ingredients :</h4>
    <p>${recipe.ingredientLines}</p>
    <h4>Health Type :</h4>
    <p>${recipe.healthLabels}</p>
    
  </div>
  </div>`;
}
