import { useState, type ChangeEvent } from "react";
import { supabase } from "../supabase-client";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ maxWidth: "400PX", margin: "0, auto", padding: "1rem" }}>
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5 rem" }}
        />

        <button
          type="submit"
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        >
          {/* "Sign Up"--> if isSignUp is true, otherwise--> "Sign In" */}
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
    </div>
  );
};
