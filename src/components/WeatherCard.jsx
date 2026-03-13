import { weatherIcons } from "../services/icons";

export default function WeatherCard({weather,units,city}){
    console.log(weather);
    return (
        <div className="w-full flex flex-col gap-6">
        <div className=" bg-[url('/src/assets/bg-today-small.svg')]
sm:bg-[url('/src/assets/bg-today-large.svg')] bg-no-repeat bg-cover 
       p-4 bg-center flex flex-col items-center text-center justify-center 
sm:flex-row sm:justify-between sm:items-center sm:text-left gap-4 min-h-[320px] rounded-2xl overflow-hidden  ">
         <div>
            <h2 className="text-2xl font-semibold">
                {city?.name},{city?.country}
            </h2>
            <p className="text-white/70 mt-2">
            {new Date().toLocaleDateString("en-US",{
                weekday:"long",
                month:"short",
                day:"numeric",
                year:"numeric",
            })}
            </p>
          </div>
          <div className="flex items-center justify-center mt-4 sm:gap-6">
            <span className="text-5xl sm:text-7xl">
                {weatherIcons[weather.weathercode] || "?"}
            </span>
            <span className=" text-5xl sm:text-7xl font-bold ">
                {Math.round(weather.temperature)}°
                {units.system==="metric" ? "C":"F"}
            </span>
          </div>
        </div>
       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
         <InfoBox 
          label="Feels Like"
          value={Math.round(weather.temperature)}
          unit={`°${units.system==="metric"? "C" : "F"}`} />
          <InfoBox
           label="Humidity"
           value={weather.relativehumidity || 46}
           unit="%" />
           <InfoBox 
            label="wind"
            value={weather.windspeed}
            unit={units.system==="metric" ? "km/h" : "mph"}
            />
            <InfoBox 
             label="Precipitation"
             value={weather.precipitation || 0}
             unit={units.system==="metric"? "mm" : "in"}
             />
        </div> 
       </div>
      
    );
       
}
  function InfoBox ({label,value,unit}){
        return (
            <div className="bg-white/5 rounded-2xl p-4 text-white">
                <p className="text-sm text-white/60">{label}</p>
                <p className="text-2xl font-semibold mt-2">
                    {value} {unit}
                </p>
            </div>
        );}