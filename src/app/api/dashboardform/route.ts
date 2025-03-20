import prisma from "../../../../prisma"
import {auth} from "../../../../auth"

export async function POST(request: Request) {

    const session = await auth()

    if(!session?.user) { 
        return Response.json({error: "user unauthorized" }, {status: 401})
    }

    // to parse the code below
    const body = await request.json() 

    const {title, content, image, nature, tech, health, gaming, food, sports, other} =  body; 
    // 

    try{ 
        const post = await prisma.posts.create({ 
            data: { 
                title, 
                content,
                image, 
                nature, 
                tech, 
                health,
                gaming,
                food, 
                sports,
                other,
                user: {
                    connect: { 
                        id: session.user.id
                    }
                }
            }
        })
        return Response.json({success: 'data sent successfully', post})

    } catch(error) { 
        console.error("an error occured", error)
        return Response.json({error: error.message}, {status: 500})
    }
}