import Navbar from "../navbar";
import * as client from "../../client";
import * as localclient from '../client';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './index.css';
function Home() {
  const [account, setAccount] = useState(null);
  const [message, setMessage] = useState("");
  const [rotd, setRotd] = useState({});
  const [recipes, setRecipes] = useState(null);
  const [crism, setCrism] = useState(null);
  const fetchAccount = async () => {
    const rotd = await localclient.fetchRotd();
    setRotd(rotd[0]);
    const crism = await client.findRecipes("Christmas", 5);
    setCrism(crism);
    const account = await localclient.account();
    setAccount(account);
    if (account?.role === "User") {
      const recipes = await client.findRecipes(account.favCuisine, 3);
      setRecipes(recipes);
      setMessage(`Top ${account.favCuisine} recipes`);
    }
    else if (account?.role === "Chef") {
      const recipes = await client.findRecipes("Professional", 3);
      setRecipes(recipes);
      setMessage(`Top dishes to try for professionals`);
    }
    else {
      const recipes = await client.findRecipes("Must Try", 3);
      console.log(recipes);
      setRecipes(recipes);
      setMessage(`Must try dishes`);
    }
  };
  useEffect(() => {
    fetchAccount();
    console.log(rotd.recipeID);
    console.log(recipes);
  }, []);
  return (
    <div>
      <Navbar/>
      <div className="row page">
        <div className="col-8">
          <h2>Recipe of the day</h2>
          {rotd && (
            <Link to={`/project/recipe/${rotd.recipeID}`} className="tex">
              <h3>{rotd.title}</h3>
              <img src={rotd.img}  width="500px" height="350px" />
            </Link>
          )}
        </div>
        <div className="col-4">
          <h4 className="m-2">{message}</h4>
          {recipes?.map(recipe => (
            <ul className="list-group list-group-flush w-100 m-2">
            <Link key={recipe.id} to={`/project/recipe/${recipe.id}`} className="tex">
                <li className="list-group-item w-100 m-2">
                  <div className="w-100">
                    <img src={recipe.image} class="wd-image" alt="..."/>
                    <h5 class="m-2" style={{display: "inline-block",}}>{recipe.title}</h5>
                  </div>
                </li>
            </Link>
            </ul>
          ))}
        </div>
      </div>
      <div className="row page">
        <div className="col-12">
          <h4>Recipes to try this holiday season</h4>
          {crism?.map(recipe => (
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
export default Home;