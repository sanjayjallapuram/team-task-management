import { Link } from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

import "../styles/dashboard.css";

function Dashboard() {

  const [dashboard, setDashboard] =
    useState(null);

  const fetchDashboard = async () => {

    try {

      const response =
        await api.get("/api/dashboard");

      setDashboard(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchDashboard();

  }, []);

  if (!dashboard) {

    return (

      <div className="dashboard-loading">

        <h2>
          Loading Dashboard...
        </h2>

      </div>
    );
  }

  return (

    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">

        <div>

          <h1 className="dashboard-title">
            Dashboard
          </h1>

          <p className="dashboard-subtitle">
            Monitor tasks, productivity
            and project activity
          </p>

        </div>

        <Link
          to="/projects"
          className="projects-btn"
        >
          View Projects
        </Link>

      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">

          <h3>Total Tasks</h3>

          <h1>
            {dashboard.totalTasks}
          </h1>

        </div>

        <div className="stat-card">

          <h3>Overdue Tasks</h3>

          <h1>
            {dashboard.overdueTasks}
          </h1>

        </div>

      </div>

      {/* TASK STATUS */}
      <div className="dashboard-card">

        <h2 className="card-title">
          Tasks By Status
        </h2>

        <div className="status-list">

          <div className="status-item">

            <span>TODO</span>

            <strong>
              {dashboard.tasksByStatus.TODO}
            </strong>

          </div>

          <div className="status-item">

            <span>IN PROGRESS</span>

            <strong>
              {dashboard.tasksByStatus.IN_PROGRESS}
            </strong>

          </div>

          <div className="status-item">

            <span>DONE</span>

            <strong>
              {dashboard.tasksByStatus.DONE}
            </strong>

          </div>

        </div>

      </div>

      {/* TASKS PER USER */}
      <div className="dashboard-card">

        <h2 className="card-title">
          Tasks Per User
        </h2>

        <div className="users-list">

          {Object.entries(
            dashboard.tasksPerUser
          ).map(([user, count]) => (

            <div
              key={user}
              className="user-task-item"
            >

              <div className="user-left">

                <div className="user-avatar">
                  {user.charAt(0)}
                </div>

                <span>
                  {user}
                </span>

              </div>

              <strong>
                {count}
              </strong>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;