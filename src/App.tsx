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

    setTasks(data ?? []);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.from("tasks").insert(newtask);

    if (error) {
      console.error("Error:", error.message);
    }

    setNewTask({ title: "", description: "" });

    await fetchTasks();
  };

  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id); //"eq" means equals here

    if (error) {
      console.error("Error deleting task", error.message);
      return;
    }

    await fetchTasks(); // refresh UI
  };

  useEffect(() => {
    fetchTasks();
  }, []);
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

        <ul className="task-list" style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task, key) => (
            <li
              key={key}
              className="task-item"
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "4px",
                marginBottom: "0.5rem",
              }}
            >
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <textarea name="" id="" placeholder="Updated descripition..." />
                <div>
                  <button
                    style={{ marginRight: "0.5rem", padding: "0.5rem 1 rem" }}
                  >
                    Edit
                  </button>
                  <button
                    style={{ padding: "0.5rem 1 rem" }}
                    onClick={() => deleteTask(task.id)} // call deleteTask with the task's id when clicked
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* <ul className="task-list">
          {tasks.length === 0 ? (
            <li className="task-item">No tasks yet</li>
          ) : (
            tasks.map((task) => (
              <li key={task.id} className="task-item">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </li>
            ))
          )}
        </ul> */}
      </div>
    </div>
  );
}

export default App;
