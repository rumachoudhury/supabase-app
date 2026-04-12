import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
import "./App.css";

import supabase from "./supabase-client";

function App() {
  const [newtask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await supabase.from("tasks").insert([newtask]);
  };
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Task Manager CRUD</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Task Title"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <textarea
          name=""
          id=""
          placeholder="Task Description"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        ></textarea>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          {/* <strong>{task.title}</strong> */}
          {/* <p>{task.description}</p> */}
        </li>
      </ul>
    </div>
    // <>
    //   <section id="center">
    //     <div className="hero">
    //       <img src={heroImg} className="base" width="170" height="179" alt="" />
    //       <img src={reactLogo} className="framework" alt="React logo" />
    //       <img src={viteLogo} className="vite" alt="Vite logo" />
    //     </div>
    //     <div>
    //       <h1>Get started</h1>
    //       <p>
    //         Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
    //       </p>
    //     </div>
    //     <button
    //       className="counter"
    //       onClick={() => setCount((count) => count + 1)}
    //     >
    //       Count is {count}
    //     </button>
    //   </section>

    //   <div className="ticks"></div>

    //   <section id="next-steps">
    //     <div id="docs">
    //       <svg className="icon" role="presentation" aria-hidden="true">
    //         <use href="/icons.svg#documentation-icon"></use>
    //       </svg>
    //       <h2>Documentation</h2>
    //       <p>Your questions, answered</p>
    //       <ul>
    //         <li>
    //           <a href="https://vite.dev/" target="_blank">
    //             <img className="logo" src={viteLogo} alt="" />
    //             Explore Vite
    //           </a>
    //         </li>
    //         <li>
    //           <a href="https://react.dev/" target="_blank">
    //             <img className="button-icon" src={reactLogo} alt="" />
    //             Learn more
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //     <div id="social">
    //       <svg className="icon" role="presentation" aria-hidden="true">
    //         <use href="/icons.svg#social-icon"></use>
    //       </svg>
    //       <h2>Connect with us</h2>
    //       <p>Join the Vite community</p>
    //       <ul>
    //         <li>
    //           <a href="https://github.com/vitejs/vite" target="_blank">
    //             <svg
    //               className="button-icon"
    //               role="presentation"
    //               aria-hidden="true"
    //             >
    //               <use href="/icons.svg#github-icon"></use>
    //             </svg>
    //             GitHub
    //           </a>
    //         </li>
    //         <li>
    //           <a href="https://chat.vite.dev/" target="_blank">
    //             <svg
    //               className="button-icon"
    //               role="presentation"
    //               aria-hidden="true"
    //             >
    //               <use href="/icons.svg#discord-icon"></use>
    //             </svg>
    //             Discord
    //           </a>
    //         </li>
    //         <li>
    //           <a href="https://x.com/vite_js" target="_blank">
    //             <svg
    //               className="button-icon"
    //               role="presentation"
    //               aria-hidden="true"
    //             >
    //               <use href="/icons.svg#x-icon"></use>
    //             </svg>
    //             X.com
    //           </a>
    //         </li>
    //         <li>
    //           <a href="https://bsky.app/profile/vite.dev" target="_blank">
    //             <svg
    //               className="button-icon"
    //               role="presentation"
    //               aria-hidden="true"
    //             >
    //               <use href="/icons.svg#bluesky-icon"></use>
    //             </svg>
    //             Bluesky
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </section>

    //   <div className="ticks"></div>
    //   <section id="spacer"></section>
    // </>
  );
}

export default App;

// --------
// import { useEffect, useState } from "react";
// import "./App.css";
// import supabase from "./supabase-client";

// function App() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [tasks, setTasks] = useState<any[]>([]);

//   // 📥 Fetch tasks
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   async function fetchTasks() {
//     const { data, error } = await supabase.from("tasks").select("*");

//     if (error) {
//       console.log(error);
//     } else {
//       setTasks(data);
//     }
//   }

//   // ➕ Add task
//   async function handleSubmit(e: any) {
//     e.preventDefault();

//     const { error } = await supabase.from("tasks").insert([
//       {
//         title,
//         description,
//       },
//     ]);

//     if (error) {
//       console.log(error);
//     } else {
//       setTitle("");
//       setDescription("");
//       fetchTasks();
//     }
//   }

//   return (
//     <div style={{ maxWidth: "600px", margin: "0 auto" }}>
//       <h2>Task Manager CRUD</h2>

//       <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
//         <input
//           type="text"
//           placeholder="Task Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
//         />
//         <textarea
//           placeholder="Task Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
//         ></textarea>
//         <button type="submit" style={{ padding: "0.5rem 1rem" }}>
//           Add Task
//         </button>
//       </form>

//       {/* Task List */}
//       <ul style={{ listStyle: "none", padding: "0" }}>
//         {tasks.map((task) => (
//           <li
//             key={task.id}
//             style={{
//               border: "1px solid #ccc",
//               padding: "1rem",
//               marginBottom: "0.5rem",
//             }}
//           >
//             <strong>{task.title}</strong>
//             <p>{task.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
