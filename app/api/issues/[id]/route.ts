import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { newIssueSchema } from "@/app/ValidationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

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

export async function PATCH(request: NextRequest, {params: {id}}: Context) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({error: 'not authorised'}, {status: 401})
    const body = await request.json()
    const validation = newIssueSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    })
    if(!issue)
        return NextResponse.json({error: "Invalid Issue"}, {status: 404})
    const issueUpdated = await prisma.issue.update({
        where: {id: parseInt(id)},
        data: {
            title: body.title,
            description: body.description
        }
    })
    return NextResponse.json(issueUpdated)
}

export async function DELETE(request: NextRequest, {params: {id}}: Context) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({error: 'not authorised'}, {status: 401})
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    })
    if(!issue)
        return NextResponse.json({error: "Issue not found"}, {status: 404})
    await prisma.issue.delete({
        where: {id: parseInt(id)}
    })
    return NextResponse.json('Issue Deleted')
}