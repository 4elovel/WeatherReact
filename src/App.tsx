import React from "react";
import Weather from "./components/Weather";
import Settings from "./components/Settings";

const App: React.FC = () => {
  return (
    <Settings>
      <h1>Weather App</h1>
      <Weather />
    </Settings>
  );
};

export default App;
