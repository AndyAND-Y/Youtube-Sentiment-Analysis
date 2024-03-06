import getBaseApiLink from '@/util/getBaseApiLink';
import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'Image'
export const size = {
    width: 1280,
    height: 720,
}

export const cache = "no-store";

export const contentType = 'image/png'

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const videoId = Array.isArray(searchParams.get('v')) ? searchParams.get('v')?.[0] : searchParams.get('v');

    const response = await fetch(getBaseApiLink() + videoId + "/sentiment", {
        next: {
            revalidate: 3600
        }
    })
        .then((res) => res.json())

    const score = response.vader.average_score.toFixed(2);

    if (!videoId) {
        return new ImageResponse(
            <div
                style={{
                    fontSize: 128,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                Hi!
            </div>
        )
    }

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: "column",
                    fontSize: "32",
                    fontWeight: 700,
                }}
            >

                <img
                    src={`https://i.ytimg.com/vi/${videoId}/hq720.jpg`}
                    style={{
                        width: "100%",
                        height: "90%"
                    }}
                />

                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: score > 0 ? "green" : "red",
                        color: "white",
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: "center",
                    }}

                    className='font-bold'
                >
                    {score}
                </div>

            </div >
        ), { ...size, }
    )
}