import { TextField, Button } from "@mui/material"
import { useState } from "react";
import { Weather } from "../lib/models/weather";

export function SearchCard({ setWeather }: any) {
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    const weather = new Weather();

    const handleSearch = async () => {
        if (city.trim() == "" || country.trim() == "" || state.trim() == "" || city == null || country == null || state == null) {
            alert("Please enter a city, state, and country.");
            return;
        }

        try {
            await weather.getWeather(city, state, country); 
            setWeather(weather);
        } catch (error) {
            alert('Error fetching weather data.');
        }
        console.log(`Searched for: ${city}, ${state}, ${country}`);
    }
    return (
        <div className="bg-blue-900 w-2/5 opacity-80 shadow-black shadow-lg lg:flex flex-col justify-start items-start rounded-xl p-4 gap-2 tracking-widest">
            <div className="text-3xl text-center w-full">Search Location</div>
            <div className="flex flex-row">
                <div className="w-30 pr-5">City:</div> <TextField onChange={e => setCity(e.target.value)} className="bg-white" variant="outlined" size="small" />
            </div>
            <div className="flex flex-row">
                <div className="w-30 pr-5">State:</div> <TextField onChange={e => setState(e.target.value)} className="bg-white" variant="outlined" size="small" />
            </div>
            <div className="flex flex-row">
                <div className="w-30 pr-5">Country:</div> <TextField onChange={e => setCountry(e.target.value)} className="bg-white" variant="outlined" size="small" />
            </div>
            <Button onClick={() => handleSearch()} variant="contained" className="mt-4 bg-blue-700 hover:bg-blue-800 w-full cursor-pointer">Search</Button>
        </div>
    )
}