import { weatherIcons } from "../services/icons";

export default function ForeCastCard({day, maxTemp,minTemp, code}){
return (
   
      <div className="bg-[#141a3a] hover:bg-[#1c2145]  transition rounded-xl p-4 text-center flex flex-col items-center gap-1">
       <p className="text-sm font-medium text-white/70">{day}</p>
       <div>{weatherIcons[code] || "❓"}</div>
       <div className="flex gap-2 text-sm px-0">
         <span className="font-semibold">{Math.round(maxTemp)}°</span>
         <span className="text-white/50">
          {Math.round(minTemp)}°
         </span>
       </div>
    </div>
  
);
}