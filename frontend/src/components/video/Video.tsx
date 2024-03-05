import General from "./General"
import Sentiment from "./Sentiment/Sentiment"

interface VideoProps {
    videoId: string
}

export default async function Video({ videoId }: VideoProps) {

    return (
        <div className="w-full flex gap-8 flex-col">
            <General videoId={videoId} />
            <Sentiment videoId={videoId} />
        </div>
    )

}