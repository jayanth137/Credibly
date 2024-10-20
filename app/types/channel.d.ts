type Channel = {
    kind: string;
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: Array<{
        kind: string;
        etag: string;
        id: string;
        contentDetails: {
            relatedPlaylists: {
                likes: string;
                uploads: string;
            };
        };
    }>;
};
