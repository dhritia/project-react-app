import "./index.css";
import * as client from "../client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../newNav";
function Login() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signin = async () => {
    const res = await client.signin(credentials);
    if (res !== null) {
      navigate("/project/");
    }
    else {
      setError("Invalid Credentials. Please try again.");
    }
  };
  return (
    <div>
      <Navbar/>
    <div className="input-field">
      <h2 className="input-items">Login to your account</h2>
      {error && <h6 className="error-message">{error}</h6>}
      <input className="form-control input-items" placeholder="Username" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
      <input className="form-control input-items" placeholder="Password" type="password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
      <button className="btn btn-primary w-100" onClick={signin}>Login</button>
      <h6 className="input-items">Do not have an account?
        <Link to ={`../signup`} className="b-text"> Sign up</Link>
      </h6>
    </div>
    </div>
  );
}
export default Login;