import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Context {
    params: {
        id: string
    }
}

export async function GET(request: NextRequest, {params: {id}}: Context) {
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    })
    if(!issue)
        return NextResponse.json({error: "Issue not found"}, {status: 404})
    return NextResponse.json(issue)
}