import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") as string;
    const location = searchParams.get("location") as string;
    const result = await prisma.job.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
        location: {
          contains: location,
          mode: "insensitive",
        },
      },
      include:{
        user:{
            select:{
                name:true
            }
        }
      }
    });
    return NextResponse.json({
        result
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
        message:"Internal server error"
    },{
        status:500
    })
  }
};
