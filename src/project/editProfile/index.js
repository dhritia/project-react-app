import Navbar from "../navbar";
import './index.css';
import * as client from '../client';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
function EditProfile() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
    console.log(account);
  };
  const update = async () => {
    client.updateUser(account);
    navigate(`/project/profile`);
  }
  const cancel = async () => {
    navigate(`/project/profile`);
  }
  useEffect(() => {
    fetchAccount();
  }, []);
  return (
    <div>
      <Navbar/>
      {account && (
        <div className="input-field">
        <h1 className="input-items">Edit Profile</h1>
        <input className="form-control input-items" placeholder="Password" type="password" value={account.password} onChange={(e) => setAccount({...account, password: e.target.value})}/>
        <input className="form-control input-items" placeholder="First Name" value={account.firstname} onChange={(e) => setAccount({...account, firstname: e.target.value})}/>
        <input className="form-control input-items" placeholder="Last Name" value={account.lastname} onChange={(e) => setAccount({...account, lastname: e.target.value})}/>
        <input className="form-control input-items" placeholder="Email" value={account.email} onChange={(e) => setAccount({...account, email: e.target.value})}/>
        {account.role === "User" && (
          <input className="form-control input-items" placeholder="Favourite Cuisine" value={account.favCuisine} onChange={(e) => setAccount({...account, favCuisine: e.target.value})}/>
        )}
        {account.role === "Chef" && (
          <input className="form-control input-items" placeholder="Workplace" value={account.workplace} onChange={(e) => setAccount({...account, workplace: e.target.value})}/>
        )}
        <button className="btn btn-primary w-100" onClick={update}>Update</button>
        <button className="btn btn-secondary w-100" onClick={cancel}>Cancel</button>
        </div>
      )}
      </div>
  );
}
export default EditProfile;