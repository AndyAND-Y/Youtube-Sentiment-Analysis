import General from "./General"
import Sentiment from "./Sentiment"

interface VideoProps {
    videoId: string
}

export default async function Video({ videoId }: VideoProps) {

    return (
        <div className="flex w-full">
            <General videoId={videoId} />
            <Sentiment videoId={videoId} />
        </div>
    )

}