import { useContext } from "react";
import AuthContext from "../context/Authcontext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
      textAlign: "center",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "20px",
    },
    button: {
      marginTop: "16px",
      backgroundColor: "#dc3545",
      color: "white",
      padding: "12px 24px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#b02a37",
    },
    link: {
      marginTop: "20px",
      display: "inline-block",
      backgroundColor: "#28a745",
      color: "white",
      padding: "12px 24px",
      borderRadius: "8px",
      textDecoration: "none",
      fontSize: "16px",
      transition: "background-color 0.3s ease",
    },
    linkHover: {
      backgroundColor: "#218838",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome, {user?.role}</h1>

      <button
        onClick={logout}
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
      >
        Logout
      </button>

      <Link
        to="/scholarships"
        style={styles.link}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.linkHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.link.backgroundColor)}
      >
        View Scholarships
      </Link>
    </div>
  );
}
