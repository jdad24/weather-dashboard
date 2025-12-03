import { BackgroundRenderer } from "./_components/background-renderer";
import MainContent from "./_components/main-content";
import { Suspense } from "react";

export default async function Page() {
    return (
        <div className='h-full w-full'>
            <Suspense fallback={<BackgroundRenderer />}>
                <MainContent />
            </Suspense>
        </div>
    )
}