import React from "react";
import HeadsetIcon from "@mui/icons-material/Headset";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";

export default function PreSessionChecklist({ job, onStart }) {
  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      minHeight: "100vh", background: "var(--bg-main)"
    }}>
      <div className="card" style={{
        textAlign: "center", minWidth: 400, maxWidth: 480, padding: "2em 2.5em"
      }}>
        <h2>Before you start the session</h2>
        <div style={{
          display: "flex", justifyContent: "center", gap: 22,
          margin: "1.4em 0"
        }}>
          <div>
            <HeadsetIcon style={{ fontSize: 44, color: "var(--neon-green)" }} /><br />
            <div style={{ fontSize: 15, marginTop: 6 }}>Make sure you are in quiet environment</div>
          </div>
          <div>
            <VideocamIcon style={{ fontSize: 44, color: "var(--neon-green)" }} /><br />
            <div style={{ fontSize: 15, marginTop: 6 }}>Microphone and camera is required</div>
          </div>
          <div>
            <MicIcon style={{ fontSize: 44, color: "var(--neon-green)" }} /><br />
            <div style={{ fontSize: 15, marginTop: 6 }}>During conversation hold space bar</div>
          </div>
        </div>
        <div className="card" style={{
          background: "#202226", color: "#fff", minWidth: 180, margin: "1.5em auto 1.2em", fontWeight: 500
        }}>
          <div style={{ fontSize: 18 }}>{job || "software developer"}</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Demo</div>
        </div>
        <button className="button-main" style={{ width: 130 }} onClick={onStart}>Start</button>
      </div>
    </div>
  );
}