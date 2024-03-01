import SearchInput from "@/components/Input";
import Video from "@/components/video/Video";
import { Suspense } from "react";

export default async function Home({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {

    const videoId = Array.isArray(searchParams['v']) ? searchParams['v'][0] : searchParams['v'];

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="md:w-3/4 w-full flex flex-col items-center gap-8 p-8">
                <h1 className="text-2xl text-white font-semibold text-balance"> Check the sentiment of a Youtube video </h1>
                <SearchInput />
            </div>
            {
                !!videoId && (
                    <Suspense fallback={<div>Loading...</div>} >
                        <Video videoId={videoId} />
                    </Suspense>
                )
            }
        </main>
    );
}
