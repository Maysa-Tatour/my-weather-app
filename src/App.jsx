import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForeCastCard from "./components/ForeCastCard";
import UnitsDropdown from "./components/UnitsDropdown";
import HourlyForecast from "./components/HourlyForecast";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { useWeather } from "./services/useWeather";
import { useEffect, useState } from "react";
import logo from "./assets/logo.svg";

export default function App() {
  const { weather, forecast, fetchWeather, hourly, loading, error } = useWeather();

  const [selectedCity, setSelectedCity] = useState({
    name: "Berlin",
    country: "Germany",
    latitude: 52.52,
    longitude: 13.41,
  });

  const [units, setUnits] = useState({
    system: "metric",
    temperature: "celsius",
    windspeed: "kmh",
    precipitation: "mm",
  });

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity.latitude, selectedCity.longitude, units.system);
    }
  }, [units.system, selectedCity?.latitude, selectedCity?.longitude]);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-[#070b2d] text-white p-6 lg:p-10 overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <img src={logo} className="h-10 w-auto" />
          <UnitsDropdown units={units} setUnits={setUnits} />
        </div>

        {/* Title */}
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-8">
          How’s the sky looking today?
        </h2>

        {/* Search */}
        <SearchBar onSelectCity={handleSelectCity} />

        {error && <p className="text-red-500">{error}</p>}

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 w-full">

            {selectedCity && weather ? (
              <>
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-6">
                  <WeatherCard weather={weather} units={units} city={selectedCity} />

                  {/* DAILY FORECAST */}
                  {forecast?.time && (
                    <div>
                      <h3 className="text-xl mb-4">Daily forecast</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4 w-full">
                        {forecast.time.map((date, idx) => {
                          const day = weekdays[new Date(date).getDay()];
                          return (
                            <ForeCastCard
                              key={date}
                              day={day}
                              maxTemp={forecast.temperature_2m_max[idx]}
                              minTemp={forecast.temperature_2m_min[idx]}
                              code={forecast.weathercode[idx]}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT SIDE - HOURLY */}
                <div className="grid grid-cols-1 bg-[#1a1f45] rounded-2xl p-6 w-full">
                  <HourlyForecast hourlyData={hourly} dailyData={forecast} />
                </div>
              </>
            ) : (
              <p className="text-center text-xl mt-6">
                No search result found!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}