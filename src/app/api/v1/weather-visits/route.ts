import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function GET() {    
    const sql  = neon(`${process.env.DATABASE_URL}`)
    const records = await sql`SELECT * FROM weather_visits`

    console.log(records)

    return NextResponse.json(records)
}