'use client';

import { getGeoLocation } from "../lib/browser-geolocation";
import { useState, useEffect } from "react";
import { Weather } from "../lib/utils/models/weather";
import { BackgroundRenderer } from "./background-renderer";
import TimeCard from "./time-card";
import Card from "./card";
import WeatherTable from "./weather-table";

export default function MainContent() {
    const [coordinates, setCoordinates] = useState({
        latitude: -82.86,
        longitude: 135.00
    })

    const [weather, setWeather] = useState<any>({})

    const handleGeolocation = async () => {
        const coordinates = await getGeoLocation()
        console.log(coordinates)

        const weather = new Weather()
        await weather.getWeather(coordinates)
    }

    useEffect(() => {
        (async () => {
            await handleGeolocation()

        })()
    }, [])
    return <>
         <BackgroundRenderer weatherDescription={weather?.current?.weatherDescription} />
                <div className="z-200 fixed h-screen w-screen">
                    <h1 className="text-black text-5xl font-bold flex flex-row justify-between pt-8 pl-16 pr-8">
                        The Weather Hub
                        <TimeCard title='Location' city={weather?.city} country={weather?.country} />
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