import { OPEN_METEO_SEARCH_URL } from "@/app/lib/constants";
import { NextRequest } from "next/server";

const searchUrl = OPEN_METEO_SEARCH_URL

/**
 * Retrieves coordinates based on provided city, state, and country
 * @param request 
 * @returns Object containing latitude and longitude
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city') || '';
    const state = searchParams.get('state') || '';
    const country = searchParams.get('country') || '';

    const queryParams = new URLSearchParams({
        name: city       
    });

    const fullUrl = `${searchUrl}?${queryParams.toString()}`;
    const response = await fetch(fullUrl);
    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
        const location = data.results[0];
        console.log(`Found location: ${location.name}, ${location.country} (${location.latitude}, ${location.longitude})`); 
        return new Response(JSON.stringify({
            latitude: location.latitude,
            longitude: location.longitude,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        console.log(`Location not found for query: ${city}, ${state}, ${country}`);
        return new Response(JSON.stringify({ error: 'Location not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}