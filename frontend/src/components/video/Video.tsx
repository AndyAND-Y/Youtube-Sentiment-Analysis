import Image from "next/image";

interface VideoProps {
    videoId: string
}

export default async function Video(props: VideoProps) {

    const videoId = props.videoId;

    const fetchVideoData = async () => {
        const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        await sleep(1000);
    }

    const videoData = await fetchVideoData();

    return (
        <div className="md:w-3/4 w-full flex flex-col items-center gap-8 p-8">
            <div className="w-4/5 aspect-video">
                <Image
                    src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg?`}
                    width={1024}
                    height={1024}
                    alt="Youtube Thumbnail"
                    className="w-full h-full"
                    priority
                />
            </div>
        </div>
    )

}