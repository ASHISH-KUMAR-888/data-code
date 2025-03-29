import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Share.css";

const Login = () => {
  const nav = useNavigate();

  const { mess } = useParams();

  const loc = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (loc.state) setMessage(loc.state);

    if (localStorage.getItem("loggedin") === "true") nav("/dashboard");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "eve.holt@reqres.in" && password === "cityslicka") {
      axios
        .post(`https://reqres.in/api/login`, { email, password })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
        })
        .catch((err) => console.log(err));

      localStorage.setItem("loggedin", true);

      nav("/dashboard");
    } else {
      alert("Wrong Crediantials....");
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 hullo">
        {message.text && (
          <div
            className={`alert alert-${message.type} alert-dismissible fade show`}
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

        <div className="container d-flex justify-content-center align-items-center">
          <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
