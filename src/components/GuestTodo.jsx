import React, { useState } from "react";

const GuestTodo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-4">
      <div className="max-w-xl mx-auto p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white">
        {/* Guest mode label */}
        <div className="mb-4 text-center">
          <span className="inline-block bg-yellow-200 text-yellow-900 text-sm px-4 py-1 rounded-full font-semibold shadow-sm">
            👤 Guest Mode - Tasks won’t be saved
          </span>
        </div>

        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center">
          🌟 My To-Do List
        </h2>

        <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            className="flex-grow px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:opacity-90 transition"
          >
            Add
          </button>
        </form>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-600 italic">No tasks added yet.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((t, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition"
              >
                <span className="text-gray-800">{t}</span>
                <button
                  onClick={() => deleteTask(i)}
                  className="text-red-500 hover:underline text-sm font-medium"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GuestTodo;
