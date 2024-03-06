import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SearchParams from "@/types/SearchParams";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"] })

export const metadata: Metadata = {
    title: "Youtube Comments Sentiment",
    description: "Check how people feel about a youtube video!",
    openGraph: {
        title: "Youtube Comments Sentiment",
        description: "Check how people feel about a youtube video!",
        siteName: "Youtube Comments Sentiment Analysis",
        type: "website",
        images: [{ url: "https://ytb-sentiment-analysis.vercel.app/og/?v=UyKtxsdI0z8" }]
    }
};

export async function generateMetadata(
    { searchParams }: { searchParams: SearchParams }
) {

    const videoId = searchParams

    return {
        title: "Youtube Comments Sentiment",
        description: "Check how people feel about a youtube video!",
        openGraph: {
            title: "Youtube Comments Sentiment",
            description: "Check how people feel about a youtube video!",
            siteName: "Youtube Comments Sentiment Analysis",
            type: "website",
            images: [{ url: "https://ytb-sentiment-analysis.vercel.app/og/?v=" }]
        }
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <div className="absolute left-0 right-0 h-full w-full">
                    <div className="relative h-full w-full bg-neutral-900">
                        <div className="relative min-h-screen bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
                            {children}
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
