import React, { useEffect, useRef, useState } from "react";
import Timer from "./Timer";
import VoiceControls from "./VoiceControls";
import axios from "axios";

export default function InterviewSession({ session }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [timeUp, setTimeUp] = useState(false);

  // Get first question on mount
  useEffect(() => {
    async function getFirstQ() {
      setLoading(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}/interview/question`,
          { sessionId: session.id }
        );
        setQuestion(res.data.question);
        // Speak the question
        speak(res.data.question);
      } catch {
        setQuestion("Sorry, couldn't get a question.");
      } finally {
        setLoading(false);
      }
    }
    getFirstQ();
  }, [session.id]);

  // Voice: function to speak text
  function speak(text) {
    if (window.speechSynthesis) {
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.lang = "en-US";
      window.speechSynthesis.speak(utter);
    }
  }

  // Handle answer submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}/interview/answer`,
        { sessionId: session.id, answer }
      );
      setFeedback(res.data.feedback);
      setAnswer("");
      if (res.data.nextQuestion) {
        setTimeout(() => {
          setQuestion(res.data.nextQuestion);
          speak(res.data.nextQuestion);
          setFeedback(null);
        }, 2000);
      }
    } catch {
      setFeedback("Sorry, couldn't get feedback.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg-main)", color: "#fff",
      display: "flex", flexDirection: "column", alignItems: "center"
    }}>
      <div style={{ position: "absolute", top: 35, right: 48, fontWeight: 500, fontSize: 19 }}>
        Are you ready to start?
      </div>
      <div style={{
        marginTop: "4em", width: 600, maxWidth: "98vw", background: "#232528",
        borderRadius: 22, padding: "2.2em 2em", boxShadow: "var(--shadow)"
      }}>
        <Timer seconds={15 * 60} onTimeUp={() => setTimeUp(true)} />
        <div style={{ minHeight: 55, fontSize: 23, fontWeight: 600, margin: "1.5em 0" }}>
          {loading ? <span style={{ color: "var(--neon-green)" }}>Thinking...</span> : question}
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10 }}>
          <input
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            disabled={loading || timeUp}
            placeholder="Type or use mic to answer"
            id="answer-input"
            style={{ flex: 1, fontSize: 17 }}
          />
              <VoiceControls
                onResult={text => setAnswer(prev => (prev ? prev + " " + text : text))}
                disabled={loading || timeUp}
              />
          <button className="button-main" disabled={loading || timeUp || !answer}>Send</button>
        </form>
        {feedback && (
          <div className="card" style={{ marginTop: 24 }}>
            <b>Feedback</b>
            <div style={{ marginTop: 10 }}>{feedback}</div>
          </div>
        )}
        {timeUp && (
          <div style={{ color: "#f66", fontWeight: 600, fontSize: 22, marginTop: 24 }}>
            Time's up! Interview ended.
          </div>
        )}
      </div>
    </div>

  );
}

