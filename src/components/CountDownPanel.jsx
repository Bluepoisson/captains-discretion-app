import { useEffect, useState } from "react";

export default function CountdownPanel({ results }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (results) {
      setVisible(false);
      setTimeout(() => setVisible(true), 50);
    }
  }, [results]);

  if (!results) return null;

  const { maxFDP, withDiscretion, endsAt, isInDiscretion, isOverLimit } = results;

  const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let statusColor = "#4caf50";
  if (isInDiscretion) statusColor = "#ff9800";
  if (isOverLimit) statusColor = "#f44336";

  return (
    <div style={{
      marginTop: "2rem",
      padding: "1rem",
      border: "2px solid",
      borderColor: statusColor,
      borderRadius: "8px",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.5s ease-in-out"
    }}>
      <h2 style={{ color: statusColor }}>
        {isOverLimit ? "❌ Over FDP Limit" :
         isInDiscretion ? "⚠️ Captain's Discretion Required" :
         "✅ Within FDP Limits"}
      </h2>
      <p>Max FDP: {maxFDP} hrs</p>
      <p>With Discretion: {withDiscretion} hrs</p>
      <p>Duty Ends At: {formatTime(endsAt)}</p>
    </div>
  );
}