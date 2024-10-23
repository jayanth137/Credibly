import { PrismaClient } from "@prisma/client";

export async function getCoursesByCreator(creatorId: string) {
    const prisma = new PrismaClient()
    const courses = await prisma.videos.findMany({
        where: {
            creatorId: creatorId
        }
    })
    console.log(creatorId)
    return courses
}