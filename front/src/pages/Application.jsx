import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/Authcontext";
import axios from "axios";

export default function Applications() {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newApplication, setNewApplication] = useState({ course: "", university: "" });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const endpoint = user?.role === "admin" ? "/all" : "/";
      const res = await axios.get(`http://localhost:5000/api/applications${endpoint}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setApplications(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const submitApplication = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/applications", newApplication, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Application submitted successfully!");
      setNewApplication({ course: "", university: "" });
      fetchApplications();
    } catch (error) {
      alert("Error submitting application");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/applications/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Application status updated");
      fetchApplications();
    } catch (error) {
      alert("Error updating status");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Applications</h1>

      {/* Student: Apply for a Course */}
      {user?.role === "student" && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid gray", borderRadius: "5px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Submit Application</h2>
          <form onSubmit={submitApplication}>
            <input
              type="text"
              placeholder="Course Name"
              value={newApplication.course}
              onChange={(e) => setNewApplication({ ...newApplication, course: e.target.value })}
              required
              style={{ marginBottom: "10px", padding: "5px", border: "1px solid gray" }}
            /><br />
            <input
              type="text"
              placeholder="University Name"
              value={newApplication.university}
              onChange={(e) => setNewApplication({ ...newApplication, university: e.target.value })}
              required
              style={{ marginBottom: "10px", padding: "5px", border: "1px solid gray" }}
            /><br />
            <button type="submit" style={{ padding: "5px 10px", background: "blue", color: "white" }}>
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Applications List */}
      {loading ? (
        <p>Loading applications...</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {applications.length === 0 ? <p>No applications found</p> : (
            applications.map((app) => (
              <div key={app._id} style={{ padding: "15px", border: "1px solid gray", borderRadius: "5px", marginBottom: "10px" }}>
                <p><strong>Course:</strong> {app.course}</p>
                <p><strong>University:</strong> {app.university}</p>
                <p><strong>Status:</strong> {app.status}</p>

                {/* Agent: Approve/Reject */}
                {user?.role === "agent" && (
                  <div>
                    <button onClick={() => updateStatus(app._id, "approved")} style={{ marginRight: "10px", padding: "5px 10px", background: "green", color: "white" }}>
                      Approve
                    </button>
                    <button onClick={() => updateStatus(app._id, "rejected")} style={{ padding: "5px 10px", background: "red", color: "white" }}>
                      Reject
                    </button>
                  </div>
                )}

                {/* Admin: Show Student Info */}
                {user?.role === "admin" && app.student && (
                  <p><strong>Student:</strong> {app.student.name} ({app.student.email})</p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
