import loadingIcon from "../assets/icon-loading.svg";

export default function LoadingSkeleton(){
    return (
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
           {/*Left Side*/} 
           <div className="lg:col-span-2 space-y-6">
             {/*Main Weather Card */}
             <div className="bg-[#1a1f45] rounded-2xl h-[320px] flex items-center justify-center">
                <img src={loadingIcon} className="w-10 h-10 animate-spin"/>
             </div>
             {/*Info Boxes */}
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[...Array(4)].map((_,i)=>(
                    <div 
                     key={i}
                     className="bg-[#1a1f45] rounded-2xl h-[90px] animate-pulse"/>
                ))}
             </div>
             {/*Daily Forecast */}
             <div>
                <div className="h-6 w-40 bg-[#1a1f45] rounded mb-4 animate-pulse"></div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                    {[...Array(7).map((_,i)=>(
                        <div 
                         key={i}
                         className="bg-[#1a1f45 rounded-2xl h-[120px] animate-pulse" />
                    ))]}
                </div>
             </div>
           </div>
           {/*Right Side - Hourly */}
            <div className="bg-[#1a1f45] rounded-2xl p-6 space-y-4">
                <div className="h-6 w-32 bg-[#2a2f55] rounded animate-pulse"></div>
                {[...Array(8)].map((_,i)=>(
                    <div 
                    key={i}
                    className="bg-[#2a2f55] h-[50px] rounded-xl animate-pulse" />
                ))}
            </div>
        </div>
    )
}