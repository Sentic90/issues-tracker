import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "@/app/validationSchemas";
  
export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate (400 BAD_REQUEST)
  const validation = createIssueSchema.safeParse(body);
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
