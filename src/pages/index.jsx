import FlightForm from "../components/FlightForm";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Captain's Discretion Calculator</h1>
      <FlightForm />
    </main>
  );
}