import CommentView from "@/components/Comment/Comment";
import ScoreBar from "../ScoreBar";
import Comment from "@/types/Comment";

interface ModelPartProps {
    modelData: {
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
                    <h3 className="text-2xl">Score</h3>
                </div>

                <div className="w-full">
                    <ScoreBar averageScore={modelData.averageScore} />
                </div>

                <div className="w-full flex gap-2 justify-between flex-col md:flex-row">
                    <CommentView comment={modelData.worstComm} />
                    <CommentView comment={modelData.bestComm} />
                </div>
            </div>
        </div>)
}