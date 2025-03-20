import prisma from "../../../../prisma"

export async function GET(request: Request) { 

    try{ 
        const mainSection = await prisma.posts.findFirst({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true, 
                title: true, 
                nature: true,
                createdAt: true,
                tech: true, 
                health: true, 
                gaming: true, 
                food: true,  
                sports: true,
                other: true, 
                image: true,
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        })
        return Response.json(mainSection)

    } catch(error) {
        console.error("error fetching data", error)
        return Response.json({error: error.message}, {status: 500})
    }
}