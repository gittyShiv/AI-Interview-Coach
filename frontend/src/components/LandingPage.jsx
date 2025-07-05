import React from "react";

export default function LandingPage({ onGenerate }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background:
        "radial-gradient(circle at 60% 10%, #283a24 0%, #181a1b 70%)"
    }}>
      <div style={{ textAlign: "center", marginBottom: "2em" }}>
        <img src="/logo.svg" alt="logo" style={{ height: 56, marginBottom: 18 }} />
        <h1>
          Practice job interview with AI <br />
          <span style={{ color: "var(--neon-green)" }}>get instant feedback</span>
        </h1>
        <div style={{ color: "var(--text-muted)", fontSize: "1.2em", margin: "1em 0 2em" }}>
          Simply generate interview and get instant feedback on your answers and expressions.
        </div>
        <button className="button-main" onClick={onGenerate} style={{ marginTop: 10 }}>
          Generate
        </button>
      </div>
      <div style={{
        display: "flex",
        gap: 28,
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        <div className="card" style={{ minWidth: 260, maxWidth: 320 }}>
          <b>Recommendations</b>
          <div style={{ color: "var(--text-muted)", marginTop: 10 }}>
            Get feedback on your interviews, see how well you did, and track your improvement over time.
          </div>
        </div>
        <div className="card" style={{ minWidth: 260, maxWidth: 320 }}>
          <b>Expressions</b>
          <div style={{ color: "var(--text-muted)", marginTop: 10 }}>
            See what your voice and face say about your feelings and learn how to improve.
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: 28, right: 38, display: "flex", gap: 36 }}>
        <a href="#features" style={{ color: "var(--text-muted)" }}>Features</a>
        <a href="#screen" style={{ color: "var(--text-muted)" }}>Screen candidates</a>
      </div>
    </div>
  );
}