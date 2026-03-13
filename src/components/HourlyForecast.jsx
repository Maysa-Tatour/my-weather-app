import { useState } from "react";
import { weatherIcons } from "../services/icons";

export default function HourlyForecast({hourlyData,dailyData}){

    const [selectedDay,setSelectedDay]= useState(0);
     if(!hourlyData || !dailyData) return null;

     const weekdays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

     return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Hourly Forecast</h3>
                <select
                 className="bg-[#25223D] p-2 rounded-lg"
                 value={selectedDay}
                 onChange={(e)=>setSelectedDay(Number(e.target.value))}>
                    {dailyData.time.map((date,idx)=>{
                        const day=weekdays[new Date(date).getDay()];
                        return (
                            <option key={date} value={idx}>
                                {day}
                            </option>
                        );
                    })}
                 </select>
            </div>
            <div className="space-y-3 max-h-[520px] overflow-y-auto">
               {hourlyData.time
                .map((time,i)=>({time,i}))
                .filter(({time})=> {
                    const hourDate=new Date(time);
                    const selectedDate=new Date(dailyData.time[selectedDay]);
                    return (
                        hourDate.getDate()=== selectedDate.getDate() &&
                        hourDate.getMonth()===selectedDate.getMonth()
                    );
                })
                .map(({time,i})=>(
                    <div key={time}
                    className="flex justify-between items-center bg-[#2a2f5a] p-3 rounded-lg">
                        <span>{new Date(time).getHours()}:00</span>
                        <span>{weatherIcons[hourlyData.weathercode[i]]}</span>
                        <span>{Math.round(hourlyData.temperature_2m[i])}°</span>
                        </div>
                ))

               
               } 
            </div>
        </div>
     )
}