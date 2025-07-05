import React, { useRef, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";

export default function VoiceControls({ onResult, disabled }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      // Append transcript to input (do not overwrite)
      onResult(prev => (prev ? prev + " " + transcript : transcript));
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setListening(false);
  };

  return (
    <button
      type="button"
      onClick={listening ? stopListening : startListening}
      style={{
        background: listening ? "var(--neon-green)" : "#222",
        color: listening ? "#181a1b" : "#fff",
        border: "none",
        borderRadius: "50%",
        width: 44,
        height: 44,
        marginRight: 9,
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: 23,
        outline: "none",
        boxShadow: "var(--shadow)"
      }}
      disabled={disabled}
      title="Speak your answer"
    >
      <MicIcon />
    </button>
  );
}