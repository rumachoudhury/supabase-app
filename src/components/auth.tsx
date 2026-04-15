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
      </form>
    </div>
  );
};
