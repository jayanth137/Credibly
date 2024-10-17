export async function fetchChannelDescription(customUrl: string) {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API; // Accessing your API key from environment variables

    if (!apiKey) {
        console.error('YouTube API key is missing!');
        return;
    }

    try {
        // Step 1: Resolve custom URL to get channel ID
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${customUrl}&key=${apiKey}`;
        const searchResponse = await fetch(searchUrl);

        if (!searchResponse.ok) {
            throw new Error('Error fetching channel ID from custom URL');
        }

        const searchData = await searchResponse.json();

        if (!searchData.items || searchData.items.length === 0) {
            throw new Error('No channel found with the provided custom URL');
        }

        const channelId = searchData.items[0].snippet.channelId;

        // Step 2: Fetch the channel description using channel ID
        const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`;
        const channelResponse = await fetch(channelUrl);

        if (!channelResponse.ok) {
            throw new Error('Error fetching channel details');
        }

        const channelData = await channelResponse.json();

        if (!channelData.items || channelData.items.length === 0) {
            throw new Error('No channel details found');
        }

        const description = channelData.items[0].snippet.description;
        const profile = channelData.items[0].snippet.thumbnails.high.url;
        const name = channelData.items[0].snippet.title
        // console.log('Channel Description:', description);

        return {
            description: description,
            profile: profile,
            name: name,
        }; // Return the description or handle it as needed

    } catch (error: any) {
        console.error('Error:', error.message);
        throw new Error(error.message);
    }
}
