import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTrash } from "react-icons/fa";

const url = import.meta.env.VITE_API_URL;

const TodoList = () => {
  const { user } = useContext(AppContext);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch all todos of the user
  const getAllTodos = async () => {
    try {
      const res = await axios.get(`${url}/api/todos/${user._id}`);
      if (res.data.success) setTasks(res.data.todos);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch tasks");
    }
  };

  // Add new task
  const handleAddTask = async () => {
    if (!newTask.trim()) return toast.warn("Task cannot be empty");

    try {
      const res = await axios.post(`${url}/api/todos/${user._id}`, {
        task: newTask,
        user: user._id,
      });

      if (res.data.success) {
        toast.success("Task added");
        setNewTask("");
        getAllTodos();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add task");
    }
  };

  // Change status (Pending to Completed)
  const handleStatusChange = async (todoId, newStatus) => {
    try {
      const res = await axios.patch(`${url}/api/todos/${todoId}`, {
        status: newStatus,
      });
      if (res.data.success) getAllTodos();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete task
  const handleDeleteTask = async (todoId) => {
    try {
      const res = await axios.delete(`${url}/api/todos/${todoId}`);
      if (res.data.success) {
        toast.success("Task deleted");
        getAllTodos();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete task");
    }
  };

  useEffect(() => {
    if (user) getAllTodos();
  }, [user]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">

      {/* welcome user name display hoga */}
      {user && (
        <h1 className="text-xl font-semibold text-center text-gray-700 mb-4">
          👋 Welcome, <span className="text-blue-600">{user.username}</span>
        </h1>
      )}

      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
        📝 Your ToDo List
      </h2>

      <div className="flex items-center gap-2 mb-5">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Write a task..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet. Add some!</p>
        ) : (
          tasks.map((task) => (
            <li
              key={task._id}
              className={`flex items-center justify-between p-3 rounded border ${
                task.status === "Completed"
                  ? "bg-green-100 border-green-300"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {task.status === "Completed" && (
                  <FaCheckCircle className="text-green-600 text-lg" />
                )}
                <span className="font-medium text-gray-800">{task.task}</span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task._id, e.target.value)
                  }
                  className="border px-2 py-1 rounded text-sm bg-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  title="Delete Task"
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
