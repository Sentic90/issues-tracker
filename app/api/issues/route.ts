import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IssueSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/AuthOptions";
  
// Public
export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}


// Secure
export async function POST(request: NextRequest) {
  const body = await request.json();

  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({error: "Unauthroized"}, {status:401})
  // Validate (400 BAD_REQUEST)
  const validation = IssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });


  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  // save...
  return NextResponse.json(newIssue, { status: 201 });
}
