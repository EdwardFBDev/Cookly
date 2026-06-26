const RECIPES_API_URL =
  "https://raw.githubusercontent.com/EdwardFBDev/Cookly/master/api/recipes/recipes.json";

export async function fetchRecipes() {
  const response = await fetch(RECIPES_API_URL);

  if (!response.ok) {
    throw new Error("Error loading recipes");
  }

  const data = await response.json();
  return data.recipes;
}