'use client'

import Link from "next/link"

export default function ArchiveLink() {
    return (
        <Link href="/archive">
            <div className="lg:hover:scale-110 flex flex-row items-center justify-center w-70 h-20 lg:w-96 lg:h-20 bg-green-900 opacity-90 text-white rounded-3xl overflow-clip shadow-lg shadow-black">
                <h1 className="font-bold lg:text-2xl">Archive</h1>
            </div>
        </Link>
    )
}