import { NextRequest, NextResponse } from "next/server";
// import schema from "../schema";
import prisma from "@/prisma/client";

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

// export async function PUT(request: NextRequest, { params }: Props) {
//   // validate the request body
//   const body = await request.json();

//   const validation = schema.safeParse(body);
//   if (!validation.success)
//     return NextResponse.json(validation.error.errors, { status: 400 });

//   const user = await prisma.user.findUnique({
//     where: {
//       id: params.id,
//     },
//   });
//   if (!user)
//     return NextResponse.json({ error: "User Not Found" }, { status: 404 });

//   const updatedUser = await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       name: body.name,
//       email: body.email,
//     },
//   });
//   return NextResponse.json(updatedUser, { status: 200 });
// }

// export async function DELETE(request: NextRequest, { params }: Props) {
//   // get user from DB
//   const user = await prisma.user.findUnique({
//     where: {
//       id: params.id,
//     },
//   });

//   if (!user)
//     return NextResponse.json({ error: "User Not Found" }, { status: 404 });

//   // Delete a user
//   await prisma.user.delete({
//     where: {
//       id: user.id,
//     },
//   });
//   return NextResponse.json({});
// }
