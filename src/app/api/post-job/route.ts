import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../lib/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    const data = await req.json();
    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    const newPost = await prisma.job.create({
      data: {
        ...data,
        userid: session?.user?.id,
      },
    });
    return NextResponse.json({
      message: "New Job added Successfully",
      newPost,
    });
  } catch (error) {
    console.log(error);
    NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};


