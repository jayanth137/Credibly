import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/utils/config"

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const uploadData = await pinata.upload.json(data, {
            metadata: {
                name: 'asdfasdf'
            }
        })
        console.log(uploadData);
        const url = await pinata.gateways.createSignedURL({
            cid: uploadData.cid,
            expires: 3600,
        });
        // console.log(data)
        return NextResponse.json(url, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
