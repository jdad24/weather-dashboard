export default function CurrentWeatherCard({ city, country, temperature, description }: { city: string; country: string; temperature: number; description: string }) {
    return (
        <div className="bg-blue-900 opacity-80 p-6 shadow-black rounded-xl shadow-lg lg:w-2/5 w-full space-y-3">
            <h2 className="text-2xl font-bold mb-4">Current Weather</h2>
            <p className="text-lg"><span className="font-semibold">Location:</span> {city}, {country}</p>
            <p className="text-lg"><span className="font-semibold">Temperature:</span> {temperature}</p>
            <p className="text-lg"><span className="font-semibold">Description:</span> {description}</p>
        </div>
    );
}