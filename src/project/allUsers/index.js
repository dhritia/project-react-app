import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as client from '../client';
import { BsTrash3Fill  } from "react-icons/bs";
import Navbar from "../newNav";
import './index.css';
function AllUsers() {
  const [key, setKey] = useState("");
  const [account, setAccount] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const navigate = useNavigate();
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const check = async () => {
    if (account.accessKey === key) {
      const accounts = await client.accounts();
      setAccounts(accounts);
    }
  };
  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setAccounts(accounts.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };
  const back = () => {
    navigate(`/project/profile`);
  }
  useEffect(() => {
    fetchAccount();
  }, []);
  return (
    <div className="table-list">
      <Navbar/>
      <button className="btn btn-secondary" onClick={back}>Back</button>
    <div className="p-2 table-list">
      {!accounts && (
        <div className="access-key">
        <h3 className="m-2">Enter access key</h3>
        <input className="form-control input-items" placeholder="Access Key" value={key} onChange={(e) => setKey(e.target.value)}/>
        <button className="btn btn-primary w-100" onClick={check}>Go</button>
        </div>
      )}
      <div>
      {accounts && (
        <div>
        <table className="table table-hover table-bordered table-striped m-2">
          <thead>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>e-mail</th>
            <th>Role</th>
            <th></th>
          </thead>
        {accounts?.map (a => (
          <tr>
            <td>{a.username}</td>
            <td>{a.firstname}</td>
            <td>{a.lastname}</td>
            <td>{a.email}</td>
            <td>{a.role}</td>
            <td>
              <button className="btn btn-danger me-2" onClick={() => deleteUser(a)}>
                <BsTrash3Fill />
              </button>
            </td>
          </tr>
        ))}
        </table>
        </div>
      )}
      </div>
    </div>
    </div>
  );
}
export default AllUsers;