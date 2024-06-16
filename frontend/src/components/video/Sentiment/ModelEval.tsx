"use client";
import CommentView from "@/components/Comment/Comment";
import ScoreBar from "../ScoreBar";
import ModelData from "@/types/ModelData";
import { useState } from "react";
import Modal from "@/components/Modal";

interface ModelEvalProps {
    modelData: ModelData
}

function QuestionMarkIcon() {
    return (
        <svg className="fill-white w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
        </svg>
    )
}

export default function ModelEval({ modelData }: ModelEvalProps) {

    const [showModel, setShowModel] = useState(false);

    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-col gap-4 md:w-4/5 lg:w-3/5 w-11/12 p-4 bg-neutral-950 rounded-lg shadow-neutral-600 shadow-md hover:shadow-lg hover:shadow-neutral-600 transition-all duration-300">
                <div className="flex justify-center">
                    <h3 className="text-2xl flex gap-2 items-center">Score {modelData.name}
                        <div className="has-tooltip relative flex flex-col items-center">
                            <button
                                onClick={() => setShowModel(true)}
                            >
                                <QuestionMarkIcon />
                            </button>
                            <div className="tooltip -top-12 shadow-md shadow-neutral-600 p-2 bg-neutral-800 rounded-lg whitespace-nowrap text-base">More Information</div>
                        </div>
                        <div className="text-base">
                            <Modal
                                open={showModel}
                                onClose={() => setShowModel(false)}
                                title={"Description " + modelData.name}
                                description={modelData.description}
                            />
                        </div>
                    </h3>
                </div>



                <div className="w-full">
                    <ScoreBar averageScore={modelData.averageScore} />
                </div>

                <div className="w-full flex justify-between flex-col md:flex-row">
                    <div
                        className="flex flex-col w-full md:w-1/2 p-2"
                    >
                        <p className="text-xl font-semibold">Worst Comment </p>
                        <CommentView comment={modelData.worstComm} />
                    </div>
                    <div
                        className="flex flex-col w-full md:w-1/2 p-2"
                    >
                        <p className="text-xl font-semibold">Best Comment </p>
                        <CommentView comment={modelData.bestComm} />
                    </div>
                </div>
            </div>

        </div>)
}