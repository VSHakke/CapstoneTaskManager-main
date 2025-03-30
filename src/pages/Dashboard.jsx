import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
const Dashboard = () => {
    const { tasks, addTask, deleteTask, markTaskCompleted } = useContext(TaskContext);
    const { user, logout } = useContext(AuthContext);
    const [newTask, setNewTask] = useState({ title: "", description: "", startDate: "", dueDate: "" });
    const [showProfile, setShowProfile] = useState(false);
    const [filter, setFilter] = useState("all");

    if (!user) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    const handleAddTask = () => {
        if (newTask.title && newTask.description && newTask.startDate && newTask.dueDate) {
            addTask(newTask.title, newTask.description, newTask.startDate, newTask.dueDate);
            setNewTask({ title: "", description: "", startDate: "", dueDate: "" });
        }
    };

    const filteredTasks = tasks.filter((task) => filter === "all" || task.status === filter);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container d-flex justify-content-between">
                    <a className="navbar-brand text-white" href="#">Task Manager</a>
                    <div className="profile-icon position-relative" onClick={() => setShowProfile(!showProfile)}>
                        <FaUserCircle size={40} style={{ cursor: "pointer", color: "white" }} />
                        {showProfile && user && (
                            <div className="profile-dropdown bg-light p-3 position-absolute end-0 top-100 mt-2 border rounded shadow" style={{ minWidth: "220px" }}>
                                <p className="mb-2 fw-bold text-dark text-center">{user.username ? user.username : "Unknown User"}</p>
                                <p className="mb-2 text-muted text-center">{user.email ? user.email : "No Email Provided"}</p>
                                <button className="btn btn-danger w-100" onClick={logout}>Logout</button>
                            </div>
                        )}

                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <h2 className="text-center text-dark">Task Manager</h2>
                <div className="p-4 mb-4 bg-secondary border rounded shadow-sm">
                    <h5 className="text-white">Add New Task</h5>
                    <input type="text" className="form-control mb-2" placeholder="Task Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
                    <textarea className="form-control mb-2" placeholder="Task Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}></textarea>
                    <input type="date" className="form-control mb-2" value={newTask.startDate} onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })} />
                    <input type="date" className="form-control mb-2" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
                    <button className="btn" style={{ backgroundColor: "#0078D4", color: "white" }} onClick={handleAddTask}>Add Task</button>
                </div>

                <div className="mb-3">
                    <label className="form-label">Filter by Status:</label>
                    <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="list-group">
                    {filteredTasks.map((task) => (
                        <div key={task.id} className="list-group-item d-flex justify-content-between align-items-center bg-light border-dark shadow-sm">
                            <div>
                                <h5 className="text-dark">{task.title}</h5>
                                <p className="text-muted">{task.description}</p>
                                <p className="text-secondary">Start: {task.startDate} | Due: {task.dueDate}</p>
                                <small className={`badge ${task.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>{task.status}</small>
                            </div>
                            <div>
                                <button className="btn btn-sm btn-success me-2" onClick={() => markTaskCompleted(task.id)}>Complete</button>
                                <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Dashboard;