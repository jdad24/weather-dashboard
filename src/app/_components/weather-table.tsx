'use client';

import { useState, useEffect } from "react";
import { ResizeBoth } from "./resize-icon";
import { cn } from "../lib/utils/cn";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// export default function WeatherTable({ data = {maxTemperature: [], minTemperature: [], weatherCode: []} }: { data: {maxTemperature?: Array<number>, minTemperature?: Array<number>, weatherCode?: Array<number>} }) {
//   const [open, setOpen] = useState(true);

//     useEffect(() => {
//         console.log(data)

//         renderWeatherRows(data)
//     }, [data])

//     const renderWeatherRows = (data: {maxTemperature?: any, minTemperature?: any, weatherCode?: any}) => {
//         let numRows = Object.keys(data?.maxTemperature)?.length || 0
        
//         return (
//             Array.from({length: numRows}).map((_, index) => 
//                <TableRow
//                key={'row-'+ index}
//                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                >
//                 <TableCell component="th" scope="row">{data.maxTemperature[index as number].toFixed(0)}</TableCell>
//                 <TableCell>{data.minTemperature[index as number].toFixed(0)}</TableCell>
//                </TableRow>
//             )
//         )

//     }
  
//     return (
//     <TableContainer sx={{height: 400, width: 1200, borderRadius: 5}} component={Paper}>
//         <div className="flex flex-row float-right pt-1 pr-4">
//             <ResizeBoth className="h-5 w-auto flex flex-row w-full hover:scale-150 hover:cursor-pointer" onClick={() => setOpen(!open)} />
//         </div>        
//       <Table sx={{ height: 400, width: 1200 }} aria-label="weather table">
//         <TableHead>
//           <TableRow>
//             <TableCell>High</TableCell>
//             <TableCell>Low</TableCell>        
//           </TableRow>
//         </TableHead>
//         <TableBody>
//          {renderWeatherRows(data)}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }


export default function WeatherTable({ data = {maxTemperature: [1], minTemperature: [1], weatherCode: [9000], days: []} }: { data: {maxTemperature?: Array<any>, minTemperature?: Array<any>, weatherCode?: Array<any>, days: Array<any>} }) {
    const [open, setOpen] = useState(true);

   const renderWeatherRows = (data: {maxTemperature?: any, minTemperature?: any, weatherCode?: any, days: Array<string>}) => {
        let numRows = Object.keys(data?.maxTemperature)?.length || 0
        
        return (
            Array.from({length: numRows}).map((_, index) => 
               <tr key={'row-' + index} className="flex flex-row w-300 justify-between h-10">
                <td className="w-1/3 text-center">{data.days[index as number]}</td>
                <td className="w-1/3 text-center">{data.maxTemperature[index as number].toFixed(0)} F</td>
                <td className="w-1/3 text-center">{data.minTemperature[index as number].toFixed(0)} F</td>
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
                        <th className="w-1/3">Day</th>
                        <th className="w-1/3">High</th>
                        <th className="w-1/3">Low</th>
                    </tr>
                </thead>
                <tbody className="w-300">
                     {renderWeatherRows(data)}
                </tbody>
            </table>
        </div>
    )
}