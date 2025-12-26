import { fetchWeatherApi } from "openmeteo";
import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import { OPEN_METEO_FORECAST_URL, OPEN_METEO_SEARCH_URL } from "@/app/lib/constants";

const forecastUrl = OPEN_METEO_FORECAST_URL;
const searchUrl = OPEN_METEO_SEARCH_URL;


/**
 * Retrieves weather data for the user's current location
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    let userCity = searchParams.get('city')
    let userCountry = searchParams.get('country')
    let userState = searchParams.get('state')
    let userLat, userLong

    if (userCity && userCountry && userState) {
        const queryParams = new URLSearchParams({ name: userCity });

        const fullSearchUrl = `${searchUrl}?${queryParams.toString()}`;
        const response = await fetch(fullSearchUrl);
        const data = await response.json();

        if (data && data.results && data.results.length > 0) {
            const location = data.results[0];
            console.log(`Found location: ${location.name}, ${location.country} (${location.latitude}, ${location.longitude})`);
            userLat = location.latitude;
            userLong = location.longitude;
        } else {
            console.log(`Location not found for query: ${userCity}, ${userState}, ${userCountry}`);
            return new Response(JSON.stringify({ error: 'Location not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } else {
        const { city = "", country = "Antarctica", latitude: geoLat = -82.86, longitude: geoLong = 135.00 } = geolocation(request);
        userCity = city;
        userCountry = country;
        userLat = geoLat;
        userLong = geoLong;
    }

    const params = {
        latitude: userLat,
        longitude: userLong,
        daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", "rain_sum", "showers_sum", "snowfall_sum", "precipitation_sum", "precipitation_hours", "precipitation_probability_max"],
        current: ["temperature_2m", "precipitation", "rain", "is_day", "weather_code", "wind_speed_10m", "wind_direction_10m"],
        timezone: "America/Chicago",
        wind_speed_unit: "mph",
        temperature_unit: "fahrenheit",
    };

    const responses = await fetchWeatherApi(forecastUrl, params);
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    console.log(
        `\nCoordinates: ${latitude}°N ${longitude}°E`,
        `\nElevation: ${elevation}m asl`,
        `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
        `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    );

    const current = response.current()!;
    const daily = response.daily()!;

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
        daily: {
            time: Array.from(
                { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
                (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
            ),
            weather_code: daily.variables(0)!.valuesArray(),
            temperature_2m_max: daily.variables(1)!.valuesArray(),
            temperature_2m_min: daily.variables(2)!.valuesArray(),
            rain_sum: daily.variables(3)!.valuesArray(),
            showers_sum: daily.variables(4)!.valuesArray(),
            snowfall_sum: daily.variables(5)!.valuesArray(),
            precipitation_sum: daily.variables(6)!.valuesArray(),
            precipitation_hours: daily.variables(7)!.valuesArray(),
            precipitation_probability_max: daily.variables(8)!.valuesArray(),
        },
        city: userCity,
        country: userCountry
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
    console.log("\nDaily data:\n", weatherData.daily)
    return NextResponse.json(weatherData)
}