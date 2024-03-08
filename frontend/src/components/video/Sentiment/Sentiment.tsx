import getBaseApiLink from "@/util/getBaseApiLink"
import Comment from "@/types/Comment"
import ModelPart from "./ModelPart"
import ModelData from "@/types/ModelData"

interface VideoSentimentProps {
    videoId: string,
}

export default async function Sentiment({ videoId }: VideoSentimentProps) {

    const fetchVideoSentiment = async () => {

        try {

            const response = await fetch(getBaseApiLink() + videoId + "/sentiment", {
                next: {
                    revalidate: 0
                }
            })
                .then((res) => res.json())

            const generalDesc = [
                "Sentiment analysis is like a mood detector for text, figuring out if it's happy, sad, or neutral. \
                It helps understand people's feelings expressed in words, like on social media or in product reviews."
            ]

            const descVader = [
                "VADER Sentiment Analysis is a powerful tool designed to understand the sentiment expressed in text, particularly on social media platforms.\
                It utilizes a specialized lexicon and rule - based system to gauge the emotional tone of a piece of text, whether it's positive, negative, or neutral. \
                This tool is valuable for those seeking to interpret and analyze sentiments in various contexts, even if they are not familiar with sentiment analysis techniques.",
                "The scoring method used by sentiment analysis assigns values between -1 and 1 to indicate the degree of positivity or negativity in the text."
            ]

            const vader: ModelData = {
                name: "VADER",
                description: generalDesc.concat(descVader),
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

            const distilbert: ModelData = {
                name: "distilbert",
                description: generalDesc.concat(descVader),
                averageScore: response.distibert.average_score,
                worstComm: {
                    author: response.distibert.worst_comm.author,
                    text: response.distibert.worst_comm.text,
                    publishedAt: response.distibert.worst_comm.published_at,
                    profileImageUrl: response.distibert.worst_comm.profile_image_url,
                    likeCount: response.distibert.worst_comm.like_count,
                    score: response.distibert.worst_comm.score,
                },
                bestComm: {
                    author: response.distibert.best_comm.author,
                    text: response.distibert.best_comm.text,
                    publishedAt: response.distibert.best_comm.published_at,
                    profileImageUrl: response.distibert.best_comm.profile_image_url,
                    likeCount: response.distibert.best_comm.like_count,
                    score: response.distibert.best_comm.score,
                }
            }


            return {
                vader,
                distilbert
            } as {
                [key: string]: ModelData
            }
        }

        catch (error) {
            console.log("[X] Error:" + error)
            return null;
        }
    }

    const data = await fetchVideoSentiment();

    if (!data) {
        return null;
    }

    return (
        <div className="flex-col flex gap-4">

            {Object.keys(data).map((model, index) => {

                return (
                    <ModelPart modelData={data[model]} key={"model_" + index} />
                )
            })}

        </div >
    )
}
