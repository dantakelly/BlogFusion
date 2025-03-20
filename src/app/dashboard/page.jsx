"use client"

import Tiptap from "@/components/textEditor/textEditor"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Dashboard() { 
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") {
      // Optionally, you can show a loading spinner or something while checking the session
      return
    }
    
    if (!session) {
      // If the user is not authenticated, redirect them to the login page
      router.push("/auth/login")
    }
  }, [session, status, router])

  return (
    <>
      {session && <Tiptap />} {/* Only render Tiptap if the user is authenticated */}
    </>
  )
}
