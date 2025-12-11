import { neon } from "@neondatabase/serverless"
import VisitsTable from "../_components/visits-table"

export const dynamic = 'force-dynamic';

export default async function Page() {
    const sql = neon(`${process.env.DATABASE_URL}`)
    const records = await sql`SELECT * FROM weather_visits`
    console.log(records)

    return (
        <div className="h-full w-full">
            <h1 className="bg-black text-white flex flex-row justify-center sticky top-0 z-100 h-10 items-center">Weather Data Archive (Visitor Data)</h1>
            <VisitsTable records={records} />
        </div>
    )
} 