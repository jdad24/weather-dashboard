'use client';

import { useEffect, useState } from "react";
import { BKGVideos } from "../lib/types";

/**
 * 
 * Contains video paths based on theme
 */

const bkgVideos: BKGVideos = {
    clear: '/clear-background.mp4',
    cloudy: '/cloudy-background.mp4',
    snow: '/snow-background.mp4',
    sunny: "/sunny-background.mp4",
    rain: "/rain-background.mp4",
    lightning: "/lightning-background.mp4",
    loading: "/waterfall-background.mp4",
}

/**
 * 
 * Contains background video for the app background. Uses context to decide the background video
 */
export function BackgroundRenderer({ weatherDescription = 'loading' }: { weatherDescription?: string }) {
    const [weatherKey, setWeatherKey] = useState('loading')


    const checkWeather = () => {
        const lowerCaseWeatherDescription: string = weatherDescription.toLowerCase()

        if (lowerCaseWeatherDescription.includes('clear')) {  
            setWeatherKey("clear")                             
            return
        }

        if (lowerCaseWeatherDescription.includes('cloud')) {  //check for cloud instead of cloudy
            setWeatherKey("cloudy")                             
            return
        }

        if (lowerCaseWeatherDescription.includes('sunny')) {
            setWeatherKey("sunny")   
            return
        }

        if (lowerCaseWeatherDescription.includes('rain')) {
            setWeatherKey("rain")   
            return
        }

        if (lowerCaseWeatherDescription.includes('lightning')) {
            setWeatherKey("lightning")   
            return
        }

        if (lowerCaseWeatherDescription.includes('loading')) {            
            setWeatherKey("loading")   
            return
        }

        setWeatherKey('loading')
    }

    useEffect(() => {        
        checkWeather()            
    }, [weatherDescription, weatherKey])

    return (
        <div className="h-screen w-screen fixed">                  
            <video className="object-cover h-screen w-screen" autoPlay muted loop playsInline key={weatherKey+'-vid'}>
                <source src={bkgVideos[weatherKey]} type="video/mp4" />
            </video>
        </div>
    )
}