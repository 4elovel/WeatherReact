import { useState } from "react";
import { WeatherData } from "../types";

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeather = async (city: string, country?: string) => {
    const apiKey = "bd5e378503939ddaee76f12ad7a97608";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}${
      country ? "," + country : ""
    }&units=metric&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const weather: WeatherData = {
      temp: data.main.temp,
      description: data.weather[0].description,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    };

    setWeatherData(weather);
  };

  return { weatherData, fetchWeather };
};
