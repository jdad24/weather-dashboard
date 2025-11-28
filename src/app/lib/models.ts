import { FORECAST_URL } from "./constants"
import { getHostUrl } from '@/app/lib/utils/get-host-url'

/**
 * Weather object that encapsulates weather data
 * 
 * @class
 * @property {object} current - Data for the current weather
 * @property {string} current.temperature - Current temperature
 * @property {number} current.weatherCode - Weather code for the type of weather
 * @property {string} current.description - Weather Description
 * @property {string} current.time - Current Time
 * 
 * @property {object} daily - Object containing daily forecasted weather data
 */
export class Weather {
    current: {
        currentTemperature: string;
        weatherCode: number;
        weatherDescription: string
        time: string
    } = {
            currentTemperature: '',
            weatherCode: 9000,
            weatherDescription: '',
            time: ''
        }

    daily: {
        maxTemperatures: Record<string, number>; //need to change to object
        minTemperatures: Record<string, number>;
        weatherCodes: Record<string, number>;    
        days: Array<string>;       
        weatherDescriptions: Record<string, string>
    } = {
            maxTemperatures: {},
            minTemperatures: {},  
            weatherCodes: {},
            days: [],   
            weatherDescriptions: {}       
        }




    /**
     * Get the current weather of the given latitude and longitude. Executed server side.
     * 
     * @param {string} latitude
     * @param {string} longitude
     * @returns {void}
     */
    async getWeather() {
        const hostURL = await getHostUrl()
        const forecastData = await fetch(`${hostURL}${FORECAST_URL}`)
        const forecastJSON = await forecastData.json()

        this.current.currentTemperature = forecastJSON.current.temperature_2m.toFixed(0) + " F"
        this.current.weatherCode = forecastJSON.current.weather_code
        this.current.weatherDescription = this.convertWeatherCode(this.current.weatherCode)
        this.current.time = this.formatTime(forecastJSON.current.time)

        this.daily.maxTemperatures = forecastJSON.daily.temperature_2m_max
        this.daily.minTemperatures = forecastJSON.daily.temperature_2m_min
        this.daily.weatherCodes = forecastJSON.daily.weather_code
        this.daily.days = this.getDaysFromDates(forecastJSON.daily.time)

        for(let i = 0; i<= Object.keys(this.daily.weatherCodes).length; i++){
            this.daily.weatherDescriptions[i] = this.convertWeatherCode(this.daily.weatherCodes[i])
        }
        
        console.log("Weather Class Object ", this.daily)
    }

    /**
     * Format Date
     * 
     * @param {string} timeString - Time string
     * @returns {string} Formatted time string
     */
    formatTime(time: string): string {
        const date = new Date(time).toLocaleString()
        return String(date)
    }

    /**
     * Get Day from Date
     * 
     * @param {Array<string>} date 
     * @returns {Array<string>}
     */
    getDaysFromDates(dates: Array<string>): Array<string> {        
        const days: Array<string> = []

        dates.map(date => {         
            const splitDate = date.split("T")[0] + "T00:00:00"                  
            days.push(new Date(splitDate).toLocaleString('en-US', { weekday: 'long', timeZone: "America/Chicago" }))            
        })
   
        return days
    }

    /**
     * Uses weather code to populate weather property with a descriptive string
     * 
     * @returns {void}
     */
    convertWeatherCode(weatherCode: number): string {
        switch (weatherCode) {
            case 0:
                return "Clear"
            case 1:
            case 2:
            case 3:
                return "Party Cloudly"
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