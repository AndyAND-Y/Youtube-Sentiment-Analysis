import getBaseApiLink from "@/util/getBaseApiLink"
import Comment from "@/types/Comment"
import ScoreBar from "../ScoreBar"
import CommentView from "../../Comment/Comment"
import ModelPart from "./ModelPart"

interface VideoSentimentProps {
    videoId: string,
}

export default async function Sentiment({ videoId }: VideoSentimentProps) {

    const fetchVideoSentiment = async () => {

        try {

            const response = await fetch(getBaseApiLink() + videoId + "/sentiment", {
                next: {
                    revalidate: 3600
                }
            })
                .then((res) => res.json())

            const vader: {
                bestComm: Comment,
                worstComm: Comment,
                averageScore: number,
            } = {
                averageScore: response.vader.average_score,
                worstComm: {
                    author: response.vader.worst_comm.author,
                    text: response.vader.worst_comm.text,
                    publishedAt: response.vader.worst_comm.published_at,
                    profileImageUrl: response.vader.worst_comm.profile_image_url,
                    likeCount: response.vader.worst_comm.like_count,
                    score: response.vader.worst_comm.score,
                },
                bestComm: {
                    author: response.vader.best_comm.author,
                    text: response.vader.best_comm.text,
                    publishedAt: response.vader.best_comm.published_at,
                    profileImageUrl: response.vader.best_comm.profile_image_url,
                    likeCount: response.vader.best_comm.like_count,
                    score: response.vader.best_comm.score,
                }
            }

            return {
                vader,
                vader2: { ...vader },
            } as {
                [key: string]: {
                    averageScore: number,
                    bestComm: Comment,
                    worstComm: Comment,
                }
            }
        }
        catch (error) {
            console.log("[X] Error:" + error);
            return null;
        }
    }

    const data = await fetchVideoSentiment();

    if (!data) {
        return null;
    }

    return (
        <div className="flex-col flex gap-4">

            {Object.keys(data).map((model) => {

                return (
                    <ModelPart modelData={data[model]} />
                )
            })}

        </div >
    )
}