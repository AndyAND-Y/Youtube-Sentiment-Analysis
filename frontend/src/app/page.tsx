import SearchInput from "@/components/Input";
import Video from "@/components/video/Video";

export default function Home() {
    return (

        <main className="flex flex-col items-center justify-center">
            <div className="md:w-3/4 w-full flex flex-col items-center gap-8 p-8">
                <h1 className="text-2xl text-white font-semibold text-balance"> Check the sentiment of a Youtube video </h1>
                <SearchInput />
            </div>
            <Video />

        </main>
    );
}
