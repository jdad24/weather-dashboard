import { FORECAST_URL } from "./constants"
import { getHostUrl } from '@/app/lib/utils'

/**
 * Weather object that encapsulates weather data
 * 
 * @property {string} currentTemperature - Current temperature
 * @property {Array<string>} forecastedTemperature - Temperature 
 * @property {number} weatherCode - Weather code for the type of weather
 * @property {string} description - Weather Description
 * @property {string} time - Current Time
 */
export class Weather {
    currentTemperature: string = '';
    forecastedTemperature: [string] = [''];
    weatherCode: number = 9000;
    description: string = ''
    time: string = ''


    /**
     * Get the current weather of the given latitude and longitude. Executed server side.
     * 
     * @param {string} latitude
     * @param {string} longitude
     * @returns {void}
     */
    async getCurrentWeather() {        
        const hostURL = await getHostUrl()
        const forecastData = await fetch(`${hostURL}${FORECAST_URL}`)
        const forecastJSON = await forecastData.json()
        console.log(forecastJSON)

        this.currentTemperature = forecastJSON.current.temperature_2m.toFixed(0) + " F"
        this.weatherCode = forecastJSON.current.weather_code
        this.description = this.convertWeatherCode()  
        this.time = forecastJSON.current.time      
    }

    /**
     * Uses weather code to populate weather property with a descriptive string
     * 
     * @returns {void}
     */
    convertWeatherCode() {
        switch (this.weatherCode) {
            case 0:
                return "Clear"
            case 1:
            case 2:
            case 3:
                return "Party cloudly"
            case 45:
            case 48:
                return "Fog"
            case 51:
            case 53:
            case 55:
                return "Drizzle"
            case 56:
            case 57:
                return "Freezing Drizzle"
            case 61:
            case 63:
            case 65:
                return "Rain"
            case 66:
            case 67:
                return "Freezing Rain"
            case 71:
            case 73:
            case 75:
                return "Snowfall"
            case 77:
                return "Snow Grains"
            case 80:
            case 81:
            case 82:
                return "Rain Showers"
            case 85:
            case 86:
                return "Snow Showers"
            case 95:
                return "Thunderstorm"
            case 96:
            case 99:
                return "Thunderstorm with Hail"
            default:
                return "N/A"
        }
    }
}

/**
 * Format Time
 * 
 * @param {string} Time - Time
 */
function formatTime(time: string) {
    return 
}