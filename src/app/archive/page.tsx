import { neon } from "@neondatabase/serverless"
import VisitsTable from "../_components/visits-table"

export default async function Page() {
    const sql = neon(`${process.env.DATABASE_URL}`)
    const records = await sql`SELECT * FROM weather_visits`
    console.log(records)

    return (
        <div>
            <VisitsTable records={records} />
        </div>
    )
} 