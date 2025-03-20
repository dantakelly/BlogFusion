import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function GET(request: Request) { 
    try { 
        const allBlogPosts = await prisma.posts.findMany({
            orderBy: {
                createdAt: "desc"
            },
            select: { 
                id: true, 
                title: true,
                content: true, 
                image: true, 
                createdAt: true,
                nature: true,
                tech: true, 
                health: true, 
                gaming: true, 
                food: true,  
                sports: true,
                other: true, 
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        });

        return NextResponse.json(allBlogPosts);
    } catch (error: any) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
