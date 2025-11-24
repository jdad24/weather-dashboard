import { fetchWeatherApi } from "openmeteo";
import { NextResponse } from "next/server";
import { OPEN_METEO_FORECAST_URL } from "@/app/lib/constants";


/**
 * Retrieves weather data for the user's current location
 */
export async function GET() {
    const url = OPEN_METEO_FORECAST_URL;

    //Hardcoded values - will use an api to get user current location
    const params = {
        latitude: 32.94,
        longitude: -97.13,
        current: ["temperature_2m", "precipitation", "rain", "is_day", "weather_code", "wind_speed_10m", "wind_direction_10m"],
        wind_speed_unit: "mph",
        temperature_unit: "fahrenheit",
    };

    const responses = await fetchWeatherApi(url, params);
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    console.log(
        `\nCoordinates: ${latitude}°N ${longitude}°E`,
        `\nElevation: ${elevation}m asl`,
        `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    );

    const current = response.current()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature_2m: current.variables(0)!.value(),
            precipitation: current.variables(1)!.value(),
            rain: current.variables(2)!.value(),
            is_day: current.variables(3)!.value(),
            weather_code: current.variables(4)!.value(),
            wind_speed_10m: current.variables(5)!.value(),
            wind_direction_10m: current.variables(6)!.value(),
        },
    };

    // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
    console.log(
        `\nCurrent time: ${weatherData.current.time}\n`,
        `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
        `\nCurrent precipitation: ${weatherData.current.precipitation}`,
        `\nCurrent rain: ${weatherData.current.rain}`,
        `\nCurrent is_day: ${weatherData.current.is_day}`,
        `\nCurrent weather_code: ${weatherData.current.weather_code}`,
        `\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
        `\nCurrent wind_direction_10m: ${weatherData.current.wind_direction_10m}`,
    );

    console.log(weatherData)
    return NextResponse.json(weatherData)
}