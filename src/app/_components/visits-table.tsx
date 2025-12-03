'use client'

import { useState, useEffect } from "react";
// import { ResizeBoth } from "./resize-icon";
import Link from "next/link";
import { cn } from "../lib/utils/cn";

export default function VisitsTable({ records = [] }: { records: Array<any> }) {
    const [open, setOpen] = useState(true);
    const [isMobile, setIsMobile] = useState<boolean>()

    useEffect(() => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }, [])

    const renderDesktopWeatherRows = (records: Array<Record<string, any>>) => {
        return records.map((record, index) => 
            <tr key={'row-' + index} className="flex flex-row w-screen justify-between h-10">
                <td className="w-1/5 text-center">{record.id}</td>
                <td className="w-1/5 text-center">{record.weather_description}</td>
                <td className="w-1/5 text-center">{record.city}</td>
                <td className="w-1/5 text-center">{record.country}</td>
                <td className="w-1/5 text-center">{record.current_temp}</td>
            </tr>
        )
    }

    const renderDesktopTable = () => {
        return (
            <table className="h-screen w-screen bg-blue-900 text-white">
                <caption className="w-screen text-3xl text-white flex flex-row justify-between pt-2 pl-10 pb-3 border-b-2">
                    Visit Archive
                    {/* <ResizeBoth className="h-8 w-auto hover:scale-150 hover:cursor-pointer pr-5" onClick={() => setOpen(!open)} /> */}
                    <Link className="bg-black hover:scale-120 hover:cursor-pointer pl-5 pr-5 mr-5 rounded-3xl" href="/dashboard">Back</Link>
                </caption>
                <thead className="text-xl flex flex-row w-screen pt-5">
                    <tr className="flex flex-row w-screen justify-between">
                        <th className="w-1/5 underline">ID</th>
                        <th className="w-1/5 underline">Weather</th>
                        <th className="w-1/5 underline">City</th>
                        <th className="w-1/5 underline">Country</th>
                        <th className="w-1/5 underline">Temp During Visit</th>
                    </tr>
                </thead>
                <tbody className="w-300">
                    {renderDesktopWeatherRows(records)}
                </tbody>
            </table>
        )
    }

    const renderMobileTableRows = () => {
        return records.map((record, index) => 
            <tr key={'row-' + index} className="flex flex-row w-screen justify-start pt-5 pr-5">
                <td className="w-1/5 text-center">{record.id}</td>
                <td className="w-1/5 text-center">{record.weather_description}</td>
                <td className="w-1/5 text-center">{record.city}</td>
                <td className="w-1/5 text-center">{record.country}</td>
                <td className="w-1/5 text-center">{record.current_temp}</td>
            </tr>
        )
    }

    const renderMobileTable = () => {
        return (
            <table className="h-screen w-screen bg-blue-900 text-white text-sm">
                <caption className="bg-blue-900 w-screen border-b-2 ">
                    Daily Forecast
                    <Link className="bg-black hover:scale-120 hover:cursor-pointer pl-5 pr-5 mr-5 rounded-3xl" href="/dashboard">Back</Link>
                    </caption>
                <tbody>
                    <tr className="w-full flex flex-row justify-start pt-5 pr-5">
                       <th className="w-1/5 text-center underline">ID</th>
                        <th className="w-1/5 text-center underline">Weather</th>
                        <th className="w-1/5 text-center underline">City</th>
                        <th className="w-1/5 text-center underline">Country</th>
                        <th className="w-1/5 text-center underline">Temp During Visit</th>
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