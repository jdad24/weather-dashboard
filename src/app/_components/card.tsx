export default function Card({ title = "Example", data }: { title: string, data: string }) {
    return (
        <div className="bg-black text-white w-96 h-40 rounded-3xl overflow-clip shadow-lg shadow-black">
            <h1 className="font-bold flex flex-row justify-left text-xl pl-8 pt-4">{title}</h1>
            <div className="text-3xl w-auto h-24 m-2 overflow-clip rounded-3xl flex flew-row justify-center items-center">{data}</div>            
        </div>
    )
}