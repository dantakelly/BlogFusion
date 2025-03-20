"use client"

import Authentication from "../../../components/authentication/AuthComponent";
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react";


const Signup = () => { 

    const {data: session} = useSession()
    const userId = session?.user?.name || null

    return(<>
        <Authentication
            onClick={() => signIn("google", {redirectTo: "/dashboard"})}
            authMethod = "Signup"
        />
    </>)
}
export default Signup;