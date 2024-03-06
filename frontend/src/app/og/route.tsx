import getBaseApiLink from '@/util/getBaseApiLink';
import { ImageResponse } from 'next/og'

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const videoId = Array.isArray(searchParams.get('v')) ? searchParams.get('v')?.[0] : searchParams.get('v');

    if (!videoId) {
        return Response.json({ errorMessage: "No video id!" }, { status: 400 });
    }

    const getScore = async () => {
        const response = await fetch(getBaseApiLink() + videoId + "/sentiment", {
            next: {
                revalidate: 3600
            }
        })
            .then((res) => {
                if (res.status >= 400) {
                    return null;
                }
                return res
            })
            .then((res) => res?.json())

        if (!response) {
            return null;
        }

        const score = response.vader.average_score.toFixed(2);
        return score;
    }

    const score = await getScore();

    if (!score) {
        return Response.json({ errorMessage: "Invalid id!" }, { status: 400 });
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
        ), { width: 1200, height: 630 }
    )
}