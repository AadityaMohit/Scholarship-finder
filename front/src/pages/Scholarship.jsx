import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/Authcontext";
import axios from "axios";

export default function Scholarships() {
  const { user } = useContext(AuthContext);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ country: "", minAmount: "" });

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const query = `?country=${filters.country}&minAmount=${filters.minAmount}`;
      const res = await axios.get(`http://localhost:5000/api/scholarships/search${query}`);
      setScholarships(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    }
  };

  const applyForScholarship = async (scholarshipId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/scholarships/apply`,
        { scholarshipId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Application submitted successfully!");
    } catch (error) {
      alert("Error applying for scholarship");
    }
  };

  const addScholarship = async (e) => {
    e.preventDefault();
    const newScholarship = {
      name: e.target.name.value,
      country: e.target.country.value,
      amount: e.target.amount.value,
      deadline: e.target.deadline.value,
    };

    try {
      await axios.post("http://localhost:5000/api/scholarships", newScholarship, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Scholarship added successfully!");
      fetchScholarships();
    } catch (error) {
      alert("Error adding scholarship");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Available Scholarships</h1>

      {/* Filters */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Filter by country"
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
          style={{ marginRight: "10px", padding: "5px", border: "1px solid gray" }}
        />
        <input
          type="number"
          placeholder="Minimum amount"
          value={filters.minAmount}
          onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
          style={{ marginRight: "10px", padding: "5px", border: "1px solid gray" }}
        />
        <button onClick={fetchScholarships} style={{ padding: "5px 10px", background: "blue", color: "white" }}>
          Apply Filters
        </button>
      </div>

      {loading ? (
        <p>Loading scholarships...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {scholarships.map((scholarship) => (
            <div key={scholarship._id} style={{ padding: "15px", border: "1px solid gray", borderRadius: "5px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{scholarship.name}</h2>
              <p><strong>Country:</strong> {scholarship.country}</p>
              <p><strong>Amount:</strong> ${scholarship.amount}</p>
              <p><strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}</p>

              {user?.role === "student" && (
                <button
                  onClick={() => applyForScholarship(scholarship._id)}
                  style={{ marginTop: "10px", padding: "5px 10px", background: "green", color: "white" }}
                >
                  Apply
                </button>
              )}
            </div>
          ))}
        </div>
      )}
 
      {user?.role === "admin" && (
        <div style={{ marginTop: "30px", padding: "15px", border: "1px solid gray", borderRadius: "5px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Add New Scholarship</h2>
          <form onSubmit={addScholarship}>
            <input type="text" name="name" placeholder="Scholarship Name" required style={{ marginBottom: "10px", padding: "5px", border: "1px solid gray" }} /><br />
            <input type="text" name="country" placeholder="Country" required style={{ marginBottom: "10px", padding: "5px", border: "1px solid gray" }} /><br />
            <input type="number" name="amount" placeholder="Amount" required style={{ marginBottom: "10px", padding: "5px", border: "1px solid gray" }} /><br />
            <input type="date" name="deadline" required style={{ marginBottom: "10px", padding: "5px", border: "1px solid gray" }} /><br />
            <button type="submit" style={{ padding: "5px 10px", background: "blue", color: "white" }}>
              Add Scholarship
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
