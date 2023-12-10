import axios from "axios";
export const RECIPE_API = "https://api.spoonacular.com";
export const API_KEY = process.env.REACT_APP_API_KEY;
export const findRecipes = async (searchTerm, num) => {
    const response = await axios.get(
      `${RECIPE_API}/recipes/complexSearch?apiKey=${API_KEY}&query=${searchTerm}&number=${num}`
    );
    return response.data.results;
};
export const findRecipesbyID = async (id) => {
    const response = await axios.get(
        `${RECIPE_API}/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
    );
    return response.data;
};