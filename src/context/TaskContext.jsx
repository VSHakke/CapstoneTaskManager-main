import React, { createContext, useState} from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", description: "Complete React project", startDate: "2024-03-01", dueDate: "2024-03-10", status: "pending" },
    { id: 2, title: "Task 2", description: "Review code", startDate: "2024-03-05", dueDate: "2024-03-12", status: "completed" }
  ]);

  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  const addTask = (title, description, startDate, dueDate) => {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      startDate,
      dueDate,
      status: "pending"
    };
    setTasks([...tasks, newTask]);
  };


  const markTaskCompleted = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: "completed" } : task));
  };


  const editTask = (id, updatedTask) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, markTaskCompleted, editTask, deleteTask, user, loginUser, logoutUser }}>
      {children}
    </TaskContext.Provider>
  );
};