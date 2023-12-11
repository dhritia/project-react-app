import Navbar from "../navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import './index.css';
import * as client from "../../client";
import * as localclient from '../client';
function Recipe() {
  const { recipeId } = useParams();
  const [account, setAccount] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState();
  const [recipe, setRecipe] = useState({});
  const [nutrition, setNutrition] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [bookmark, setBookmark] = useState({username: "", recipeID: 0, title: ""});
  const navigate = useNavigate();
  const fetchAccount = async () => {
    const account = await localclient.account();
    setAccount(account);
    if (account !== null) {
        const bookmark = await localclient.fetchBookmark(account.username+recipeId);
        setBookmark(bookmark);
    }
  };
  const fetchComments = async () => {
    const comments = await localclient.comments(recipeId);
    setComments(comments);
    if (account !== null) {
        setComment("");
    }
  };
  const addComment = async () => {
    if (account.role !== "Chef) {
    const response = await localclient.addComment({username: account.username, recipeID: recipeId, comment: comment, commentID: (account.username+recipeId), role: account.role, title: recipe.title});
  }
  else {
    const response = await localclient.addComment({username: account.username, recipeID: recipeId, comment: comment, commentID: (account.username+recipeId), role: account.role+" at "+account.workplace, title: recipe.title});
  }
    fetchComments();
  };
  const deleteComment = async (id) => {
    const response = await localclient.deleteComment(id);
    fetchComments();
  }
  const fetchRecipeDetails = async () => {
    const recipe = await client.findRecipesbyID(recipeId);
    setRecipe(recipe);
    setNutrition(recipe.nutrition);
    setIngredients(recipe.extendedIngredients);
    setSteps(recipe.analyzedInstructions[0].steps);
  };
  const bookmarkRecipe = async () => {
    const response = await localclient.addBookmark({username: account.username, recipeID: (account.username+recipeId), recipe: recipeId, title: recipe.title});
    setBookmark(response);
  };
  const deleteBookmark = async () => {
    const response = await localclient.deleteBookmark(account.username + recipeId);
    fetchAccount();
  };
  const updateRotd = async () => {
    const result = await localclient.fetchRotd();
    const response = await localclient.updateRotd({recipeID: recipeId, img: recipe.image, title: recipe.title}, result[0]._id);
  }
  useEffect(() => {
    fetchAccount();
    fetchRecipeDetails();
    fetchComments();
  }, []);
  return (
    <div>
      <Navbar/>
      <div className="row page d-flex flex-row flex-wrap">
        <div className="col-6">
          <h1>{recipe.title}</h1>
          <img src={recipe.image} width="500px" height="350px"/>
          <h3>
          {(bookmark.username !== "" || bookmark.username === undefined) && 
            <button className="btn btn-secondary m-2" onClick={deleteBookmark}>Remove from Bookmarks</button>
          }
          {account && bookmark.username ==="" &&
            <button className="btn btn-primary m-2" onClick={bookmarkRecipe}>Bookmark</button>
          }
          {account && account?.role === "Moderator" && (
            <button className="btn btn-primary m-2" onClick={updateRotd} style={{display: "inline-block",}}>Set as recipe of the day</button>
          )}
          </h3>
        </div>
        <div className="col-3 ">
          <h3>Ingredients</h3>
          <table>
          {ingredients.map(ingredient => (
            <tr>
              <td>{ingredient.name}</td>
              <td>{ingredient.measures.metric.amount}{ingredient.measures.metric.unitShort}</td>
            </tr>
          ))}
          </table>
        </div>
        <div className="col-3">
          <h3>Nutritional Information</h3>
          <h5>Per Serving</h5>
          <table>
            <thead>
              <th>Name</th>
              <th>Amount</th>
              <th>%DV</th>
            </thead>
          {nutrition.nutrients?.slice(0,9).map(nutrient =>(
            <tr>
              <td>{nutrient.name}</td>
              <td>{nutrient.amount}{nutrient.unit}</td>
              <td>{nutrient.percentOfDailyNeeds}</td>
            </tr>
          ))}
          </table>
        </div>
      </div>
      <div className="row page">
        <div className="col-6 m-2">
        <h2>By: {recipe.creditsText}</h2>
          <h3>Time for preparation: {recipe.readyInMinutes} minutes</h3>
          <h3>Servings: {recipe.servings}</h3>
            <h5>Instructions</h5>
            <ol>
            {steps.map(step => (
              <li className="steps">{step.step}</li>
            ))}
          </ol>
      </div>
      <div className="col-5 m-2">
      <h3>Reviews: </h3>
          <ul className="list-group list-group-flush">
            {account &&
            <li className="list-group-item">
            <input
                value={comment} className="form-control" placeholder="Add your review"
                onChange={(e) => setComment(e.target.value)} />
            <button onClick={addComment} className="btn btn-secondary">Add</button>
            </li>}
            {comments?.map(c => (
                <li className="list-group-item tex">
                    <Link to={`/project/profile/${c.username}`} className="tex">
                    <h4>{c.username} ({c.role})</h4> 
                    </Link>
                    <h5>{c.comment}</h5>
                    {(account.role === "Moderator" || account.username === c.username) && (
                        <button onClick={() => deleteComment(c.commentID)} className="btn btn-danger">Delete</button>
                    )}
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Recipe;
