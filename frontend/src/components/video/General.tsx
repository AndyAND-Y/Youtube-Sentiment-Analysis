import Image from "next/image";

interface VideoGeneralProps {
    videoId: string
}

export default async function General({ videoId }: VideoGeneralProps) {

    const fetchVideoGeneral = async () => {
        const response = await fetch("http://localhost:8000/api/" + videoId, {
            next: {
                revalidate: 3600
            }
        })
            .then((res) => res.json())

        return {
            title: response['title'] as string,
            viewCount: response['view_count'] as number,
            thumbnail: response['thumbnail'] as string,
            likes: response['likes'] as number,
            commentCount: response["comment_count"] as number,
        }

    }

    const { title, thumbnail, viewCount, likes, commentCount } = await fetchVideoGeneral();

    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-col gap-4 md:w-3/5 w-full">

                <div className="aspect-video">
                    <Image
                        src={thumbnail}
                        width={1024}
                        height={1024}
                        alt="Youtube Thumbnail"
                        className="w-full h-full rounded-lg"
                        priority
                    />
                </div>
                <div className="flex justify-start w-full">
                    <h3 className="p-2 pl-0 text-4xl font-semibold truncate">{title}</h3>
                </div>
                <div className="flex justify-between">
                    <span>Views: {viewCount}</span>
                    <span>Likes: {likes}</span>
                    <span>Comments: {commentCount}</span>
                </div>
            </div>
        </div>
    )

}