import React, { useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  useEffect(() => {
    document.title = "Rainbow Forecast";
  });

  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
