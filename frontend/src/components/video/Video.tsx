"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function Video() {

    const [isLoading, setIsLoading] = useState(false);
    const videoRef = useRef<HTMLDivElement | null>(null);
    const videoId = useSearchParams().get('v');

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div ref={videoRef}>
            <iframe
                width="100%"
                height=""
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            >
            </iframe>
        </div>
    )

}