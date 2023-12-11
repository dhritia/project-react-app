import { Link, useNavigate } from "react-router-dom";
import * as client from "../client";
import "./index.css";
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from "react";
import logo from "../../Images/spoon.PNG";
function Navbar() {
  const [account, setAccount] = useState(null);
  const [search, setSearch] = useState("");
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const searchRecipe = () => {
    navigate(`/project/search/${search}`);
  };
  const navigate = useNavigate();
  const profile = () => {
    navigate("/project/profile");
  };
  const signout = async () => {
    await client.signout();
    navigate("/project");
  };
  useEffect(() => {
    fetchAccount();
  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light nav-css">
        <ul className="navbar-nav mr-auto w-100">
          <li className="navbar-brand mb-0 h1 m-4">
            <img src={logo} className="logo"/>
            Spoonful
          </li>
          <li className="nav-item active m-4">
          <Link to={`../home`} className="nav-link">
            Home
          </Link>
          </li>
          <li className="w-50">
            <input className="form-control mr-sm-4 m-4" type="search" placeholder="Search for recipes" aria-label="Search"
             value={search} onChange={(e) => setSearch(e.target.value)} />
          </li>
          <li className="m-4">
            <button className="btn btn-light my-2 my-sm-0 m-4" type="submit" onClick={searchRecipe}>Search</button>
          </li>
          <li className="nav-item m-4">
            <Link to={`/project/bookmarks`}>
            <a className="nav-link">Bookmarks</a>
            </Link>
          </li>
          {account && (
          <li className="nav-item dropdown">
            <Dropdown className="m-0">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{"background-color": "rgb(147, 100, 147)"}}>
              Hi, {account.firstname}!
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={profile} style={{color: "black"}}>Profile</Dropdown.Item>
                <Dropdown.Item onClick={signout} style={{color: "black"}}>Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          )}
          {!account &&(
            <li className="nav-item m-4">
              <Link to={`../../project/login`} className="nav-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
