import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../api/axios";

import "../styles/project.css";

function Projects() {

  const [projects, setProjects] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
    });

  const navigate = useNavigate();

  const role =
    localStorage.getItem("role");

  // FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const response =
        await api.get("/api/projects/my");

      setProjects(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchProjects();

  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE PROJECT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/api/projects",
        formData
      );

      setFormData({
        name: "",
        description: "",
      });

      fetchProjects();

    } catch (error) {

      alert(
        error.response?.data?.message
        ||
        "Failed to create project"
      );
    }
  };

  return (

    <div className="projects-container">

      {/* HEADER */}
      <div className="projects-header">

        <div>

          <h1 className="projects-title">
            Projects
          </h1>

          <p className="projects-subtitle">
            Manage and track all your
            collaborative projects
          </p>

        </div>

      </div>

      {/* CREATE PROJECT */}
      {role === "ADMIN" && (

        <div className="create-project-card">

          <h2>
            Create New Project
          </h2>

          <form
            className="project-form"
            onSubmit={handleSubmit}
          >

            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={formData.name}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleChange}
            />

            <button type="submit">
              Create Project
            </button>

          </form>

        </div>
      )}

      {/* PROJECT LIST */}
      <div className="projects-list-header">

        <h2>
          My Projects
        </h2>

        <span>
          {projects.length} Projects
        </span>

      </div>

      <div className="projects-grid">

        {projects.map((project) => (

          <div
            key={project.id}
            className="project-card"
            onClick={() =>
              navigate(
                `/projects/${project.id}`
              )
            }
          >

            <div className="project-card-top">

              <div className="project-icon">
                {project.name.charAt(0)}
              </div>

              <div>

                <h3>
                  {project.name}
                </h3>

                <p className="project-description">
                  {project.description}
                </p>

              </div>

            </div>

            <div className="project-footer">

              <span className="member-count">
                {project.members.length}
                {" "}
                Members
              </span>

              <span className="view-project">
                Open →
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Projects;