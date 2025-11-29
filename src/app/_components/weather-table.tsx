'use client'

import { useState, useEffect } from "react";
import { ResizeBoth } from "./resize-icon";
import { cn } from "../lib/utils/cn";

export default function WeatherTable({ data = { maxTemperatures: {}, minTemperatures: {}, weatherCodes: {}, days: [], weatherDescriptions: {} } }: { data: { maxTemperatures: Record<string, number>, minTemperatures: Record<string, number>, weatherCodes: Record<string, number>, days: Array<string>, weatherDescriptions: Record<string, string> } }) {
    const [open, setOpen] = useState(true);
    const [isMobile, setIsMobile] = useState<boolean>()

    useEffect(() => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }, [])

    const renderDesktopWeatherRows = (data: { maxTemperatures: Record<string, number>, minTemperatures: Record<string, number>, weatherCodes: Record<string, number>, days: Array<string>, weatherDescriptions: Record<string, string> }) => {
        let numRows = Object.keys(data.maxTemperatures).length || 0
        data.days[0] = "Today" //Instead of listing the actual day, just use today for first value

        return (
            Array.from({ length: numRows }).map((_, index) =>
                <tr key={'row-' + index} className="flex flex-row w-300 justify-between h-10">
                    <td className="w-1/3 text-center">{data.days[index as number]}</td>
                    <td className="w-1/3 text-center">{data.minTemperatures[index as number].toFixed(0)} F</td>
                    <td className="w-1/3 text-center">{data.maxTemperatures[index as number].toFixed(0)} F</td>
                    <td className="w-1/3 text-center">{data.weatherDescriptions[index as number]}</td>
                </tr>
            )
        )

    }

    const renderDesktopTable = () => {
        return (
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
                    {renderDesktopWeatherRows(data)}
                </tbody>
            </table>
        )
    }

    const renderMobileTableRows = () => {
        let numRows = Object.keys(data.maxTemperatures).length || 0
        data.days[0] = "Today" //Instead of listing the actual day, just use today for first value
        return (
            <>
                {
                    Array.from({ length: numRows }).map((_, index) =>
                        <tr key={`row-${index}`} className="w-full flex flex-row justify-start pt-5 pr-5">
                            <td className="w-1/4 text-center">{data.days[index as number]}</td>
                            <td className="w-1/4 text-center">{data.minTemperatures[index as number].toFixed(0)} F</td>
                            <td className="w-1/4 text-center">{data.maxTemperatures[index as number].toFixed(0)} F</td>
                            <td className="w-1/4 text-center">{data.weatherDescriptions[index as number]}</td>
                        </tr>
                    )
                }

            </>
        )
    }

    const renderMobileTable = () => {
        return (
            <table className="h-100 w-100 bg-blue-900 text-white text-sm">
                <caption className="bg-blue-900">Daily Forecast</caption>
                <tbody>
                    <tr className="w-full flex flex-row justify-start pt-5 pr-5">
                        <th className="w-1/4 text-center underline">Day</th>
                        <th className="w-1/4 text-center underline">Low</th>
                        <th className="w-1/4 text-center underline">High</th>
                        <th className="w-1/4 text-center underline">Weather</th>
                    </tr>
                    {renderMobileTableRows()}
                </tbody>
            </table>
        )
    }

    return (
        <div className={cn(
            "rounded-3xl shadow-black shadow-lg opacity-90 overflow-y-auto overflow-x-clip",
            {
                'h-70 lg:h-auto w-auto': open,
                'h-15 w-auto': !open
            }

        )}>
            {isMobile ? renderMobileTable() : renderDesktopTable()}
        </div>
    )
}