import Home from "./Home";
import Login from "./login";
import Search from "./search";
import {Routes, Route, Navigate} from "react-router";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Recipe from "./recipe";
import Profile from "./profile";
import Signup from "./signup";
import EditProfile from "./editProfile";
import AllUsers from "./allUsers";
import Bookmarks from "./bookmarks";
function Project() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path="search/:searchTerm" element={<Search/>} />
          <Route path="recipe/:recipeId" element={<Recipe/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="profile/:username" element={<Profile/>}/>
          <Route path="editProfile" element={<EditProfile/>}/>
          <Route path="allUsers" element={<AllUsers/>}/>
          <Route path="bookmarks" element={<Bookmarks/>}/>
        </Routes>
      </div>
    </div>
  );
}
export default Project;