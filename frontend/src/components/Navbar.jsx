import {
  Link,
  useNavigate
} from "react-router-dom";

import "../styles/navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const name =
    localStorage.getItem("name");

  const role =
    localStorage.getItem("role");

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("name");

    navigate("/login");
  };

  return (

    <nav className="navbar">

      {/* LEFT */}
      <div className="navbar-left">

        <h2 className="logo">
            Team_Task-Manager
        </h2>

        <Link
          to="/projects"
          className="nav-link"
        >
          Projects
        </Link>

        <Link
          to="/dashboard"
          className="nav-link"
        >
          Dashboard
        </Link>

      </div>

      {/* RIGHT */}
      <div className="navbar-right">

        <div className="user-section">

          <div className="user-avatar">
            {name?.charAt(0)}
          </div>

          <div className="user-info">

            <span className="user-name">
              {name}
            </span>

            <span className="user-role">
              {role}
            </span>

          </div>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;