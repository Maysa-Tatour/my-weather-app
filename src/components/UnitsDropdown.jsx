import { useState , useEffect,useRef} from "react";
import iconUnits from "../assets/icon-units.svg";

export default function UnitsDropdown({units,setUnits}){
const [open,setOpen]=useState(false);
const dropdownRef=useRef(null);
      useEffect(()=>{
         const handleClickOutside=(event)=>{
          if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
            setOpen(false);
          }
         };
         document.addEventListener("mousedown",handleClickOutside);
         return ()=>{
          document.removeEventListener("mousedown",handleClickOutside);
         };
      },[]);
const toggleSystem=()=>{
    const newSystem=units.system==="metric"? "imperial" : "metric";

    const newUnits=
      newSystem === "metric"?
      {
        system:"metric",
        temperature:"celsius",
        windspeed:"kmh",
        precipitation:"mm"
      }
   :{
    system:"imperial",
    temperature:"fahrenheit",
    windspeed:"mph",
    precipitation:"inch"
   };
 setUnits(newUnits);
};
return (
    <div className="relative">
        {/*button open menu */}
        <button className="flex items-center gap-2 bg-[#1a1f3c] text-white px-4 py-2 rounded-xl border border-white/10 hover:bg-[#232861] transition " 
        onClick={()=> setOpen(!open)}
        >
         <img src={iconUnits} alt="units" className="w-4 h-4 opacity-70" />
         <span>Units</span>
        </button>
    {open && (<div ref={dropdownRef} className="absolute z-[999] right-0 mt-3 w-72 bg-[#1a1f3c]
                              rounded-2xl border border-white/10 shadow-2xl text-white 
                             ">
     <div className="px-4 py-3 hover:bg-[#232861] flex justify-between cursor-pointer">
        <span onClick={toggleSystem}>Switch to Imperial</span>
         {units.system==="imperial" && "✔️"}
        </div>
       

        
  <p className="px-4 pt-4 pb-2 text-sm text-[#a5aad4]">Temperature</p>
  <div className="px-4 py-3 hover:bg-[#232861] flex justify-between">
    Celsius (°C) 
     {units.temperature === "celsius" && "✔️"}
  </div>
  <div className="px-4 py-3 hover:bg-[#232861] text-[#a5aad4]">
    Fahrenheit (°F)
     {units.temperature === "fahrenheit" && "✔️"}
  </div>
  <div className="h-px bg-white/10 mx-4"></div>
  <p className="px-4 pt-4 pb-2 text-sm text-[#a5aad4]">Wind Speed</p>
  <div className="px-4 py-3 hover:bg-[#232861] flex justify-between">
    km/h 
    { units.windspeed === "kmh" && "✔️"}
  </div>
  <div className="px-4 py-3 hover:bg-[#232861] text-[#a5aad4]">
    mph
    { units.windspeed === "mph" && "✔️"}
  </div>
  <div className="h-px bg-white/10 mx-4"></div>
   <p className="px-4 pt-4 pb-2 text-sm text-[#a5aad4]">Precipitation</p>
  <div className="px-4 py-3 hover:bg-[#232861] flex justify-between">
    mm 
    { units.precipitation === "mm" && "✔️"}
  </div>
  <div className="px-4 py-3 hover:bg-[#232861] text-[#a5aad4]">
    inch
    { units.precipitation === "inch" && "✔️"}
  </div>                           
                                </div>

    )}  
        
    </div>
)
}