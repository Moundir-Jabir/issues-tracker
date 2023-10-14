import { NextRequest, NextResponse } from "next/server";
import {newIssueSchema} from '../../ValidationSchema'
import prisma from "@/prisma/client";

export async function POST(request: NextRequest){
    const body = await request.json()
    const validation = newIssueSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})
    const newIssue = await prisma.issue.create({
        data: body
    })
    return NextResponse.json(newIssue, {status: 201})
}