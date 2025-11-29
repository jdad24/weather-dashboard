import { BackgroundRenderer } from "./_components/background-renderer";
import MainContent from "./_components/main-content";
import { Suspense } from "react";

export default async function Page() {
    return (
        <div className='h-screen w-screen overflow-scroll'>
            <Suspense fallback={<BackgroundRenderer />}>
                <MainContent />
            </Suspense>
        </div>
    )
}