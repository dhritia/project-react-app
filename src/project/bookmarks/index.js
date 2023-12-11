import * as client from "../client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar";
import './index.css';
function Bookmarks() {
  const [account, setAccount] = useState(null);
  const [bookmarks, setBookmarks] = useState(null);
  const navigate = useNavigate();
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
    const bookmarks = await client.bookmarks(account.username);
    setBookmarks(bookmarks);
  };
  const back = () => {
    navigate(`/project/home`);
  }
  useEffect(() => {
    fetchAccount();
  }, []);
  return(
    <div>
      <Navbar/>
      <button className="btn btn-secondary" onClick={back}>Back</button>
      <div className="bmark-field">
      {bookmarks?.length !==0 && (
        <div>
          <h3 className="m-2">Bookmarks</h3>
          {bookmarks?.map(b => (
            <Link to={`/project/recipe/${b.recipe}`} className="b-text">
              <ul className="list-group">
                <li className="list-group-item b-text m-2">{b.title}</li>
              </ul>
            </Link>
          ))}
        </div>
      )}
      {bookmarks?.length === 0 && account && (
        <h2>No bookmarks</h2>
      )}
      {bookmarks?.length === 0 && !account && (
        <h3>To view bookmarks, please <Link to={`/project/login`} className="b-text">log in</Link></h3>
      )}
      </div>
    </div>
  );
};
export default Bookmarks;
