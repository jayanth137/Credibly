import { pinata } from "@/utils/config";
import { PrismaClient } from "@prisma/client";
import { equal } from "assert";

export async function getCertification(cuid: string) {
    // const prisma = new PrismaClient()

    // const certificationDetails = await prisma.links.findUnique({
    //     where: {
    //         id: cuid
    //     }
    // })
    // console.log(certificationDetails)
    const data = await pinata.gateways.get(cuid)
    // console.log(data.data)
    return data.data
}