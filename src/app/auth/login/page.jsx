"use client"

import { redirect } from "next/dist/server/api-utils";
import Authentication from "../../../components/authentication/AuthComponent";
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react";


const Login = () => { 

    const {data: session} = useSession()
    const userId = session?.user?.name || null

    return(<>
       <Authentication
            authMethod = "Login"
            onClick={() => signIn("google", {redirectTo: "/dashboard"})}
        />
    </>)
}
export default Login;