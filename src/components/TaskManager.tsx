// import { useEffect, useState } from "react";
// // import "./App.css";
// import { supabase } from "./supabase-client";

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   created_at: string;
// }

// function TaskManager() {
//   const [user, setUser] = useState<any>(null);

//   // Get user session
//   useEffect(() => {
//     supabase.auth.getUser().then(({ data }) => {
//       setUser(data.user);
//     });

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setUser(session?.user || null);
//       },
//     );

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   const [newtask, setNewTask] = useState({
//     title: "",
//     description: "",
//   });

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [darkMode, setDarkMode] = useState(false);
//   const [newDescription, setNewDescription] = useState("");

//   // Get user session
//   // useEffect(() => {
//   //   supabase.auth.getUser().then(({ data }) => {
//   //     setUser(data.user);
//   //   });

//   //   const { data: listener } = supabase.auth.onAuthStateChange(
//   //     (_event, session) => {
//   //       setUser(session?.user || null);
//   //     },
//   //   );

//   //   return () => {
//   //     listener.subscription.unsubscribe();
//   //   };
//   // }, []);

//   const fetchTasks = async () => {
//     const { data, error } = await supabase
//       .from("tasks")
//       .select("*")
//       .order("created_at", { ascending: true });

//     if (error) {
//       console.log("Error:", error.message);
//       return;
//     }

//     setTasks(data ?? []);
//   };

//   useEffect(() => {
//     if (user) {
//       fetchTasks();
//     }
//   }, [user]);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const { error } = await supabase.from("tasks").insert(newtask);

//     if (error) {
//       console.error("Error:", error.message);
//       return;
//     }

//     setNewTask({ title: "", description: "" });
//     fetchTasks();
//   };

//   const deleteTask = async (id: number) => {
//     const { error } = await supabase.from("tasks").delete().eq("id", id);

//     if (error) {
//       console.error("Error deleting task:", error.message);
//       return;
//     }

//     fetchTasks();
//   };

//   const updateTask = async (id: number) => {
//     const { error } = await supabase
//       .from("tasks")
//       .update({ description: newDescription })
//       .eq("id", id);

//     if (error) {
//       console.error("Error updating task:", error.message);
//       return;
//     }

//     fetchTasks();
//   };

//   //  AUTH GATE
//   // if (!user) {
//   //   return <Auth />;
//   // }

//   return (
//     <div className={darkMode ? "app dark" : "app"}>
//       <div className="card">
//         <div className="header">
//           <h2>Task Manager</h2>
//           <button onClick={() => setDarkMode(!darkMode)}>
//             {darkMode ? "☀️" : "🌙"}
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="form">
//           <input
//             type="text"
//             placeholder="Task Title"
//             value={newtask.title}
//             onChange={(e) =>
//               setNewTask((prev) => ({ ...prev, title: e.target.value }))
//             }
//           />

//           <textarea
//             placeholder="Task Description"
//             value={newtask.description}
//             onChange={(e) =>
//               setNewTask((prev) => ({ ...prev, description: e.target.value }))
//             }
//           />

//           <button type="submit">Add Task</button>
//         </form>

//         <ul className="task-list" style={{ listStyle: "none", padding: 0 }}>
//           {tasks.map((task) => (
//             <li
//               key={task.id}
//               className="task-item"
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "1rem",
//                 borderRadius: "4px",
//                 marginBottom: "0.5rem",
//               }}
//             >
//               <h3>{task.title}</h3>
//               <p>{task.description}</p>

//               <textarea
//                 placeholder="Update description..."
//                 value={newDescription}
//                 onChange={(e) => setNewDescription(e.target.value)}
//               />

//               <div>
//                 <button onClick={() => updateTask(task.id)}>Edit</button>
//                 <button onClick={() => deleteTask(task.id)}>Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default TaskManager;

import { ChangeEvent, useEffect, useState } from "react";
import { supabase } from "../supabase-client";
// import { Session } from "@supabase/supabase-js";
import type { Session } from "@supabase/supabase-js";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
  image_url: string;
}

function TaskManager({ session }: { session: Session }) {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newDescription, setNewDescription] = useState("");

  const [taskImage, setTaskImage] = useState<File | null>(null);

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error reading task: ", error.message);
      return;
    }

    setTasks(data);
  };

  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task: ", error.message);
      return;
    }
  };

  const updateTask = async (id: number) => {
    const { error } = await supabase
      .from("tasks")
      .update({ description: newDescription })
      .eq("id", id);

    if (error) {
      console.error("Error updating task: ", error.message);
      return;
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const filePath = `${file.name}-${Date.now()}`;

    const { error } = await supabase.storage
      .from("tasks-images")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error.message);
      return null;
    }

    const { data } = await supabase.storage
      .from("tasks-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrl: string | null = null;
    if (taskImage) {
      imageUrl = await uploadImage(taskImage);
    }

    const { error } = await supabase
      .from("tasks")
      .insert({ ...newTask, email: session.user.email, image_url: imageUrl })
      .select()
      .single();

    if (error) {
      console.error("Error adding task: ", error.message);
      return;
    }

    setNewTask({ title: "", description: "" });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTaskImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const channel = supabase.channel("tasks-channel");
    channel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tasks" },
        (payload) => {
          const newTask = payload.new as Task;
          setTasks((prev) => [...prev, newTask]);
        },
      )
      .subscribe((status) => {
        console.log("Subscription: ", status);
      });
  }, []);

  console.log(tasks);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Task Manager CRUD</h2>

      {/* Form to add a new task */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Task Title"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <textarea
          placeholder="Task Description"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />

        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Add Task
        </button>
      </form>

      {/* List of Tasks */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, key) => (
          <li
            key={key}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <img src={task.image_url} style={{ height: 70 }} />
              <div>
                <textarea
                  placeholder="Updated description..."
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <button
                  style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
                  onClick={() => updateTask(task.id)}
                >
                  Edit
                </button>
                <button
                  style={{ padding: "0.5rem 1rem" }}
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
