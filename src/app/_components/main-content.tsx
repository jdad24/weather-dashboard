'use client';

import { useState, useEffect } from "react";
import { Weather } from "../lib/models/weather";
import { BackgroundRenderer } from "./background-renderer";
import LocationCard from "./location-card";
import Card from "./card";
import WeatherTable from "./weather-table";
import { addWeatherRecord } from "../actions";
import { SearchCard } from "./search-card";
import CurrentWeatherCard from "./current-weather-card";

export default function MainContent() {
    const [weather, setWeather] = useState<any>({})

    useEffect(() => {
        (async () => {
            const weather = new Weather()
            try {
                await weather.getWeather()
                setWeather(weather)

                addWeatherRecord(weather.current.weatherDescription, weather.city, weather.country, weather.current.currentTemperature)
            } catch (error) {
                alert('Error fetching weather data.');
            }
        })()
    }, [])

    return <>
        <BackgroundRenderer weatherDescription={weather?.current?.weatherDescription} />
        <div className="h-full w-auto overflow-clip">
            <div className="flex lg:flex-row flex-col justify-between lg:p-10 p-5 lg:space-y-0 space-y-6">
                <SearchCard setWeather={setWeather} />
                <CurrentWeatherCard
                    city={weather?.city}
                    country={weather?.country}
                    temperature={weather?.current?.currentTemperature}
                    description={weather?.current?.weatherDescription}
                />
            </div>
            <div className="flex flex-row justify-center pt-10 lg:pt-20 font-bold">
                <WeatherTable data={weather.daily} />
            </div>
        </div>
    </>
}