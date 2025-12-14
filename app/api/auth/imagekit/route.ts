import ImageKit from 'imagekit'
import config from "@/lib/config";
import { NextResponse } from "next/server";

// Ensure this route always runs on the server runtime
export const runtime = 'nodejs'

export async function GET() {
    try {
        const {
            env: {
                imagekit: { publicKey, urlEndpoint },
            },
        } = config

        const privateKey = process.env.IMAGEKIT_PRIVATE_KEY

        if (!publicKey || !urlEndpoint || !privateKey) {
            const missing = [
                !publicKey ? 'NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY' : null,
                !urlEndpoint ? 'NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT' : null,
                !privateKey ? 'IMAGEKIT_PRIVATE_KEY' : null,
            ].filter(Boolean)
            return NextResponse.json(
                {
                    error: 'ImageKit configuration is missing required env variables',
                    missing,
                },
                { status: 500 }
            )
        }

        const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint })

        return NextResponse.json(imagekit.getAuthenticationParameters())
    } catch (e: any) {
        return NextResponse.json(
            { error: e?.message || 'Failed to generate ImageKit auth parameters' },
            { status: 500 }
        )
    }
}


