"use client";
import Comment from "@/types/Comment"
import Image from "next/image"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en";
import { useState } from "react";
import { motion } from "framer-motion";

interface CommentProps {
    comment: Comment
}

TimeAgo.addDefaultLocale(en);

export default function CommentView({ comment }: CommentProps) {

    const [showMore, setShowMore] = useState(false);

    return (
        <div
            className="flex gap-2 w-full p-4 flex-col"
        >
            <div className="flex items-center gap-1 border-b p-1 py-2">
                <Image
                    alt="Profile Image"
                    width="40"
                    height="40"
                    src={comment.profileImageUrl}
                    className="rounded-full w-10 h-10"
                />
                <div className="text-lg">
                    <p className="max-w-52 truncate">{comment.author}</p>
                </div>
            </div>
            <div className="flex gap-4">
                <p>Score: {comment.score.toFixed(2)}</p>
                <p>Likes: {comment.likeCount}</p>
                <p>{new TimeAgo("en-US").format(Date.parse(comment.publishedAt))}</p>
            </div>
            <div
                className="flex flex-col py-2 p-1 gap-2"
            >
                <motion.div

                    animate={{
                        height: showMore ? "100%" : "4.5rem"
                    }}
                    transition={{
                        duration: comment.text.length / 1000,
                        ease: "easeInOut"
                    }}
                    className="overflow-clip h-[4.5rem]"
                >
                    <p>{comment.text}</p>
                </motion.div>

                {
                    comment.text.split(" ").length >= 30 && (
                        <div className="flex justify-end">
                            <button
                                className="p-2 bg-neutral-800 rounded-full"
                                onClick={() => {
                                    setShowMore((prev) => !prev);
                                }}
                            >
                                {showMore ? "Show Less" : "Show More"}
                            </button>
                        </div>
                    )
                }

            </div>
        </div >
    )

}