import { Metadata } from "next"

type VideoPageProps = {
    params: { videoId: string }
}

export async function generateMetadata(
    { params }: VideoPageProps,
): Promise<Metadata> {

    const { videoId } = params;

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

import SearchInput from "@/components/Input";
import { Suspense } from "react";
import Video from "@/components/video/Video";

function YoutubeIcon() {
    return <svg className="fill-[#FF0000] h-10 w-10 sm:h-12 sm:w-12 bg-white rounded-full p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 572 512">
        <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
    </svg>
}

export default async function VideoPage({ params }: VideoPageProps) {

    const { videoId } = params;

    return (
        <main className="flex flex-col items-center justify-center pb-12 h-full min-h-screen">
            <div className="md:w-4/5 w-11/12 flex flex-col items-center gap-8 p-4 pb-6">
                <h1 className="lg:text-4xl md:text-2xl sm:text-xl text-lg text-white font-semibold text-center flex items-center gap-2"><div className=""><YoutubeIcon /></div> Comment Section Sentiment Analysis</h1>
                <SearchInput />
            </div>
            {
                !!videoId &&
                <Video videoId={videoId} />
            }

        </main >
    );
}
