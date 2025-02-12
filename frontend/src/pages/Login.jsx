import { useState, useContext } from "react";
import AuthContext from "../context/Authcontext";
import axios from "axios";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      login(res.data.token);
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f3f4f6" }}>
      <div style={{ backgroundColor: "white", padding: "32px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", width: "350px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", marginBottom: "10px", borderRadius: "4px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", marginBottom: "16px", borderRadius: "4px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "10px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
