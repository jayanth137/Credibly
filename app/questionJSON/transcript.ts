import { YoutubeTranscript } from 'youtube-transcript';
// import fs from 'fs';

export async function fetchAndProcessTranscript(url: string) {
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(url);
        console.log("Transcript fetched successfully.");
        console.log("Transcript length:", transcript.length);
        console.log("RAW Transcript:", transcript, '\n');
        // Format and pretty - print the transcript
        console.log("=== YouTube Transcript ===");
        transcript.forEach((entry, index) => {
            console.log(`[${index + 1}] ${entry.text} (at ${entry.offset} seconds)`);
        });

        // const searchTerm = "music"; // Example: replace with user input
        // console.log(`\nSearching for the term "${searchTerm}" in the transcript...\n`);
        // const results = transcript.filter((entry) => entry.text.toLowerCase().includes(searchTerm.toLowerCase()));

        // if (results.length > 0) {
        //     results.forEach((entry) => {
        //         console.log(`[Match] ${entry.text} (at ${entry.offset} seconds)`);
        //     });
        // } else {
        //     console.log("No matches found.");
        // }

        // Save the transcript to a file
        const output = transcript.map((entry, index) => `[${index + 1}] ${entry.text} (at ${entry.offset} seconds)`).join("\n");
        // fs.writeFileSync("transcript.txt", output);
        // console.log("\nTranscript saved to 'transcript.txt'");
        return output;
    } catch (error) {
        console.error("An error occurred while fetching the transcript:", error);
    }
}

// Replace with the URL of the video you want to process
// const youtubeUrl = 'https://www.youtube.com/watch?v=ZDuRmhLSLOY';
// fetchAndProcessTranscript(youtubeUrl);
