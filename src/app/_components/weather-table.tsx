'use client'

import { useState, useEffect } from "react";
import { ResizeBoth } from "./resize-icon";
import { cn } from "../lib/utils/cn";

export default function WeatherTable({ data = {maxTemperature: 1, minTemperature: 1, weatherCode: 9000} }: { data: {maxTemperature?: number, minTemperature?: number, weatherCode?: number} }) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        console.log(data)
    }, [data])

    const renderTableRow = (row: {maxTemperature: number, minTemperature: number, weatherCode: number}) => {
        return (
        <tr>
            <td>{row.maxTemperature}</td>
            <td>{row.minTemperature}</td>
            <td>{row.weatherCode}</td>
        </tr>
        )
    }

    return (
        <div className={cn(
            "rounded-3xl overflow-hidden",
            {
                'h-auto w-auto': open,
                'h-15 w-auto': !open
            }

        )}>
            <table className="h-100 w-300 bg-black text-white ">
                <caption className="bg-black text-3xl text-white flex flex-row justify-between pt-2 pl-10 pr-5">
                    Weekly Weather Forecast
                    <ResizeBoth className="hover:scale-150 hover:cursor-pointer" onClick={() => setOpen(!open)} />
                </caption>
                <thead className="flex flex-row pl-5 pr-5 pt-5">
                    <tr className="flex flex-row w-full justify-between">
                        <th>High</th>
                        <th>Low</th>
                    </tr>
                </thead>
                <tbody>
                     
                </tbody>
            </table>
        </div>
    )
}