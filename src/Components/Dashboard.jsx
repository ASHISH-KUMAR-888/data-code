import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const nav = useNavigate();

  const loc = useLocation();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [token, setToken] = useState("");
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users?page=${page}`)
      .then((res) => {
        setData(res.data.data);

        if (loc.state) setMessage(loc.state);
      })
      .catch((err) => console.log(err));

    const info = localStorage.getItem("loggedin");

    if (info === "false")
      nav("/", {
        state: {
          type: "danger",
          text: "You are not LoggedIn, Please Login First!",
        },
      });

    const timer = setTimeout(() => {
      setToken(localStorage.getItem("token"));
      setShowDiv(true);
    }, 4000);
  }, [page]);

  const DELETE = (id) => {
    axios
      .delete(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        console.log(res);
        setMessage({ type: "success", text: "User deleted successfully!" });
      })
      .catch((err) => {
        console.log(err);
        setMessage({ type: "danger", text: "Failed to delete user!" });
      });
  };

  const logout = () => {
    localStorage.setItem("loggedin", false);
    localStorage.removeItem("token");
    nav("/");
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((item) =>
    item.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="kk">
        <button className="update zop" onClick={logout}>
          Log Out
        </button>
      </div>

      <div>
        <input
          className="search-OPtion"
          type="text"
          placeholder="Search by First Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {message.text && (
        <div
          className={`alert alert-${message.type} alert-dismissible fade show mt-4`}
          role="alert"
        >
          {message.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage({ type: "", text: "" })}
          ></button>
        </div>
      )}

      {showDiv && (
        <h2 className="mb-3 text-white text-center mb-4">Token : {token}</h2>
      )}

      <div className="table-responsive mt-4">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <img
                      className="imu"
                      src={user.avatar}
                      alt={user.first_name}
                    />
                  </td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link to={`/update/${user.id}`}>
                      <button className="update">Edit</button>
                    </Link>
                  </td>
                  <td>
                    <button className="delete" onClick={() => DELETE(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="hard-fonT">
                  No Result Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${page === index + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
