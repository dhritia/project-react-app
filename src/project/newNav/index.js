import { Link } from "react-router-dom";
import "./index.css";
import logo from "../../Images/spoon.PNG";
function Navbar() {
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
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;