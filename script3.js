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
  <div class="detail2">
    <h4>Ingredients :</h4>
    <p>${recipe.ingredientLines}</p>
  </div>
  <div class="detail3">
    <h4>Dish Type :</h4>
    <p>${recipe.dishType}</p>
    <h4>Meal Type :</h4>
    <p>${recipe.mealType}</p>
      <h4>Cuisine Type :</h4>
    <p>${recipe.cuisineType}</p>
    <h4>Diet Type :</h4>
    <p>${recipe.dietLabels}</p>
    <h4>Health Type :</h4>
    <p>${recipe.healthLabels}</p>
  </div>`;
}
