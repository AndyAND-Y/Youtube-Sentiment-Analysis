import getBaseApiLink from "@/util/getBaseApiLink"
import ModelEval from "./ModelEval"
import ModelData from "@/types/ModelData"
import formatCommentObject from "@/util/formatCommentObject"

interface VideoSentimentProps {
    videoId: string,
    model: string,
}

export default async function Sentiment({ videoId, model }: VideoSentimentProps) {

    const fetchVideoSentiment = async (): Promise<ModelData> => {

        const response = await fetch(getBaseApiLink() + videoId + "/" + model, {
            next: {
                revalidate: 3600
            }
        })
            .then((res) => res.json())
            .then((data) => data)
        // const sleep = (s: number) => new Promise((resolve) => setTimeout(resolve, s * 1000));
        return {
            averageScore: response.average_score,
            bestComm: formatCommentObject(response.best_comm),
            worstComm: formatCommentObject(response.worst_comm),
            description: [model],
            name: model
        }
    }

    const modelData = await fetchVideoSentiment();
    modelData.name = model
    modelData.description = [model]

    return (
        <ModelEval modelData={modelData} />
    )


}
