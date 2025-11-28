'use client';

import { useState, useEffect } from "react";
import { ResizeBoth } from "./resize-icon";
import { cn } from "../lib/utils/cn";

export default function WeatherTable({ data = {maxTemperatures: {}, minTemperatures: {}, weatherCodes: {}, days: [], weatherDescriptions: {}} }: { data: {maxTemperatures?: Record<string, number>, minTemperatures?: Record<string, number>, weatherCodes?: Record<string, number>, days: Array<string>, weatherDescriptions: Record<string, string>} }) {
    const [open, setOpen] = useState(true);

   const renderWeatherRows = (data: {maxTemperatures: Record<string, number>, minTemperatures: Record<string, number>, weatherCodes: Record<string, number>, days: Array<string>, weatherDescriptions: Record<string, string>}) => {
        let numRows = Object.keys(data?.maxTemperatures)?.length || 0
        data.days[0] = "Today" //Instead of listing the actual day, just use today for first value
        
        return (
            Array.from({length: numRows}).map((_, index) => 
               <tr key={'row-' + index} className="flex flex-row w-300 justify-between h-10">
                <td className="w-1/3 text-center">{data.days[index as number]}</td>
                <td className="w-1/3 text-center">{data.minTemperatures[index as number].toFixed(0)} F</td>
                <td className="w-1/3 text-center">{data.maxTemperatures[index as number].toFixed(0)} F</td>  
                <td className="w-1/3 text-center">{data.weatherDescriptions[index as number]}</td>                
               </tr>
            )
        )

    }

    return (
        <div className={cn(
            "rounded-3xl overflow-hidden shadow-black shadow-lg opacity-90",
            {
                'h-auto w-auto': open,
                'h-15 w-auto': !open
            }

        )}>
            <table className="h-100 w-300 bg-blue-900 text-white">
                <caption className="w-300 text-3xl text-white flex flex-row justify-between pt-2 pl-10 pb-3 border-b-2">
                    Daily Forecast
                    <ResizeBoth className="h-8 w-auto hover:scale-150 hover:cursor-pointer pr-5" onClick={() => setOpen(!open)} />
                </caption>
                <thead className="text-xl flex flex-row w-300 pt-5">
                    <tr className="flex flex-row w-300 w-300 justify-between">
                        <th className="w-1/3 underline">Day</th>                        
                        <th className="w-1/3 underline">Low</th>
                        <th className="w-1/3 underline">High</th>
                        <th className="w-1/3 underline">Weather</th>
                    </tr>
                </thead>
                <tbody className="w-300">
                     {renderWeatherRows(data)}
                </tbody>
            </table>
        </div>
    )
}