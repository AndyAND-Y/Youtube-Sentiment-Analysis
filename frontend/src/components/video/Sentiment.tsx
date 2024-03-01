
interface VideoSentimentProps {
    videoId: string,
}

export default async function Sentiment({ videoId }: VideoSentimentProps) {

    const fetchVideoSentiment = async () => {

        const response = await fetch("http://localhost:8000/api/" + videoId + "/sentiment", {
            next: {
                revalidate: 3600
            }
        })
            .then((res) => res.json())


        type Comment = {
            score: {
                neg: number,
                neu: number,
                pos: number,
                compoud: number,
            },
            author: string,
            text: string,
            likeCount: number,
            publishedAt: string,
        }

        type RawComment = Omit<Comment, "likeCount" | "publishedAt"> & {
            like_count: number,
            published_at: string,
        }

        return (
            (response.comment as RawComment[])
                .map((comm) => ({
                    ...comm,
                    likeCount: comm.like_count,
                    publishedAt: comm.published_at,
                }))
        ) as Comment[]

    }

    return (<></>)
}