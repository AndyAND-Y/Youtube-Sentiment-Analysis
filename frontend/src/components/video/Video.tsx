import { Suspense } from "react"
import General from "./General"
import Sentiment from "./Sentiment/Sentiment"
import GeneralSkeleton from "./GeneralSkeleton"
import getBaseApiLink from "@/util/getBaseApiLink"

interface VideoProps {
    videoId: string
}

export default async function Video({ videoId }: VideoProps) {

    const models = await fetch(getBaseApiLink() + 'models')
        .then((res) => res.json())
        .then((data) => {
            return (data.models as string[])
        })

    return (
        <div className="w-full h-full flex gap-8 flex-col">
            <Suspense fallback={<GeneralSkeleton />}>
                <General videoId={videoId} />
            </Suspense>
            {
                models.map((model, index) => {
                    return (
                        <Suspense fallback={<div>Loading...</div>} key={"Sentiment " + model + " " + index} >
                            <Sentiment videoId={videoId} model={model} />
                        </Suspense>
                    )
                })
            }
        </div>
    )

}