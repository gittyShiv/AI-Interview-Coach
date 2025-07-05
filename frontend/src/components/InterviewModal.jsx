import React, { useState } from "react";
import axios from "axios";

export default function InterviewModal({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}/interview/start`,
        { name, job, email }
      );
      onSuccess(res.data);
    } catch (e) {
      setErr(e?.response?.data?.error || "Could not start interview.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h2>Generate interview</h2>
          <div style={{ color: "var(--text-muted)" }}>
            Type your name and the job title to practice the interview
          </div>
          <label style={{ marginTop: 18 }}>Your name</label>
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            required
            disabled={loading}
          />
          <label>Job title</label>
          <input
            value={job}
            onChange={e => setJob(e.target.value)}
            placeholder="e.g. Software Developer"
            required
            disabled={loading}
          />
          <label>Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="john@doe.com"
            type="email"
            required
            disabled={loading}
          />
          <button type="submit" className="button-main" style={{ width: "100%", marginTop: 18 }} disabled={loading}>
            {loading ? "Generating..." : "→ Generate interview session"}
          </button>
          {err && <div style={{ color: "#f66", marginTop: 10 }}>{err}</div>}
          <div style={{ fontSize: "0.95em", color: "var(--text-muted)", marginTop: 18 }}>
            By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </form>
        <button onClick={onClose} style={{
          background: "none", border: "none", color: "var(--text-muted)",
          position: "absolute", top: 12, right: 18, fontSize: 22, cursor: "pointer"
        }}>×</button>
      </div>
    </>
  );
}