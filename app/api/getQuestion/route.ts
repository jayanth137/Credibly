export const maxDuration = 60;
import generateSummaryAndQuiz from "@/app/questionJSON/questionGenerator";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const startTime = Date.now();
        const body = await request.json();

        if (!body?.id) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        const id = body.id;

        let data: string | undefined;
        let attempt = 0;
        let maxAttempts = 2;

        while (attempt < maxAttempts) {
            try {
                data = await generateSummaryAndQuiz(id);
                if (data) break;
            } catch (error) {
                console.error(`Attempt ${attempt + 1} failed:`, error);
                if (attempt + 1 >= maxAttempts) {
                    return NextResponse.json({ error: 'Failed to generate summary and quiz after multiple attempts' }, { status: 500 });
                }
            }
            attempt++;
        }

        if (!data) {
            return NextResponse.json({ error: 'Failed to generate summary and quiz' }, { status: 500 });
        }

        if (data.trim().startsWith("```json")) {
            data = data.replace(/```json|```/g, '').trim();
        }

        const json = JSON.parse(data);
        console.log('JSON:', JSON.stringify(json, null, 4));
        const endTime = Date.now();
        console.log(`Time taken: ${endTime - startTime}ms`);
        return NextResponse.json(json, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
