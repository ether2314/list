"use client";

import { useState, useEffect } from "react";

type Task = {
  text: string;
  status: string | null;
};

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>(() => {
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
    const newTask: Task = { text: input, status: null };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleStatus = (index: number) => {
    const statusOrder = [null, "Not Started", "In Progress", "Completed"];
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => {
        if (i !== index) return task;
        const currentIndex = statusOrder.indexOf(task.status);
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
        return { ...task, status: nextStatus };
      })
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-black">

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-black">
          Task List
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="border border-gray-300 rounded-lg p-2 flex-1 text-black placeholder-black"
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
              className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border text-black"
            >
              <div className="flex flex-col">
                <span className="font-medium text-black">{task.text}</span>
                {task.status && (
                  <span
                    className={`text-sm mt-1 ${
                      task.status === "Completed"
                        ? "text-green-600"
                        : task.status === "In Progress"
                        ? "text-yellow-600"
                        : "text-gray-600"
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
