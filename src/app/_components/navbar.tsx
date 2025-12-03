import Link
    from "next/link"

export default function Navbar() {
    return (
        <nav className="bg-gray-900 opacity-90 text-black h-screen min-w-40 flex flex-col sticky top-0">
            <div className="bg-gray-900 text-white lg:text-3xl flex flex-row justify-center items-center h-20">JD</div>
            <Link href="/dashboard">
                <button className="w-full h-20 bg-white hover:bg-black hover:text-white hover:cursor-pointer border-b-1 font-bold">Forecast</button>
            </Link>
            <Link href="/archive">
                <button className="w-full h-20 bg-white hover:bg-black hover:text-white hover:cursor-pointer font-bold">Archive</button>
            </Link>
        </nav>
    )
}