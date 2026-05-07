import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../api/axios";

import "../styles/projectDetails.css";

function ProjectDetails() {

  const { id } = useParams();

  const [project, setProject] =
    useState(null);

  const [users, setUsers] =
    useState([]);

  const [selectedUser, setSelectedUser] =
    useState("");

  const [tasks, setTasks] =
    useState([]);

  const [taskData, setTaskData] =
    useState({
      title: "",
      description: "",
      dueDate: "",
      priority: "MEDIUM",
      assignedTo: [],
    });

  const currentRole =
    localStorage.getItem("role");

  // FETCH PROJECT
  const fetchProject = async () => {

    try {

      const response =
        await api.get("/api/projects/my");

      const currentProject =
        response.data.find(
          (p) => p.id === id
        );

      setProject(currentProject);

    } catch (error) {

      console.log(error);
    }
  };

  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const response =
        await api.get("/api/users");

      setUsers(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const response =
        await api.get(`/api/tasks/${id}`);

      setTasks(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchProject();

    fetchUsers();

    fetchTasks();

  }, [id]);

  // ADD MEMBER
  const handleAddMember = async () => {

    try {

      await api.put(
        `/api/projects/${id}/members/${selectedUser}`
      );

      setSelectedUser("");

      fetchProject();

    } catch (error) {

      alert("Failed to add member");
    }
  };

  // REMOVE MEMBER
  const handleRemoveMember = async (
    userId
  ) => {

    try {

      await api.delete(
        `/api/projects/${id}/members/${userId}`
      );

      fetchProject();

    } catch (error) {

      alert("Failed to remove member");
    }
  };

  // TASK INPUT
  const handleTaskChange = (e) => {

    const {
      name,
      value,
      selectedOptions
    } = e.target;

    if (name === "assignedTo") {

      const values =
        [...selectedOptions]
          .map(option => option.value);

      setTaskData({
        ...taskData,
        assignedTo: values,
      });

      return;
    }

    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  // CREATE TASK
  const handleCreateTask = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        `/api/tasks/${id}`,
        taskData
      );

      setTaskData({
        title: "",
        description: "",
        dueDate: "",
        priority: "MEDIUM",
        assignedTo: [],
      });

      fetchTasks();

    } catch (error) {

      alert("Failed to create task");
    }
  };

  // ADD USERS TO TASK
  const handleAddUsersToTask = async (
    taskId,
    userIds
  ) => {

    try {

      await api.put(
        `/api/tasks/${taskId}/add-users`,
        userIds
      );

      fetchTasks();

    } catch (error) {

      alert("Failed to add users");
    }
  };

  // REMOVE USER FROM TASK
  const handleRemoveUserFromTask = async (
    taskId,
    userId
  ) => {

    try {

      await api.delete(
        `/api/tasks/${taskId}/remove-user/${userId}`
      );

      fetchTasks();

    } catch (error) {

      alert("Failed to remove user");
    }
  };

  // UPDATE STATUS
  const handleStatusUpdate = async (
    taskId,
    status
  ) => {

    try {

      await api.put(
        `/api/tasks/${taskId}/status?status=${status}`
      );

      fetchTasks();

    } catch (error) {

      alert("Failed to update status");
    }
  };

  if (!project) {

    return (

      <div className="loading-container">

        <h2>Loading...</h2>

      </div>
    );
  }

  return (

    <div className="project-details-container">

      {/* PROJECT HEADER */}
      <div className="project-header">

        <h1 className="project-title">
          {project.name}
        </h1>

        <p className="project-description">
          {project.description}
        </p>

      </div>

      {/* ADD MEMBER */}
      {currentRole === "ADMIN" && (

        <div className="section-card">

          <h2 className="section-heading">
            Add Member
          </h2>

          <div className="add-member-row">

            <select
              className="styled-input"
              value={selectedUser}
              onChange={(e) =>
                setSelectedUser(
                  e.target.value
                )
              }
            >

              <option value="">
                Select User
              </option>

              {users.map((user) => (

                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                  {" "}
                  ({user.email})
                </option>
              ))}

            </select>

            <button
              className="primary-btn"
              onClick={handleAddMember}
            >
              Add Member
            </button>

          </div>

        </div>
      )}

      {/* MEMBERS */}
      <div className="members-section">

        <h2 className="section-heading">
          Members
        </h2>

        <div className="members-grid">

          {project.members.map((memberId) => {

            const member =
              users.find(
                (u) => u.id === memberId
              );

            return (

              <div
                key={memberId}
                className="member-card"
              >

                <div className="member-left">

                  <div className="member-avatar">
                    {member?.name?.charAt(0)}
                  </div>

                  <div>

                    <h4>
                      {member?.name}
                    </h4>

                    <p>
                      {member?.email}
                    </p>

                  </div>

                </div>

                {currentRole === "ADMIN" && (

                  <button
                    className="danger-btn"
                    onClick={() =>
                      handleRemoveMember(
                        memberId
                      )
                    }
                  >
                    Remove
                  </button>
                )}

              </div>
            );
          })}

        </div>

      </div>

      {/* CREATE TASK */}
      {currentRole === "ADMIN" && (

        <div className="section-card">

          <h2 className="section-heading">
            Create Task
          </h2>

          <form
            className="task-form"
            onSubmit={handleCreateTask}
          >
            <p>Title:</p>
            <input
              className="styled-input"
              type="text"
              name="title"
              placeholder="Task Title"
              value={taskData.title}
              onChange={handleTaskChange}
            />

            <p>Description:</p>
            <textarea
              className="styled-input"
              name="description"
              placeholder="Task Description"
              value={taskData.description}
              onChange={handleTaskChange}
            />

            <p>Due Date:</p>
            <input
              className="styled-input"
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleTaskChange}
            />

            <p>Priority:</p>
            <select
              className="styled-input"
              name="priority"
              value={taskData.priority}
              onChange={handleTaskChange}
            >

              <option value="LOW">
                LOW
              </option>

              <option value="MEDIUM">
                MEDIUM
              </option>

              <option value="HIGH">
                HIGH
              </option>

            </select>

            <p>Assign To:</p>
            <select
              className="styled-input"
              multiple
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={handleTaskChange}
            >

              {users
                .filter((u) =>
                  project.members.includes(
                    u.id
                  )
                )
                .map((user) => (

                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
              ))}

            </select>

            <button
              className="primary-btn"
              type="submit"
            >
              Create Task
            </button>

          </form>

        </div>
      )}

      {/* TASKS */}
      <div className="tasks-section">

        <h2 className="section-heading">
          Tasks
        </h2>

        <div className="tasks-grid">

          {tasks.map((task) => {

            const assignedUsers =
              users.filter((u) =>
                task.assignedTo?.includes(
                  u.id
                )
              );

            return (

              <div
                key={task.id}
                className="task-card"
              >

                <div className="task-top">

                  <h3>Name of the Task : {task.title}</h3>


                  <span className="priority-badge">
                   Task priority :
                    {task.priority}
                  </span>

                </div>

                <p className="task-description">
                  Description: {task.description}
                </p>

                <div className="task-meta">

                  <span>
                    Status:
                    {" "}
                    {task.status}
                  </span>

                  <span>
                    Due:
                    {" "}
                    {task.dueDate}
                  </span>

                </div>

                {/* ASSIGNED USERS */}
                <div className="assigned-users">
                  <h3>Assigned Users:</h3>

                  {assignedUsers.map((user) => (

                    <div
                      key={user.id}
                      className="user-chip"
                    >

                      <span>
                        {user.name}
                      </span>

                      {currentRole === "ADMIN" && (

                        <button
                          className="chip-remove-btn"
                          onClick={() =>
                            handleRemoveUserFromTask(
                              task.id,
                              user.id
                            )
                          }
                        >
                          ×
                        </button>
                      )}

                    </div>
                  ))}

                </div>

                {/* ADD USERS */}
                {currentRole === "ADMIN" && (

                  <div className="task-actions">
                    <h3>Add Users to Task:</h3>
                    <select
                      className="styled-input"
                      multiple
                      onChange={(e) => {

                        const selectedUsers =
                          [...e.target.selectedOptions]
                            .map(
                              option =>
                                option.value
                            );

                        handleAddUsersToTask(
                          task.id,
                          selectedUsers
                        );
                      }}
                    >

                      {users
                        .filter((u) =>
                          project.members.includes(
                            u.id
                          )
                          &&
                          !task.assignedTo.includes(
                            u.id
                          )
                        )
                        .map((user) => (

                          <option
                            key={user.id}
                            value={user.id}
                          >
                            {user.name}
                          </option>
                      ))}

                    </select>

                  </div>
                )}

                {/* STATUS */}
                <h3>Update Status:</h3>
                <select
                  className="styled-input"
                  value={task.status}
                  onChange={(e) =>
                    handleStatusUpdate(
                      task.id,
                      e.target.value
                    )
                  }
                >

                  <option value="TODO">
                    TODO
                  </option>

                  <option value="IN_PROGRESS">
                    IN PROGRESS
                  </option>

                  <option value="DONE">
                    DONE
                  </option>

                </select>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default ProjectDetails;