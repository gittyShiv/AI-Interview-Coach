import React, { useEffect, useState } from "react";

export default function Timer({ seconds, onTimeUp }) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    if (time <= 0) return onTimeUp && onTimeUp();
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time]);

  const min = Math.floor(time / 60);
  const sec = time % 60;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 9,
      color: "var(--text-muted)", fontSize: 18
    }}>
      <span style={{ fontSize: 21, color: "#6ac28d" }}>⏰</span>
      {min}:{sec < 10 ? "0" : ""}{sec} left
    </div>
  );
}