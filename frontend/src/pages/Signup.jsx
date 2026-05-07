import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import api from "../api/axios";

import "../styles/signup.css";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    systemRole: "MEMBER",
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

      await api.post(
        "/api/auth/signup",
        formData
      );

      alert(
        "Signup successful. Please login."
      );

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data ||
        "Signup failed"
      );
    }
  };

  return (

    <div className="signup-container">

      <div className="signup-card">

        <div className="signup-header">

          <h1 className="signup-title">
            Create Account
          </h1>

          <p className="signup-subtitle">
            Start managing projects and
            collaborating with your team
          </p>

        </div>

        <form
          className="signup-form"
          onSubmit={handleSubmit}
        >

          <div className="input-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />

          </div>

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
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>
              Role
            </label>

            <select
              name="systemRole"
              value={formData.systemRole}
              onChange={handleChange}
            >

              <option value="MEMBER">
                Member
              </option>

              <option value="ADMIN">
                Admin
              </option>

            </select>

          </div>

          <button
            type="submit"
            className="signup-btn"
          >
            Create Account
          </button>

        </form>

        <div className="login-redirect">

          <p>
            Already have an account?
          </p>

          <Link
            to="/login"
            className="login-link"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Signup;