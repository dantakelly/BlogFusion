import prisma from "../../../../prisma"

export async function POST(request: Request) {
    
    const body = await request.json()

    const {email} = body; 

    try{ 
        const sendNewsLetter = await prisma.newsLetter.create({
            data: { 
                email
            }
        })
        return Response.json({success: 'data sent successfully', sendNewsLetter})

    } catch(error) { 
        console.error("an error occured", error)
        return Response.json({error: error.message}, {status: 500})
    }
}