// import { useState } from "react";
// // import reactLogo from "./assets/react.svg";
// // import viteLogo from "./assets/vite.svg";
// // import heroImg from "./assets/hero.png";
// import "./App.css";

// import { supabase } from "./supabase-client";

// function App() {
//   const [newtask, setNewTask] = useState({
//     title: "",
//     description: "",
//   });

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     const { error } = await supabase.from("tasks").insert([newtask]);

//     if (error) {
//       console.error("Error adding task:", error.message);
//     }

//     setNewTask({ title: "", description: "" });
//   };
//   return (
//     <div className="body">
//       <div
//         style={{
//           maxWidth: "600px",
//           margin: "0 auto",
//           background: "#f9f9f9",
//           padding: "2rem",
//           borderRadius: "8px",
//           marginTop: "2rem",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//         }}
//       >
//         <h2 style={{ color: "#e05915ff", textAlign: "center" }}>
//           Task Manager CRUD
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           style={{
//             marginBottom: "1rem",
//             border: "1px solid #ccc",
//             padding: "1rem",
//             borderRadius: "4px",
//           }}
//         >
//           <input
//             type="text"
//             name=""
//             id=""
//             placeholder="Task Title"
//             onChange={(e) =>
//               setNewTask((prev) => ({ ...prev, title: e.target.value }))
//             }
//             style={{
//               width: "100%",
//               marginBottom: "0.5rem",
//               padding: "0.5rem",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           />
//           <textarea
//             name=""
//             id=""
//             placeholder="Task Description"
//             onChange={(e) =>
//               setNewTask((prev) => ({ ...prev, description: e.target.value }))
//             }
//             style={{
//               width: "100%",
//               marginBottom: "0.5rem",
//               padding: "0.5rem",
//             }}
//           ></textarea>
//           <button
//             type="submit"
//             style={{
//               padding: "0.5rem 1rem",
//               color: "#fff",
//               backgroundColor: "#e05915ff",
//               border: "none",
//               borderRadius: "4px",
//             }}
//           >
//             Add Task
//           </button>
//         </form>

//         {/* Task List */}
//         <ul style={{ listStyle: "none", padding: "0" }}>
//           <li
//             style={{
//               border: "1px solid #ccc",
//               padding: "1rem",
//               marginBottom: "0.5rem",
//             }}
//           >
//             {/* <strong>{task.title}</strong> */}
//             {/* <p>{task.description}</p> */}
//             No tasks yet
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;

// =============================================================================
import { useState } from "react";
import "./App.css";
import { supabase } from "./supabase-client";

function App() {
  const [newtask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("tasks").insert([newtask]);

    if (error) {
      console.error("Error:", error.message);
    }

    setNewTask({ title: "", description: "" });
  };

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
