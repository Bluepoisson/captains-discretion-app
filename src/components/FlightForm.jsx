import React, { useState } from "react";

function FlightForm({ onResult }) {
  const [reportTime, setReportTime] = useState("");
  const [scheduledFlightTime, setScheduledFlightTime] = useState("");
  const [delay, setDelay] = useState("");
  const [timezoneDifference, setTimezoneDifference] = useState("");

  const calculate = () => {
    if (!reportTime || !scheduledFlightTime) {
      alert("Please fill in at least Report Time and Scheduled Flight Time.");
      return;
    }

    const report = new Date(reportTime);
    const flightHours = parseFloat(scheduledFlightTime) || 0;
    const delayHours = parseFloat(delay) || 0;
    const tzOffset = parseFloat(timezoneDifference) || 0;

    // Adjust for timezone difference
    report.setHours(report.getHours() + tzOffset);

    const basicFDP = 13; // Example: base FDP limit in hours (adjust to your needs)
    const maxFDP = basicFDP; 
    const withDiscretion = basicFDP + 2; // example 2 hours discretion

    const totalDutyHours = flightHours + delayHours;
    const endsAt = new Date(report.getTime() + totalDutyHours * 60 * 60 * 1000);

    const isInDiscretion = totalDutyHours > maxFDP;
    const isOverLimit = totalDutyHours > withDiscretion;

    const result = {
      maxFDP,
      withDiscretion,
      endsAt,
      isInDiscretion,
      isOverLimit
    };

    // Save to localStorage
    const storedLog = JSON.parse(localStorage.getItem("flightLog")) || [];
    const newEntry = {
      id: Date.now(),
      reportTime,
      scheduledFlightTime,
      delay,
      timezoneDifference,
      status: isOverLimit ? "Over Limit" : isInDiscretion ? "Discretion" : "Normal"
    };
    localStorage.setItem("flightLog", JSON.stringify([newEntry, ...storedLog]));

    onResult(result);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label>🕐 Report Time (local):</label>
        <input
          type="datetime-local"
          value={reportTime}
          onChange={(e) => setReportTime(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div>
        <label>✈️ Scheduled Flight Time (hrs):</label>
        <input
          type="number"
          value={scheduledFlightTime}
          onChange={(e) => setScheduledFlightTime(e.target.value)}
          style={inputStyle}
          min="0"
          step="0.1"
        />
      </div>

      <div>
        <label>⏳ Delay (hrs):</label>
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
          style={inputStyle}
          min="0"
          step="0.1"
        />
      </div>

      <div>
        <label>🌍 Timezone Difference (hrs):</label>
        <input
          type="number"
          value={timezoneDifference}
          onChange={(e) => setTimezoneDifference(e.target.value)}
          style={inputStyle}
          step="1"
        />
      </div>

      <button onClick={calculate} style={buttonStyle}>
        Calculate FDP
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  marginTop: "0.25rem",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  marginTop: "1rem",
  padding: "0.75rem",
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "1rem"
};

export default FlightForm;
