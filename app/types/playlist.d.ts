export type Thumbnail = {
    url: string;
    width: number;
    height: number;
};

export type Thumbnails = {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
};

export type Snippet = {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    localized: {
        title: string;
        description: string;
    };
};

export type PlaylistItem = {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
};

export type PageInfo = {
    totalResults: number;
    resultsPerPage: number;
};

export type Playlist = {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: PlaylistItem[];
};
