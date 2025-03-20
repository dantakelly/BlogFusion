"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import blogCardsStyle from "./blogCardsStyle.css"
import axios from "axios"
import Avatar from '@mui/material/Avatar'
import { usePathname } from "next/navigation"
import { Skeleton } from "@mui/material"

export default function BlogCards({ author }) {
    const [blogsData, setBlogsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [blogLimit, setBlogLimit] = useState(9)
    const pathname = usePathname()

    useEffect(() => { 
        axios.get('/api/all_blog_posts')
            .then(response => {
                setBlogsData(response.data)
                setLoading(false)
                setBlogLimit(response.data.length > 9 ? 9 : response.data.length)
            })
            .catch(error => console.error("An error occurred", error))
    }, [])

    useEffect(() => {
        setBlogLimit(pathname === '/blogs' ? blogsData.length : 9)
    }, [pathname, blogsData])

    // Extract user ID from the URL if on a user-specific blog page
    const userId = pathname.startsWith("/user/") ? decodeURIComponent(pathname.split("/")[2]) : null;

    // Filter blogs based on the user ID or author prop
    const filteredBlogs = userId 
    ? blogsData.filter(blog => 
        blog.user?.name?.toLowerCase().trim() === userId.toLowerCase().trim()
    )
    : blogsData;

    const getIndustryCategory = (blog) => {
        if (!blog) return null
        return blog.nature ? "Nature"
            : blog.tech ? "Tech"
            : blog.health ? "Health"
            : blog.gaming ? "Gaming"
            : blog.food ? "Food"
            : blog.sports ? "Sports"
            : "Other"
    }

    return (
        <div id="carrds-blogs-main-container">
            <h2 style={{color: 'var(--blacky)'}}>
                {pathname === "/blogs"
                    ? "All Blog Posts"
                    : userId ? (
                        <>
                            Latest Blog Posts from{" "}
                            <span style={{ color: "var(--hardBlue)", fontWeight: "bold" }}>
                                {userId}
                            </span>
                        </>
                    ) : "Latest Post"}
            </h2>

            <div className="the-blog-cards-container">
                {filteredBlogs.slice(0, blogLimit).map((Blog, index) => (
                    <div key={index} className="the-blog-cards-container-actual">
                        {loading ? (
                            <Skeleton variant="rectangular" width={360} height={240} style={{ backgroundColor: 'var(--lightBlue)', borderRadius: '8px' }} />
                        ) : (
                            <Image className="blogCards-blog" src={Blog.image} alt="blog-image" width={360} height={240} />
                        )}
                        <div className="text-in-card-cont">
                            {loading ? (
                                <Skeleton variant="rectangular" width={80} height={20} style={{ backgroundColor: 'var(--lightBlue)', borderRadius: '3px' }} />
                            ) : (
                                <p style={{ backgroundColor: 'var(--lightBlue)', color: 'var(--hardBlue)', padding: '3px 5px', width: 'fit-content', borderRadius: '7px' }}>
                                    {getIndustryCategory(Blog)}
                                </p>
                            )}
                            {loading ? (
                                <Skeleton variant="text" width={150} height={28} style={{ backgroundColor: 'var(--lightBlue)', borderRadius: '3px' }} />
                            ) : (
                                <Link style={{ color: 'var(--blacky)', textDecoration: 'none' }} href={`/post/id/${Blog.id}`}>
                                    <h1 className="blog-text-container">{Blog.title}</h1>
                                </Link>
                            )}
                        </div>
                        <div className="miniProfile-MainSection">
                            <div className="the-profile-mainsection">
                                {loading ? (
                                    <Skeleton variant="rectangular" width={40} height={40} style={{ backgroundColor: 'var(--lightBlue)', borderRadius: '50%' }} />
                                ) : (
                                    <Avatar style={{ width: '30px', height: '30px' }} alt="User Avatar" src={Blog.user?.image} />
                                )}
                                {loading ? (
                                    <Skeleton variant="text" width={80} height={28} style={{ backgroundColor: 'var(--lightBlue)', borderRadius: '3px' }} />
                                ) : (
                                    <Link style={{ color: 'var(--blacky)', textDecoration: 'none' }} href={`/user/${Blog.user?.name}`}>
                                        <p className="auther-mainSection-author">{Blog.user?.name}</p>
                                    </Link>
                                )}
                            </div>
                            {loading ? (
                                <Skeleton variant="text" width={170} height={28} style={{ backgroundColor: 'var(--lightBlue)', borderRadius: '3px' }} />
                            ) : (
                                <p>{Blog.createdAt}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {blogLimit < blogsData.length ? (
                <button onClick={() => setBlogLimit(blogsData.length)}>Load More</button>
            ) : (
                <button onClick={() => setBlogLimit(9)}>Show Less</button>
            )}
        </div>
    )
}
