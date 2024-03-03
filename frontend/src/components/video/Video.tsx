import General from "./General"
import Sentiment from "./Sentiment"

interface VideoProps {
    videoId: string
}

export default async function Video({ videoId }: VideoProps) {

    return (
        <div className="w-full flex gap-8 flex-col">
            <General videoId={videoId} />
            <General videoId={videoId} />
        </div>
    )

}