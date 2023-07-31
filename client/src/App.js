import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/v1/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://sonimonish00.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Welcome to Monish CRUD-X Webapp...Coming Soon !!
        </a>
        <div>
          <h1>Users List from MongoDB Atlas</h1>
          <ul className="no-bullets left-align">
            {users.map((user) => (
              <li key={user.id}>
                <strong>{user.first_name}</strong> - {user.email_id}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

/*
const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/v1/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <h1>Users List from MongoDB Atlas</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.first_name}</strong> - {user.email_id}
          </li>
        ))}
      </ul>
    </div>
  );
};
*/
export default App;
