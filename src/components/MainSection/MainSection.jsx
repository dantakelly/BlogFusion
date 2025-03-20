"use client"

import Image from "next/image"
import Link from "next/link"
import blogPosts from "../blogArray"
import MainSectionStyle from "./MainSectionStyle.css"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react"
import axios from "axios"
import Skeleton from "@mui/material/Skeleton";



const MainSection = () => {
    const [mainSectionData, setMainSectionData] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => { 
        axios.get('/api/blog_data', { 
        })
        .then(function (response) { 
            setMainSectionData(response.data)
            setLoading(false)
        })
        .catch(function(error) { 
            console.error('an error occured', error)
        })
    }, [])

    // Function to determine the category based on true value from the database
    const getIndustryCategory = () => {
        if (mainSectionData) {
            if (mainSectionData.nature) return "Nature";
            if (mainSectionData.tech) return "Tech";
            if (mainSectionData.health) return "Health";
            if (mainSectionData.gaming) return "Gaming";
            if (mainSectionData.food) return "Food";
            if (mainSectionData.sports) return "Sports";
            if (mainSectionData.other) return "Other";
        }
        return null;
    };


    return(<>
        <div id="Main-Section-Main-Cont">
                <div className="main-section-container">
                <div className="image-mainsection">
                    {loading ? (<Skeleton variant="rectangular" style={{width: '100%', height: '100%', backgroundColor: 'var(--lightBlue)'}} />
                    ): ( 
                        <Image src={mainSectionData.image} width={999} height={999} alt="img"></Image>
                    )}
                </div>
                {/*  */}
                <div className="infoSection-MainSection">
                    {loading ? (<Skeleton variant="rectangular" style={{backgroundColor: 'var(--lightBlue)', width: "80px", padding: "5px 10px", color: "var(--color)", borderRadius: "8px"}} />
                    ) : ( 
                        <p className="industry-mainsection" style={{backgroundColor: 'var(--hardBlue)', width: "fit-content", padding: "5px 10px", color: "var(--color)", borderRadius: "8px"}}>{getIndustryCategory()}</p>
                    )}
                    {loading ? (<Skeleton variant="text" style={{backgroundColor: 'var(--lightBlue)'}}/>
                    ) : ( 
                        <Link style={{color: 'black', textDecoration: 'none'}} href={`/post/id/${mainSectionData.id}`}><h1 className="blog-text-container">{mainSectionData.title}</h1></Link>
                    )}
                    <div className="miniProfile-MainSection">
                        <div className="the-profile-mainsection">
                            {loading ? (
                                <Skeleton variant="rectangular" style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--lightBlue)'}}/>
                            ) : ( 
                                <Avatar style={{width: '30px', height: '30px'}} alt="user name" src={mainSectionData.user?.image} />
                            )}
                            {loading ? ( 
                                <Skeleton variant="text" width={50}/>
                            ) : ( 
                                <Link style={{color: 'var(--blacky)', textDecoration: 'none'}} href={`/user/${mainSectionData.user?.name}`}><p className="auther-mainSection-author">{mainSectionData.user?.name}</p></Link>  
                            )}
                        </div>
                        {loading ? (<Skeleton variant="text" width={280}/> 
                        ) : ( 
                            <p className="dateUploaded-mainsection">{mainSectionData.createdAt}</p> 
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default MainSection;