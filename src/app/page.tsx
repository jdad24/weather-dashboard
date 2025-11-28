import Card from "./_components/card";
import TimeCard from "./_components/time-card";
import { Weather } from "./lib/models"
import { BackgroundRenderer } from "./_components/background-renderer";
import WeatherTable from "./_components/weather-table";

export default async function Page() {
    const weather = new Weather();
    await weather.getWeather()

    return (
        <div className='h-screen w-screen bg-white'>
            <BackgroundRenderer weatherDescription={weather.current.weatherDescription} />
            <div className="z-200 fixed h-screen w-screen">
                <h1 className="text-black text-5xl font-bold flex flex-row justify-between pt-8 pl-16 pr-8">
                    The Weather Hub
                    <TimeCard title='Location' city={weather.city} country={weather.country} />
                </h1>
                <div className="flex flex-row justify-around pt-16">
                    <Card title='Current Temperature' data={weather.current.currentTemperature} />
                    <Card title='Weather' data={weather.current.weatherDescription} />
                </div>
                <div className="flex flex-row justify-center mt-20 font-bold">
                    <WeatherTable data={weather.daily} />
                </div>
            </div>
        </div>
    )
}