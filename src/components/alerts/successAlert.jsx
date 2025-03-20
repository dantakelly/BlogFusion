"use client";

import { motion } from "framer-motion";
import Alert from "@mui/material/Alert";
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";
import axios from 'axios';


export const SuccessAlert = () => {

    const {data: session} = useSession();
    const theUser = session?.user.name; 

      const [titleData, setTitleData] = useState("")
    

    // This is to fetch the title data from the api
    useEffect(() => { 
        axios.get('http://localhost:3000/api/blog_title', {
        })
        .then(function (response) { 
          setTitleData(response.data.title) //title is what I am fetching from the api
        })
        .catch(function(error) { 
          console.error("error fetching data", error)
          console.log("error fetching data", error)
        })
      }, [])

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "absolute",
        padding: "0px 30px",
        width: "50%",
        top: '14.5%'
      }}
    >
      <Alert  style={{fontWeight: 'bold'}} severity="success">Hey {theUser}! your blog titled "{titleData}" was successfully published</Alert>
    </motion.div>
  );
};
