
export default function getBaseApiLink() {

    if (process.env.NODE_ENV === "production") {
        return "https://ytb-sentiment-analysis.onrender.com/api/"
    }
    return "http://localhost:8000/api/"
}