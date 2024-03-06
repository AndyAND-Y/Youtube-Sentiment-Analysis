import SearchInput from "@/components/Input";
import Video from "@/components/video/Video";
import SearchParams from "@/types/SearchParams";
import getVideoId from "@/util/getVideoId";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
    params: { id: string }
    searchParams: SearchParams,
}

export async function generateMetadata(
    { params, searchParams }: Props,
): Promise<Metadata> {

    const videoId = getVideoId(searchParams)

    return {
        title: "Youtube Comments Sentiment",
        description: "Check how people feel about a youtube video!",
        openGraph: {
            title: "Youtube Comments Sentiment",
            description: "Check how people feel about a youtube video!",
            siteName: "Youtube Comments Sentiment Analysis",
            type: "website",
            images: [{ url: "https://ytb-sentiment-analysis.vercel.app/og/?v=" + videoId }]
        }
    }
}

export default async function Home({
    params,
    searchParams,
}: Props) {

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
