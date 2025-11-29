'use client';

import { useState, useEffect } from "react";
import { Weather } from "../lib/utils/models/weather";
import { BackgroundRenderer } from "./background-renderer";
import LocationCard from "./location-card";
import Card from "./card";
import WeatherTable from "./weather-table";

export default function MainContent() {
    const [weather, setWeather] = useState<any>({})

    useEffect(() => {
        (async () => {
            const weather = new Weather()
            await weather.getWeather()
            setWeather(weather)

        })()
    }, [])
    return <>
         <BackgroundRenderer weatherDescription={weather?.current?.weatherDescription} />
                <div className="z-200 fixed h-screen w-screen">
                    <h1 className="text-white text-2xl font-bold flex flex-row justify-between pt-8 pl-16 pr-8">
                        <div className="bg-blue-900 opacity-80 w-1/5 shadow-black shadow-lg flex flex-row items-center pl-8 rounded-xl tracking-widest ">The Weather Hub</div>
                        <LocationCard title='Location' city={weather?.city} country={weather?.country} />
                    </h1>
                    <div className="flex flex-row justify-around pt-16">
                        <Card title='Current Temperature' data={weather?.current?.currentTemperature} />
                        <Card title='Weather' data={weather?.current?.weatherDescription} />
                    </div>
                    <div className="flex flex-row justify-center mt-20 font-bold">
                        <WeatherTable data={weather.daily} />
                    </div>
                </div>
    </>
}