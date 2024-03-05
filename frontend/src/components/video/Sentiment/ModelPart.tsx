import CommentView from "@/components/Comment/Comment";
import ScoreBar from "../ScoreBar";
import Comment from "@/types/Comment";

interface ModelPartProps {
    modelData: {
        name: string,
        averageScore: number,
        worstComm: Comment,
        bestComm: Comment,
    }
}

export default function ModelPart({ modelData }: ModelPartProps) {
    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-col gap-4 md:w-4/5 lg:w-3/5 w-11/12 p-4 bg-neutral-950 rounded-lg shadow-neutral-600 shadow-md hover:shadow-lg hover:shadow-neutral-600 transition-all duration-300">
                <div className="flex justify-center">
                    <h3 className="text-2xl">Score {modelData.name}</h3>
                </div>

                <div className="w-full">
                    <ScoreBar averageScore={modelData.averageScore} />
                </div>

                <div className="w-full flex justify-between flex-col md:flex-row">
                    <div
                        className="flex flex-col w-full md:w-1/2 p-2"
                    >
                        <p className="text-xl font-semibold">Worst Comment {modelData.name}</p>
                        <CommentView comment={modelData.worstComm} />
                    </div>
                    <div
                        className="flex flex-col w-full md:w-1/2 p-2"
                    >
                        <p className="text-xl font-semibold">Best Comment {modelData.name}</p>
                        <CommentView comment={modelData.bestComm} />
                    </div>
                </div>
            </div>
        </div>)
}