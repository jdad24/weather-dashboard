'use client';

function getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

export async function getGeoLocation(): Promise<{latitude: number, longitude: number}> {
    let latitude = -82.86
    let longitude = 135.00
       
      if('geolocation' in navigator) {       
        const position = await getPosition()     
        const { latitude, longitude } = position.coords
        return {latitude, longitude}
    }
    return {latitude, longitude}
}