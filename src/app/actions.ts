'use server'

import { neon } from '@neondatabase/serverless';
import { Weather } from './lib/models/weather';

export async function addWeatherRecord(description: string, city: string, country: string, current_temp: string) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    await sql`INSERT INTO weather_visits (weather_description, city, country) 
    VALUES (${description}, ${city}, ${country}, ${current_temp})`
        
    
}