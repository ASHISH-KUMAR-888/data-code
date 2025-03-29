import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Share.css";

const Update = () => {
  const { id } = useParams();

  const nav = useNavigate();

  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://reqres.in/api/users/${id}`, formData)
      .then((r) => console.log(r))
      .catch((err) => console.log(err));

    // nav("/", {type: "success", text: "Data Has Been Updated Successfully"})
    nav("/dashboard", {
      state: { type: "success", text: "Data Has Been Updated Successfully" },
    });
  };

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((res) =>
        setFormData({
          ...formData,
          first_name: res.data.data.first_name,
          last_name: res.data.data.last_name,
          email: res.data.data.email,
        })
      )
      .catch((err) => console.log(err));

    const b = localStorage.getItem("loggedin");

    if (b === "false") {
      setMessage({
        type: "danger",
        text: "You are not LoggedIn, Please Login First!",
      });

      nav("/", {
        state: {
          type: "danger",
          text: "You are not LoggedIn, Please Login First!",
        },
      });
    }
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Update</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-4">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
