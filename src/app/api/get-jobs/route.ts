import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export const GET = async () => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { postedAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({
      jobs,
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
