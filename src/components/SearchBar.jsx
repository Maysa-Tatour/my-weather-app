import{useState,useEffect} from "react";
import loadingIcon from "../assets/icon-loading.svg";
export default function SearchBar({onSelectCity}){
    const [input,setInput]=useState("");
    const [suggestions,setSuggestions]=useState([]);
    const [loading,setLoading] = useState(false);
    const [showList,setShowList]=useState(false);
    const [noResults,setNoResults] = useState(false);
    const [emptySearch,setEmptySearch]=useState(false);

    useEffect(()=> {
        if(!input) { 
         setSuggestions([]);
         setNoResults(false);
         return;
        }
     
        const timer = setTimeout(()=> {
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=5`)
            .then((res)=> res.json())
            .then((data)=>{
               const results=data.results || [];
               setSuggestions(results);
               setNoResults(results.length===0);
               setLoading(false);
            })
           ;
           
          
        },500);
        setLoading(true);
        return () =>clearTimeout(timer);
    },[input]);
    const handleSearch=()=>{
      if(!input.trim()){
         setEmptySearch(true);
         setShowList(true);
         return;
      }
      setEmptySearch(false);
      fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=1`)
    .then((res) => res.json())
    .then((data) => {
      const results = data.results || [];
      if (results.length > 0) {
        const city = results[0];
        setInput(`${city.name}, ${city.country}`);
        onSelectCity(city); 
        setSuggestions([]);
        setNoResults(false);
      } else {
        onSelectCity(null);
        setNoResults(true);
      }
    });
    };
    return (
        
        <div className="flex flex-col sm:flex-row gap-3 mb-6 mx-auto max-w-xl">
        <div className="relative w-full max-w-md">
          <span className="absolute flex items-center inset-y-0 left-3 text-gray-400">🔍</span>
          <input 
           type="text"
           value={input}
           
           onChange={(e)=>{  const value = e.target.value;

  setInput(value);
  setShowList(true);

  if (value.trim() !== "") {
    setEmptySearch(false);   
  }

  if (value.trim() === "") {
    setSuggestions([]);    
  }
            }}
           placeholder="Search for a place..."
           className=" w-full flex-1 items-center bg-[#25253f]  pl-10 py-2 px-6 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
           {loading && <div className="absolute top-full left-0 bg-[#25253f] p-3 rounded-xl mt-0.5 w-full flex items-center gap-2 text-gray-300">
              <img src={loadingIcon} className="animate-spin"/>
               Search in progress 
              </div>}
           {showList && (
           
            <ul className="absolute top-full left-0 w-full text-white bg-[#25253F] shadow-lg rounded-xl mt-1 max-h-52 overflow-auto z-50">
                {emptySearch && (
               <>
                  <li className="px-4 py-2 text-gray-400">No city</li>
                   <li className="px-4 py-2 text-gray-400">No city</li>
                    <li className="px-4 py-2 text-gray-400">No city</li>
               </>
            )}
               {!emptySearch && suggestions.map((city)=> (
                <li
                 key={city.id}
                 onClick={()=>{
                  setInput(`${city.name},${city.country}`);
                  setShowList(false);
               
                  setSuggestions([]);
                 }}
                 
                 className="px-4 py-2 cursor-pointer hover:bg-[#2F2F49]">
                    {city.name} , {city.country}
                 </li>
                 
               ))}  
            </ul>
           )}
           
           </div>
           
           <button className="bg-indigo-600 px-6 py-2 rounded-xl hover:bg-indigo-500"
                   onClick={handleSearch}>Search</button>
          </div>
    );
}