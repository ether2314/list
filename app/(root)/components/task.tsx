"use client";

import { useState, useEffect } from "react";

type Task = {
  text: string;
  completed: boolean;
};

function HomePage() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tasks");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [completedTasks, setCompletedTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("completedTasks");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    const newTask: Task = { text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const completeTask = (index: number) => {
    const completedTask = { ...tasks[index], completed: true };
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 text-black w-full">
      {/* Task Input Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Task List
        </h1>

        {/* Input & Add Button Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="border border-gray-300 rounded-lg p-3 flex-1 text-black placeholder-gray-600 w-full sm:w-auto"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-3 w-full sm:w-auto"
          >
            Add
          </button>
        </div>

        {/* Active Tasks */}
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border text-black"
            >
              <span className="font-medium text-lg">{task.text}</span>

              <div className="flex gap-3 items-center">
                {/* ✅ Checkmark icon for completed */}
                <button
                  onClick={() => completeTask(index)}
                  className="text-green-600 hover:text-green-800 font-bold text-2xl"
                  title="Mark as completed"
                >
                  ✓
                </button>

                {/* ❌ Delete */}
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-700 text-xl"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Completed Tasks Table */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-5xl mt-8 overflow-x-auto">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">
          Tasks Completed
        </h2>

        {completedTasks.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            No completed tasks yet.
          </p>
        ) : (
          <table className="w-full border border-gray-300 text-left min-w-[400px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Task</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{task.text}</td>
                  <td className="border px-4 py-2 text-green-600 font-semibold">
                    Completed
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

export default HomePage;
