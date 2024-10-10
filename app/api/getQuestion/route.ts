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
        let data: string | undefined = await generateSummaryAndQuiz(id);

        if (!data) {
            throw new Error('Failed to generate summary and quiz');
        }

        if (data.trim().startsWith("```json")) {
            data = data.replace(/```json|```/g, '').trim();
        }

        const json = JSON.parse(data);
        console.log(json);
        const endTime = Date.now();
        console.log(`Time taken: ${endTime - startTime}ms`);
        console.log("Time in Seconds: " + (endTime - startTime) / 1000);
        return NextResponse.json(json, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
