import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../lib/prisma";

export const POST = async (req: NextRequest) => {
  const session = await auth();
  try {
    const { jobId } = await req.json();
    const userId = session?.user?.id as string;
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId: jobId,
      },
    });
    if (existingApplication) {
      return NextResponse.json({
        success: false,
        message: "You already Applied for this job",
      });
    }
    const newApplication = await prisma.application.create({
      data: {
        status: "PENDING",
        jobId: jobId,
        userId: userId,
      },
    });
    return NextResponse.json({
        success:true,
      message: "Applied Successfully",
      newApplication,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};
