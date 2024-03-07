

export default function VideoSkeleton() {

    return (
        <div className="w-full h-full flex gap-8 flex-col">
            <div className="w-full flex justify-center">
                <div className="flex flex-col gap-4 md:w-4/5 lg:w-3/5 w-11/12 p-4 bg-neutral-950 rounded-lg shadow-neutral-600 shadow-md hover:shadow-lg hover:shadow-neutral-600 transition-all duration-300">
                    <div className="aspect-video flex justify-center items-center animate-pulse rounded-lg">
                        <div className="sm:p-8 p-4 py-4 pb-2">
                            <svg className="w-10 h-10 text-neutral-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex justify-start w-full mt-2">
                        <div className="p-2 pl-0 w-full">
                            <div className="h-8 bg-neutral-400 rounded-full w-2/3 animate-pulse"></div>
                        </div>
                    </div>

                    <div className="flex justify-between animate-pulse">
                        <div className="w-32 h-6 bg-neutral-400 rounded-full"></div>
                        <div className="w-32 h-6 bg-neutral-400 rounded-full"></div>
                        <div className="w-32 h-6 bg-neutral-400 rounded-full"></div>
                    </div>

                </div>
            </div>
        </div>
    )

}