import Navbar from "../navbar";
import * as client from '../client';
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {Modal} from "react-bootstrap";
import './index.css';
function Profile() {
  const [account, setAccount] = useState(null);
  const [newaccount, newsetAccount] = useState(null);
  const [follow, setFollow] = useState({username1:"", username2:""});
  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);
  const [comments, setComments] = useState(null);
  const [showModal, setShow] = useState(false);
  const [showModalF, setShowF] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseF = () => setShowF(false);
  const handleShowF = () => setShowF(true);
  const { username } = useParams();
  const navigate = useNavigate();
  const findUserByUsername = async (username) => {
    const newaccount = await client.getAccount(username);
    newsetAccount(newaccount);
    const response = await client.findComments(newaccount.username);
    console.log(response);
    setComments(response);
  };
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
    if (username !== "") {
      const follow = await client.findFollower(account.username+username);
      if (follow?.length !== 0) {
        setFollow(follow);
      }
    }
    console.log(account);
    const response = await client.findComments(account.username);
      console.log(response);
      setComments(response);
  };
  const signout = async () => {
    await client.signout();
    navigate("/project/home");
  };
  const followUser = async () => {
    const response = await client.addFollower({followID: (account.username+newaccount.username), 
      name:(account.firstname + " " + account.lastname), username1: account.username, 
      name2:(newaccount.firstname + " " + newaccount.lastname), username2: newaccount.username});
    const follow = await client.findFollower(account.username+username);
    console.log(follow);
    setFollow(follow);
  };
  const findFollowers = async () => {
    console.log(newaccount !== null);
    if (newaccount) {
      const response = await client.findFollowers(newaccount.username);
      console.log(response);
      setFollowers(response);
    }
    else {
      const response = await client.findFollowers(account.username);
      console.log(response);
      setFollowers(response);
    }
    handleShow();
  };
  const findFollowing = async () => {
    console.log(newaccount !== null);
    if (newaccount) {
      const response = await client.findFollowing(newaccount.username);
      console.log(response);
      setFollowing(response);
    }
    else {
      const response = await client.findFollowing(account.username);
      console.log(response);
      setFollowing(response);
    }
    handleShowF();
  };
  const unfollow = async () => {
    const response = await client.deleteFollower(account.username+username);
    setFollow({username1:"", username2:""});
  };
  const edit = () => {
    navigate(`/project/editProfile`);
  };
  const allUsers = () => {
    navigate(`/project/allUsers`);
  };
  useEffect(() => {
    fetchAccount();
    if (username) {
      findUserByUsername(username);
    }
  }, []);
  return (
    <div>
      <Navbar/>
      <div className="profile-field">
      { newaccount && (
      <div>
        <h1 className="align" style={{display: "inline-block",}}>{newaccount.firstname} {newaccount.lastname}</h1>
        <h2 style={{display: "inline-block", color: "gray"}}>({newaccount.role})</h2>
        {account !== null && follow?.username2 !== "" && (
          <button className="btn btn-danger float-end" onClick={unfollow}>Unfollow</button>
        )}
        {account !== null && follow?.username2 === "" && (
          <button className="btn btn-primary float-end" onClick={followUser}>Follow</button>
        )}
        <div>
          <button className="btn btn-secondary" onClick={findFollowers} style={{display: "inline-block",}}>Followers</button>
        <button className="btn btn-secondary" onClick={findFollowing}>Following</button></div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Followers ({followers?.length})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
            <ul className="list-group list-group-flush">
            {followers?.map(f => (
              <Link to={`/project/profile/${f?.username1}`}>
                <li className="list-group-item">
                  {f?.username1}
                </li>
              </Link>
            ))}
            </ul>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={showModalF} onHide={handleCloseF}>
          <Modal.Header closeButton>
            <Modal.Title>Following ({following?.length})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
            <ul className="list-group list-group-flush">
            {following?.map(f => (
              <Link to={`/project/profile/${f.username2}`}>
                <li className="list-group-item">
                  {f.username2}
                </li>
              </Link>
            ))}
            </ul>
            </div>
          </Modal.Body>
        </Modal>
        {newaccount.role === "User" && (
          <h3>Favourite Cuisine: {newaccount.favCuisine}</h3>
        )}
        {newaccount.role === "Chef" && (
          <h3>Workplace: {newaccount.workplace}</h3>
        )}
        <div>
          <h3>Reviews</h3>
          <ul>
        {comments?.map(c => (
          <Link className="b-text" to={`/project/recipe/${c.recipeID}`}>
            <li>
              <h4>{c.title}</h4>
              <h5>{c.comment}</h5>
              </li>
              </Link>
            ))}
            </ul>
          </div>
          </div>
        )}
        { account && !newaccount && (
      <div>
        <h1 className="align" style={{display: "inline-block",}}>{account.firstname} {account.lastname}</h1>
        <h2 style={{display: "inline-block", color: "gray"}}> ({account.role})</h2>
        <button style={{display: "inline-block",}} className="btn btn-secondary float-end" onClick={edit}>Edit Profile</button>
        <div>
        <button className="btn btn-secondary" onClick={findFollowers}>Followers</button>
        <button className="btn btn-secondary" onClick={findFollowing} style={{display: "inline-block",}}>Following</button></div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Followers ({followers?.length})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <ul className="list-group">
            {followers?.map(f => (
              <Link to={`/project/profile/${f.username1}`}>
                <li className="list-group-item">
                  {f.username1}
                </li>
              </Link>
            ))}
            </ul>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={showModalF} onHide={handleCloseF}>
          <Modal.Header closeButton>
            <Modal.Title>Following ({following?.length})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
            <ul className="list-group">
            {following?.map(f => (
              <Link to={`/project/profile/${f.username}`}>
                <li className="list-group-item">
                  {f.username2}
                </li>
              </Link>
            ))}
            </ul>
            </div>
          </Modal.Body>
        </Modal>
        {account.role === "User" && (
          <h3>Favourite Cuisine: {account.favCuisine}</h3>
        )}
        {account.role === "Chef" && (
          <h3>Workplace: {account.workplace}</h3>
        )}
        {account.role === "Moderator" && (
          <div  style={{align: "center",}}>
          <h5 style={{display: "inline-block",}}>Access Key: {account.accessKey}</h5>
          <button className="btn btn-primary" onClick={allUsers}>Get All Users</button>
          </div>
        )}
        <div>
          <h3>Reviews</h3>
          <ul>
        {comments?.map(c => (
          <Link className="b-text" to={`/project/recipe/${c.recipeID}`}>
            <li>
              <h4>{c.title}</h4>
              <h5>{c.comment}</h5>
              </li>
              </Link>
            ))}
            </ul>
          </div>
      </div>
      )}
      {comments?.length === 0 && (
        <div>
          <h2>No reviews yet</h2>
        </div>
      )}
    </div>
    </div>
  );
}
export default Profile;
