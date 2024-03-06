import SearchParams from "@/types/SearchParams";

export default function getVideoId(searchParams: SearchParams): string | null {
    const videoId = Array.isArray(searchParams['v']) ? searchParams['v'][0] : searchParams['v'];
    if (!videoId)
        return null
    return videoId
}