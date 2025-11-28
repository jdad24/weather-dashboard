'use client';

import { useEffect, useState } from "react";
import { BKGVideos } from "../lib/types";

/**
 * 
 * Contains video paths based on theme
 */

const bkgVideos: any = {
    loading: "/waterfall-background.mp4",
}

/**
 * 
 * Contains background video for the app background. Uses context to decide the background video
 */
export function BackgroundRendererServer() {

    return (
        <div className="h-screen w-screen absolute">                  
            <video className="object-cover h-screen w-screen" autoPlay muted loop playsInline key={'loading'+'-vid'}>
                <source src={bkgVideos['loading']} type="video/mp4" />
            </video>
        </div>
    )
}