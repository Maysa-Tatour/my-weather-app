export const getWeatherByCoords = async (lat, lon, unit) => {
  const isMetric = unit === "metric";
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&temperature_unit=${isMetric ? "celsius" : "fahrenheit"}&windspeed_unit=${isMetric ? "kmh" : "mph"}&precipitation_unit=${isMetric ? "mm" : "inch"}&timezone=auto`
  );

  if (!res.ok) throw new Error("Failed to fetch weather");
  return res.json();
};