import Comment from "./Comment";

type ModelData = {
    name: string,
    description: string[],
    averageScore: number,
    worstComm: Comment,
    bestComm: Comment,
}

export default ModelData;