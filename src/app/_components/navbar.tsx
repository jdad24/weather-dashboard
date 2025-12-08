import Link
    from "next/link"

export default function Navbar() {
    return (
        <nav className="bg-gray-900 z-9000 opacity-90 text-black h-15 min-w-screen lg:h-screen lg:min-w-40 flex flex-row lg:flex-col sticky top-0">
            <div className="bg-gray-900 text-white lg:text-3xl flex flex-row justify-center items-center h-full lg:h-15 ml-5 mr-5 lg:m-0">JD</div>
            <div className="flex flex-row lg:flex-col w-full lg:h-auto">
                <Link href="/dashboard" className="w-full">
                    <button className="w-full h-full lg:h-20 bg-white hover:bg-black hover:text-white hover:cursor-pointer border-r-1 lg:border-b-1 font-bold">Forecast</button>
                </Link>
                <Link href="/archive" className="w-full">
                    <button className="w-full h-full lg:h-20 bg-white hover:bg-black hover:text-white hover:cursor-pointer font-bold">Archive</button>
                </Link>
            </div>
        </nav>
    )
}