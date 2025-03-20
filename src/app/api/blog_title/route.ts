import prisma from "../../../../prisma"
import {auth} from "../../../../auth"

export async function GET(request: Request) {

    const session = await auth()

    if(!session?.user) { 
        return Response.json({error: "user unauthorized" }, {status: 401})
    }

    try{ 
        const blogPosts = await prisma.posts.findFirst({ 
            where: { 
                userId: session.user.id
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: { 
                title: true
            }
        })
        return Response.json(blogPosts)

    } catch(error) { 
        return Response.json({error: error.message}, {status: 500})
        return Response.json({error: error.message}, {status: 404})
    }
}