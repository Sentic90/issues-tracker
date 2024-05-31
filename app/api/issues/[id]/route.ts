import { NextRequest, NextResponse } from "next/server";
// import schema from "../schema";
import prisma from "@/prisma/client";
import {IssueSchema} from '@/app/validationSchemas'
import delay from "delay";
import authOptions from "@/app/auth/AuthOptions";
import { getServerSession } from "next-auth";
interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue Not Found" }, { status: 404 });

  return NextResponse.json(issue, { status: 200 });
}

export async function PATCH(request: NextRequest, { params }: Props) {
  // validate the request body
  const body = await request.json();

  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({error: "Unauthroized"}, {status:401})


  const validation = IssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const user = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!user)
    return NextResponse.json({ error: "Issue Not Found" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: user.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props) {

  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({error: "Unauthroized"}, {status:401})

  // get user from DB
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue Not Found" }, { status: 404 });

  // Delete a user
  await prisma.issue.delete({
    where: {
      id: parseInt(params.id),
    },
  });
  return NextResponse.json({});
}
