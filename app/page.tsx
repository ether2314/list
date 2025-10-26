"use client";

import { useState, useEffect } from "react";

// Define task structure
type Task = {
  text: string;
  status: string | null; // 'Not Started' | 'In Progress' | 'Completed' | null
};

export default function HomePage() {
  // Load tasks from localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tasks");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [input, setInput] = useState("");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = () => {
    if (input.trim() === "") return;
    const newTask: Task = { text: input, status: null };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  // Delete task
  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Toggle task status
  const toggleStatus = (index: number) => {
    const statusOrder = [null, "Not Started", "In Progress", "Completed"];
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => {
        if (i !== index) return task;

        const currentIndex = statusOrder.indexOf(task.status);
        // Move to next status (loop back to null)
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
        return { ...task, status: nextStatus };
      })
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Task List</h1>

        {/* Input section */}
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

        {/* Task list */}
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border"
            >
              <div className="flex flex-col">
                <span className="font-medium">{task.text}</span>
                {task.status && (
                  <span
                    className={`text-sm mt-1 ${
                      task.status === "Completed"
                        ? "text-green-600"
                        : task.status === "In Progress"
                        ? "text-yellow-600"
                        : "text-gray-500"
                    }`}
                  >
                    {task.status}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(index)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Status
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
