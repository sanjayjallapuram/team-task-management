import { useContext, useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import api from "../api/axios";

import { AuthContext }
  from "../context/AuthContext";

import "../styles/login.css";

function Login() {

  const { login } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await api.post(
          "/api/auth/login",
          formData
        );

      login(response.data);

      navigate("/projects");

    } catch (error) {

      alert("Login failed");
    }
  };

  return (

    <div className="login-container">

      <div className="login-card">

        <div className="login-header">

          <h1 className="login-title">
            Welcome Back
          </h1>

          <p className="login-subtitle">
            Login to continue managing
            your projects and tasks
          </p>

        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <div className="input-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <div className="signup-redirect">

          <p>
            Don’t have an account?
          </p>

          <Link
            to="/signup"
            className="signup-link"
          >
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;