"use client"

import Avatar from '@mui/material/Avatar';
import blogArray from "@/components/blogArray"
import Link from 'next/link';
import Image from 'next/image';
import userStyle from "../userStyle.css"
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'
import BlogCards from '../../../components/blogCards/blogCards';
import blogCardStyle from "@/components/blogCards/blogCardsStyle.css"
import { useState, useEffect } from 'react';
import axios from 'axios';


import Facebook from "../assets/facebook.svg"
import x from "../assets/x.svg"
import Instagram from "../assets/insta.svg"
import Youtube from "../assets/youtube.svg"

export default function User() { 

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = useParams();

    const [userData, setUserData] = useState([])
      const [loading, setLoading] = useState(false)
    
      useEffect(() => { 
        axios.get('/api/all_blog_posts', { 
        })
        .then(function(responce) { 
          setUserData(responce.data)
          setLoading(false) 
        })
        .catch(function(error) { 
          console.error("an error occured", error)
        })
      }, [])
    
  
    const postId = decodeURIComponent(params.id)
    const filteredPosts = userData.filter((post) => 
      post.user?.name.toLowerCase().trim() === postId.toLowerCase().trim()
     );


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
        <div id="user-container-master">
           {filteredPosts.slice(0, 1).map((User, index) => ( 
            <div key={index} className="user-container-main">
            <div className='full-profile-container'>
            <div className="the-profile-userSection">
                <Avatar style={{width: '40px', height: '40px'}} alt="Remy Sharp" src={User.user?.image} />
                    <div className='user-name-occupation'>
                        <p style={{fontWeight: '550'}} className="auther-mainSection-author">{User.user?.name}</p>
                        <p style={{color: 'var(--darkerGrey)'}}><span style={{color: 'var(--hardBlue)', fontWeight: '600'}}>{getIndustryCategory(User)} enthusiast</span></p>
                  </div>
                </div>
                <div className='about-the-user-and-socials'>
                    <p>Meet <span style={{color: 'var(--hardBlue)', fontWeight: '600'}}>{User.user?.name}</span>, sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                    <div className='social-section-user'>
                    <Link href="" target='_blank'> <Image src={Facebook} width={30} height={30} alt='social-media'></Image> </Link>
                    <Link href="" target='_blank'> <Image src={x} width={30} height={30} alt='social-media'></Image> </Link>
                    <Link href="" target='_blank'> <Image src={Instagram} width={30} height={30} alt='social-media'></Image> </Link>
                    <Link href="" target='_blank'> <Image src={Youtube} width={30} height={30} alt='social-media'></Image> </Link>
                    </div>
                </div>
            </div>
            {/* Blogs of the user */}   
            <BlogCards />
          </div>
           ))}
        </div>
    </>)
}