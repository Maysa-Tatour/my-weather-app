import {useState} from 'react';
import { getWeatherByCoords } from './weatherApi';

export const useWeather = () => {
    const [weather,setWeather] = useState(null);
    const [forecast,setForecast] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hourly,setHourly] = useState(null);

    const fetchWeather = async (lan,lon,system) => {

        try {
            setLoading(true);
            await new Promise(resolve=>setTimeout(resolve,800));
            setError(null);
            const data = await getWeatherByCoords(lan,lon,system);
            setWeather(data.current_weather);
            setForecast(data.daily);
            setHourly(data.hourly);
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false)
        }

    };
    return {weather,hourly,forecast,fetchWeather,loading,error}
}