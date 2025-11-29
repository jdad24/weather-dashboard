export default function Card({ title = "Example", data }: { title: string, data: string }) {
    return (
        <div className="w-70 h-20 lg:w-96 lg:h-40 bg-blue-900 opacity-90 text-white rounded-3xl overflow-clip shadow-lg shadow-black">
            <h1 className="font-bold flex flex-row justify-left lg:text-xl pl-8 pt-4">{title}</h1>
            <div className="lg:w-auto lg:h-24 lg:text-3xl m-2 overflow-clip rounded-3xl flex flew-row justify-center items-center">{data}</div>            
        </div>
    )
}