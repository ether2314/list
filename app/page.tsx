"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [tasks, setTasks] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tasks");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };


  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="border border-gray-300 rounded-lg p-2 flex-1"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border"
            >
              <span>{task}</span>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
