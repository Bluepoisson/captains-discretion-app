import { useEffect, useState } from "react";

export default function FlightLog() {
  const [log, setLog] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("flightLog");
    if (stored) setLog(JSON.parse(stored));
  }, []);

  const clearLog = () => {
    localStorage.removeItem("flightLog");
    setLog([]);
  };

  return (
    <div style={{ marginTop: "3rem" }}>
      <h2>🗂️ Flight History</h2>
      {log.length === 0 ? (
        <p>No saved flights yet.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {log.map((item, index) => (
              <li key={index} style={{
                padding: "0.75rem",
                marginBottom: "0.5rem",
                border: "1px solid #ccc",
                borderLeft: `5px solid ${
                  item.status === "over" ? "#f44336" :
                  item.status === "discretion" ? "#ff9800" : "#4caf50"
                }`,
                background: "#fff"
              }}>
                <strong>{new Date(item.reportTime).toLocaleString()}</strong><br/>
                Duration: {item.flightDuration} | Delay: {item.delay || 0}m<br/>
                <span style={{ fontWeight: "bold" }}>
                  {item.status === "normal" && "✅ Normal"}
                  {item.status === "discretion" && "⚠️ Discretion"}
                  {item.status === "over" && "❌ Over Limit"}
                </span>
              </li>
            ))}
          </ul>
          <button onClick={clearLog}>Clear Log</button>
        </>
      )}
    </div>
  );
}