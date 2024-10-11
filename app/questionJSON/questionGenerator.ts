import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchAndProcessTranscript } from "./transcript";
import fs from "fs";

dotenv.config();

export default async function generateSummaryAndQuiz(id: string) {
    try {
        const geminiKey = process.env.GEMINI_KEY;
        if (!geminiKey) {
            throw new Error("GEMINI_KEY is not defined in the environment variables.");
        }
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const transcript = await fetchAndProcessTranscript('https://www.youtube.com/watch?v=' + id);
        console.log("transcript" + transcript);
        const prompt = `Summarize the YouTube video and generate a technical quiz of 10 questions in JSON format based on the content of the video. 

**Instructions for the quiz**:
1. Generate **10 standard multiple-choice questions** where there is one correct answer.
3. For each question, include the **timestamp intervals** from the video that correspond to the section containing the answer.
4. Include an **answer key** at the end.

In addition to the quiz:
1. Provide a **coding project** based on the video content.
2. Specify the **tech stack** (e.g., programming languages, libraries, and tools) used in the video.
3. Outline **objectives** for the project, including what the learner is expected to implement.
4. Provide a **directory structure** that organizes the code and files properly for the project.
5. List the **steps** required to set up the base structure of the code (i.e., basic setup, folder creation, dependencies, etc.).
6. Write **test cases** for each project objective to check if the learner's implementation meets the requirements.

### Example JSON Structure for Quiz + Coding Project:
{
    "summary": "A brief summary of the video content.",
    "questions": [
        {
            "question": "What is the capital of France?",
            "options": [
                {
                    "option": "Paris",
                },
                {
                    "option": "London",
                },
                {
                    "option": "Berlin",
                },
                {
                    "option": "Madrid",
                }
            ],
            "correct": "Paris",
            "timeStamp": "00:00:00 - 00:00:10"
        }
    ],
    "answerKey": {
        "1": "Paris",
        "2": "Answer 2",
        "3": "Answer 3",
        ...
    },
    "codingProject": {
        "techStack": ["JavaScript", "Node.js", "Express", "MongoDB"],
        "objectives": [
            "Build a REST API for user management.",
            "Implement CRUD operations for users.",
            "Add JWT-based authentication."
        ],
        "directoryStructure": {
            "root": "/",
            "directories": [
                "src/",
                "src/controllers/",
                "src/models/",
                "src/routes/",
                "tests/"
            ],
            "files": [
                "src/index.js",
                "src/controllers/userController.js",
                "src/models/userModel.js",
                "src/routes/userRoutes.js",
                "tests/userTests.js"
            ]
        },
        "setupSteps": [
            "Initialize the project with 'npm init'.",
            "Install Express, Mongoose, and JWT packages.",
            "Create the 'src / ' directory with subfolders for models, routes, and controllers.",
            "Create a test folder for unit tests."
        ],
        "testCases": [
            {
                "objective": "Check if the API creates a new user.",
                "test": "Send a POST request to '/ api / users' and expect a 201 response."
            },
            {
                "objective": "Verify that the API updates an existing user.",
                "test": "Send a PUT request to '/ api / users /: id' and check if the user data is updated."
            },
            {
                "objective": "Ensure that unauthenticated requests are denied.",
                "test": "Send a request to a protected route without a JWT and expect a 401 response."
            }
        ]
    }
}

 ` + transcript;

        console.log("Generating content based on the following prompt:", prompt);
        const result = await model.generateContent(prompt);

        // console.log(result.response.text());
        // return result as json.
        return result.response.text();
        // Save the generated content to a file as a JSON object
        // fs.writeFileSync("content.json", result.response.text());
        console.log("Content saved to 'content.json'");
    } catch (error) {
        console.error("Error generating content:", error);
    }
}