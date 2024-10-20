export type jsonData = {
    title: string;
    description: string;
    author: string;
    tags: string[];
    thumbnail: string;
    validation: string;
    videoId: string;
    type: "video" | "playlist";
}