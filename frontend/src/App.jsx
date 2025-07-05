import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import InterviewModal from "./components/InterviewModal";
import PreSessionChecklist from "./components/PreSessionChecklist";
import InterviewSession from "./components/InterviewSession";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [step, setStep] = useState("landing"); // landing | modal | checklist | session

  const startInterview = (session) => {
    setSessionData(session);
    setStep("checklist");
  };

  return (
    <>
      {step === "landing" && (
        <LandingPage onGenerate={() => setStep("modal")} />
      )}
      {step === "modal" && (
        <InterviewModal
          onClose={() => setStep("landing")}
          onSuccess={startInterview}
        />
      )}
      {step === "checklist" && (
        <PreSessionChecklist
          job={sessionData?.job}
          onStart={() => setStep("session")}
        />
      )}
      {step === "session" && (
        <InterviewSession session={sessionData} />
      )}
    </>
  );
}