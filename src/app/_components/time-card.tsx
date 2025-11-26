export default function TimeCard({ title = "Example", data }: { title: string, data: string }) {
    return (
        <div className="bg-black text-white w-70 h-25 rounded-3xl overflow-clip shadow-lg shadow-black">
            <h1 className="font-bold flex flex-row justify-left text-xl pl-8 pt-2">{title}</h1>
            <div className="text-sm w-auto h-12 m-2 overflow-clip rounded-3xl flex flew-row justify-center items-center">{data}</div>            
        </div>
    )
}