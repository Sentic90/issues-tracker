import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from 'zod'
// import schema from "./schema";


const createIssueSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(1),
  });
  
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

//   // Check if user with given email already exist
//   const user = await prisma.issue.findUnique({
//     where: {
//       email: body.email,
//     },
//   });

//   if (user) return NextResponse.json({ error: "Issue already exist" });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  // save...
  return NextResponse.json(newIssue, { status: 201 });
}
