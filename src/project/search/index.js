import { useParams } from "react-router";
import * as client from "../../client";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
import './index.css';
import { useState, useEffect } from "react";
function Search() {
  const {searchTerm} = useParams();
  const [recipes, setRecipes] = useState([]);
  const fetchRecipes = async () => {
    const recipes = await client.findRecipes(searchTerm, 25);
    setRecipes(recipes.results);
  };
  useEffect(() => {
    fetchRecipes();
  }, []);
  return (
    <div>
      <Navbar/>
      <div className="search-results">
        <h3>Results for {searchTerm}</h3>
        <div className="d-flex flex-row flex-wrap">
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={`/project/recipe/${recipe.id}`} className="tex">
            <div className="p-2">
                <div className="card wd-card">
                    <img src={recipe.image} class="card-img-top wd-img" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">{recipe.title}</h5>
                    </div>
                </div>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}
export default Search;