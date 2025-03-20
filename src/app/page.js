"use client"

import BlogCards from "../components/blogCards/blogCards"
import Header from "../components/Header/Header"
import MainSection from "../components/MainSection/MainSection"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import appStyle from "./appStyle.css"


export default function Home() { 

  return(<>
    <div className="app-root" style={{padding: '5px 130px'}} id="blog-fusion-container-id">
      <MainSection/>
      <BlogCards/>
    </div>
  </>)
}