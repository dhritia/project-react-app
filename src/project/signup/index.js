import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "../client";
import Navbar from "../newNav";
import "./index.css";
function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "", password: "", firstname: "", lastname: "", email: "", 
  workplace: "", favCuisine: "", accessKey: "ndhfiuverwhfq38439y4", role: "User"});
  const navigate = useNavigate();
  const signup = async () => {
    try {
      if (credentials.username === "" || credentials.password === "") {
        setError("Username and password fields cannot be empty");
      }
      else {
        await client.signup(credentials);
        navigate("/project/home");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <Navbar/>
      <div className="input-field">
      <h1>Signup</h1>
      {error && <div className="error-message">{error}</div>}
      <input
        value={credentials.username} className="form-control m-2" placeholder="Username"
        onChange={(e) => setCredentials({
          ...credentials,
          username: e.target.value })} />
      <input
        value={credentials.password} className="form-control m-2" placeholder="Password"
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value })} />
      <input
        value={credentials.email} className="form-control m-2" placeholder="email"
        onChange={(e) => setCredentials({
          ...credentials,
          email: e.target.value })} />
      <div className="row m-2">
      <input
        value={credentials.firstname} className="form-control block1" placeholder="First Name"
        onChange={(e) => setCredentials({
          ...credentials,
          firstname: e.target.value })} />
      <input
        value={credentials.lastname} className="form-control block2" placeholder="Last Name"
        onChange={(e) => setCredentials({
          ...credentials,
          lastname: e.target.value })} />
      </div>
      <select className="form-select m-2" onChange={(e) => setCredentials({
          ...credentials,
          role: e.target.value })}>
        <option value="User">User</option>
        <option value="Chef">Chef</option>
        <option value="Moderator">Moderator</option>
      </select>
      {credentials.role === "User" && (
        <input
        value={credentials.favCuisine} className="form-control m-2" placeholder="Favourite Cuisine"
        onChange={(e) => setCredentials({
          ...credentials,
          favCuisine: e.target.value })} />)
      }
      {credentials.role === "Chef" && (
        <input
        value={credentials.workplace} className="form-control m-2" placeholder="Workplace"
        onChange={(e) => setCredentials({
          ...credentials,
          workplace: e.target.value })} /> )
      }
      <button onClick={signup}  className="btn btn-primary m-2 w-100">
        Signup
      </button>
      <Link to={`/project/home`}>
        <button className="btn btn-secondary m-2 w-100">Cancel</button>
      </Link>
      </div>
    </div>
  );
}
export default Signup;