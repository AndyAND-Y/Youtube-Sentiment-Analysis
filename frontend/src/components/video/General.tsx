import getBaseApiLink from "@/util/getBaseApiLink";
import Image from "next/image";
import Counter from "../Counter/Counter";

interface VideoGeneralProps {
    videoId: string
}

export default async function General({ videoId }: VideoGeneralProps) {

    const fetchVideoGeneral = async (): Promise<{
        title: string;
        viewCount: number;
        thumbnail: string;
        likes: number;
        commentCount: number;
    } | null> => {
        try {
            const response = await fetch(getBaseApiLink() + videoId, {
                next: {
                    revalidate: 3600
                }
            })
                .then((res) => {
                    if (res.status >= 400) {
                        return null;
                    }
                    return res
                })
                .then((res) => res?.json())

            const sleep = (s: number) => new Promise((resolve) => setTimeout(resolve, s * 1000))

            await sleep(5);

            return {
                title: response['title'] as string,
                viewCount: response['view_count'] as number,
                thumbnail: response['thumbnail'] as string,
                likes: response['likes'] as number,
                commentCount: response["comment_count"] as number,
            }
        }
        catch (error) {
            console.log("[X] Error:" + error);
            return null;
        }
    }

    const data = await fetchVideoGeneral();

    if (!data) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                Ups...{'\n'}Something didn't work as intended.
            </div>
        )
    }

    const { title, thumbnail, viewCount, likes, commentCount } = data;

    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-col gap-4 md:w-4/5 lg:w-3/5 w-11/12 p-4 bg-neutral-950 rounded-lg shadow-neutral-600 shadow-md hover:shadow-lg hover:shadow-neutral-600 transition-all duration-300">

                <div className="aspect-video">
                    <a
                        href={"https://www.youtube.com/watch?v=" + videoId}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="sm:p-8 p-4 py-4 pb-2 flex justify-center items-center"
                    >
                        <Image
                            src={thumbnail}
                            width={1024}
                            height={1024}
                            alt="Youtube Thumbnail"
                            className="w-full h-full rounded-lg transition-all duration-300 hover:scale-[1.05]"
                            priority
                        />
                    </a>
                </div>
                <div className="flex justify-start w-full">
                    <h3 className="p-2 pl-0 text-4xl font-semibold truncate">{title}</h3>
                </div>
                <div className="flex justify-between">
                    <span className="flex gap-1">Views: <Counter from={Number(0)} to={Number(viewCount)} precission={0} /></span>
                    <span className="flex gap-1">Likes: <Counter from={Number(0)} to={Number(likes)} precission={0} /></span>
                    <span className="flex gap-1">Comments: <Counter from={Number(0)} to={Number(commentCount)} precission={0} /></span>
                </div>
            </div>
        </div>
    )

}