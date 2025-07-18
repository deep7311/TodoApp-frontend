import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";

const url = import.meta.env.VITE_API_URL;

const TodoList = () => {
  const { user } = useContext(AppContext);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = async () => {
    try {
      const response = await axios.post(`${url}/api/todos/${user._id}`, {
        task: newTask,
        user: user._id,
      });

      if (response.data.success) {
        toast.success("Task added successfully");
        setNewTask("");
        getAllTodos();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add task");
    }
  };

  const getAllTodos = async () => {
    try {
      const response = await axios.get(`${url}/api/todos/${user._id}`);
      if (response.data.success) {
        setTasks(response.data.todos);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch tasks");
    }
  };

  const handleStatusChange = async (todoId, newStatus) => {
    try {
      const response = await axios.patch(`${url}/api/todos/${todoId}`, {
        status: newStatus,
      });
      if (response.data.success) {
        getAllTodos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (todoId) => {
    try {
      const response = await axios.delete(`${url}/api/todos/${todoId}`);
      if (response.data.success) {
        toast.success("Task deleted successfully");
        getAllTodos();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task");
    }
  };

  useEffect(() => {
    if (user) {
      getAllTodos();
    }
  }, [user]);

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">📝 Your ToDo List</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          name="task"
          className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>

      <ul className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet. Add some Task</p>
        ) : (
          tasks.map((task, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-3 rounded border ${
                task.status === "Completed"
                  ? "bg-green-100 border-green-300"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {task.status === "Completed" && (
                  <FaCheckCircle className="text-green-600" />
                )}
                <span
                  className="font-medium"
                >
                  {task.task}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task._id, e.target.value)
                  }
                  className="border px-2 py-1 rounded bg-white text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  className="text-red-500 hover:text-red-700 ml-2"
                  title="Delete Task"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
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
