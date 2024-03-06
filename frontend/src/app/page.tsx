import SearchInput from "@/components/Input";
import Video from "@/components/video/Video";
import SearchParams from "@/types/SearchParams";
import getVideoId from "@/util/getVideoId";
import { Suspense } from "react";

export default async function Home({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: SearchParams
}) {

    const videoId = getVideoId(searchParams);

    return (
        <main className="flex flex-col items-center justify-center pb-12 h-full min-h-screen">
            <div className="md:w-4/5 w-11/12 flex flex-col items-center gap-8 p-4 pb-6">
                <h1 className="text-4xl text-white font-semibold text-balance text-center">Youtube Comment Section Sentiment Analysis</h1>
                <SearchInput />
            </div>
            {
                !!videoId && (
                    <Suspense fallback={<div>Loading...</div>} >
                        <Video videoId={videoId} />
                    </Suspense>
                )
            }
        </main >
    );
}
