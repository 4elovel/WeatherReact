import React, { useState } from "react";
import { useWeather } from "../hooks/useWeather";

const Weather: React.FC = () => {
  const { weatherData, fetchWeather } = useWeather();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city, country);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
        />
        <button style={{ marginLeft: 10 }} type="submit">
          Get Weather
        </button>
        <button
          style={{ marginLeft: 10 }}
          onClick={() => {
            const savedSettings = JSON.parse(
              localStorage.getItem("settings") || "{}"
            );
            if (savedSettings) {
              setCity(savedSettings.favoriteCity);
            }
          }}
        >
          favorite city weather{" "}
        </button>
      </form>

      {weatherData && (
        <div>
          <h3>Temperature: {weatherData.temp}°C</h3>
          <p>Description: {weatherData.description}</p>
          <p>
            Sunrise: {new Date(weatherData.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>
            Sunset: {new Date(weatherData.sunset * 1000).toLocaleTimeString()}
          </p>
          {new Date().getTime() / 1000 > weatherData.sunrise &&
          new Date().getTime() / 1000 < weatherData.sunset ? (
            <img src="/sun.png" alt="Sun" width={70} />
          ) : (
            <img src="/moon.png" alt="Moon" width={70} />
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
