import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabase-client";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

function App() {
  const [newtask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const [tasks, setTasks] = useState<Task[]>([]);

  const [darkMode, setDarkMode] = useState(false);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.log("Error:", error.message);
      return;
    }

    setTasks(data);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.from("tasks").insert(newtask).single();

    if (error) {
      console.error("Error:", error.message);
    }

    setNewTask({ title: "", description: "" });
  };

  useEffect(() => {
    fetchTasks();
  });
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="card">
        <div className="header">
          <h2>Task Manager</h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            // style={{ background: "#0f172a" }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Task Title"
            value={newtask.title}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <textarea
            placeholder="Task Description"
            value={newtask.description}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
          />

          <button type="submit">Add Task</button>
        </form>

        <ul className="task-list">
          <li className="task-item">No tasks yet</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
