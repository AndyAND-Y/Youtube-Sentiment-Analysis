import Comment from "@/types/Comment"

type RawComment = {
    author: string,
    profile_image_url: string,
    text: string,
    like_count: number,
    published_at: string,
    score: number
}

export default function formatCommentObject(comment: RawComment): Comment {

    return {
        author: comment.author,
        profileImageUrl: comment.profile_image_url,
        text: comment.text,
        likeCount: comment.like_count,
        publishedAt: comment.published_at,
        score: comment.score
    }
}