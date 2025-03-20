"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import PostStyle from "@/app/post/postStyle.css"
import blogArray from "@/components/blogArray"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'
import axios from "axios"

const Post = () => { 

  const [postData, setPostData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => { 
    axios.get('/api/all_blog_posts', { 
    })
    .then(function(responce) { 
      setPostData(responce.data)
      setLoading(false) 
    })
    .catch(function(error) { 
      console.error("an error occured", error)
    })
  }, [])


  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useParams();

  const postId = params.id
  const filteredPosts = postData.filter((post) => post.id.toString() === postId)

  const getIndustryCategory = (blog) => {
    if (blog) {
        if (blog.nature) return "Nature";
        if (blog.tech) return "Tech";
        if (blog.health) return "Health";
        if (blog.gaming) return "Gaming";
        if (blog.food) return "Food";
        if (blog.sports) return "Sports";
        if (blog.other) return "Other";
    }
    return null;
};

    return(<>
        <div id="post-container-main">
          {filteredPosts.map((Post, index) => ( 
          <div key={index} className="post-section-content-contaier">
            <div className="pandh1-of-post">
                <p style={{backgroundColor: 'var(--hardBlue)', width: "fit-content", padding: "5px 10px", color: "var(--color)", borderRadius: "8px"}}>{getIndustryCategory(Post)}</p>
                <h1>{Post.title}</h1>
            </div>
            <div className="profile-section-post" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--darkerGrey)'}} className="the-profile">
                    <Avatar style={{width: '30px', height: '30px'}} alt="Remy Sharp" src={Post.user?.image} />
                    <Link style={{color: 'var(--blacky)', textDecoration: 'none'}} href={`/user/${Post.user?.name}`}><p style={{color: 'var(--darkerGrey)'}} className="auther-mainSection-author">{Post.user?.name}</p></Link>
              </div>
              <p style={{color: 'var(--darkerGrey)'}}>{Post.createdAt}</p>
            </div>
            <div className="content-data-post">
                <div style={{width: '100%', height: '2px', backgroundColor: 'var(--darkerGrey)'}}></div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}} className="content-html-data" dangerouslySetInnerHTML={{ __html: Post.content }} />
            </div>
          </div>
          ))}
        </div>
    </>)
}
export default Post