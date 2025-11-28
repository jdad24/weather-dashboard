export default function TimeCard({ title, city, country }: { title: string, city: string, country: string }) {
    return (
        <div className="bg-blue-900 opacity-90 text-white w-70 h-25 rounded-3xl overflow-clip shadow-lg shadow-black">
            <h1 className="font-bold flex flex-row justify-left text-xl pl-8 pt-2">{title}</h1>
            <div className="text-lg w-auto h-12 m-2 mt-0 overflow-clip rounded-3xl flex flew-row justify-center items-center">{city != "" ? `${city}, ${country}`: country}</div>            
        </div>
    )
}