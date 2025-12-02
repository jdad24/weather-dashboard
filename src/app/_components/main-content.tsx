'use client';

import { useState, useEffect } from "react";
import { Weather } from "../lib/models/weather";
import { BackgroundRenderer } from "./background-renderer";
import LocationCard from "./location-card";
import Card from "./card";
import WeatherTable from "./weather-table";
import { addWeatherRecord } from "../actions";

export default function MainContent() {
    const [weather, setWeather] = useState<any>({})

    useEffect(() => {
        (async () => {
            const weather = new Weather()
            await weather.getWeather()
            setWeather(weather)

            addWeatherRecord(weather.current.weatherDescription, weather.city, weather.country, weather.current.currentTemperature)

        })()
    }, [])
    return <>
         <BackgroundRenderer weatherDescription={weather?.current?.weatherDescription} />
                <div className="z-200 h-screen w-screen fixed">
                    <h1 className="text-white lg:text-2xl font-bold flex flex-row justify-center lg:justify-between pt-8 pl-16 pr-16">
                        <div className="hidden lg:flex bg-blue-900 opacity-80 w-1/4 shadow-black shadow-lg flex-row justify-center items-center rounded-xl tracking-widest ">The Weather Hub</div>
                        <LocationCard title='Location' city={weather?.city} country={weather?.country} />
                    </h1>
                    <div className="flex flex-col lg:flex-row items-center lg:justify-around gap-8 pt-8 lg:pt-16">
                        <Card title='Current Temperature' data={weather?.current?.currentTemperature} />
                        <Card title='Weather' data={weather?.current?.weatherDescription} />
                    </div>
                    <div className="flex flex-row justify-center mt-10 lg:mt-20 font-bold">
                        <WeatherTable data={weather.daily} />
                    </div>
                </div>
    </>
}