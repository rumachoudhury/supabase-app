// import { useState, type ChangeEvent } from "react";
// import { supabase } from "../supabase-client";

// export const Auth = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (isSignUp) {
//       const { error: signUpError } = await supabase.auth.signUp({
//         email,
//         password,
//       });

//       if (signUpError) {
//         console.error("Error signing up", signUpError.message);
//         return;
//       }
//     } else {
//       const { error: signInError } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (signInError) {
//         console.error("Error signing in:", signInError.message);
//         return;
//       }
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
//       <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e: ChangeEvent<HTMLInputElement>) =>
//             setEmail(e.target.value)
//           }
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e: ChangeEvent<HTMLInputElement>) =>
//             setPassword(e.target.value)
//           }
//           style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
//         />

//         <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
//       </form>
//     </div>
//   );
// };

// ----------------------
import { useState, type ChangeEvent, type FormEvent } from "react";
import { supabase } from "../supabase-client";
import "../style/Auth.css";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMsg("");

    // simple validation
    if (!email.includes("@")) {
      setErrorMsg("Please enter a valid email.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      setMessage("Account created! Please check your email.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      setMessage("Login successful!");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">
        {isSignUp ? "Create Account" : "Welcome Back"}
      </h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="auth-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value.trim())
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="auth-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      {/* SHOW ERROR / SUCCESS */}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <button
        type="button"
        className="auth-toggle"
        onClick={() => setIsSignUp(!isSignUp)}
        disabled={loading}
      >
        {isSignUp ? "Go to Sign In" : "Go to Sign Up"}
      </button>
    </div>
  );
};
