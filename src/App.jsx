import React from "react";
import FlightForm from "./components/FlightForm";
import CountdownPanel from "./components/CountdownPanel";
import FlightLog from "./components/FlightLog";

function App() {
  const [results, setResults] = React.useState(null);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Captain's Discretion Calculator</h1>
      <FlightForm onResult={setResults} />
      <CountdownPanel results={results} />
      <FlightLog />
    </div>
  );
}

export default App;
