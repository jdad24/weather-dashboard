import Card from "./_components/card";
import TimeCard from "./_components/time-card";
import { Weather } from "./lib/utils/models/weather"
import { BackgroundRenderer } from "./_components/background-renderer";
import WeatherTable from "./_components/weather-table";
import MainContent from "./_components/main-content";

export default async function Page() {


    return (
        <div className='h-screen w-screen bg-white'>            
            <MainContent/>                           
        </div>
    )
}