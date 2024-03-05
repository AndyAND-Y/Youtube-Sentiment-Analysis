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
        <main className="flex flex-col items-center justify-center pb-12">
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
