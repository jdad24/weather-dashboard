import Card from "../_components/card"
import { Weather } from "../lib/models"
import { BackgroundRenderer } from "../_components/background-renderer";

export default async function Page() {
    const weather = new Weather();
    await weather.getCurrentWeather()

    return (        
            <div className='h-screen w-screen bg-white'>
                <BackgroundRenderer weatherDescription={weather.description}/>   
                <div className="z-200 fixed h-screen w-screen">
                    <h1 className="text-black text-5xl font-bold flex flex-row justify-left pt-8 pl-16">The Weather Hub</h1>
                    <div className="flex flex-row justify-around pt-16">
                        <Card title='Current Temperature' data={weather.currentTemperature} />
                        <Card title='Weather' data={weather.description} />
                        <Card title='Time' data={weather.time} />
                    </div>
                </div>
            </div>        
    )
}