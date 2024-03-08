import { Suspense } from "react"
import General from "./General"
import Sentiment from "./Sentiment/Sentiment"
import VideoSkeleton from "./VideoSkeleton"

interface VideoProps {
    videoId: string
}

export default async function Video({ videoId }: VideoProps) {

    return (
        <div className="w-full h-full flex gap-8 flex-col">
            <Suspense fallback={<VideoSkeleton />}>
                <General videoId={videoId} />
            </Suspense>
            <Suspense>
                <Sentiment videoId={videoId} />
            </Suspense>
        </div>
    )

}