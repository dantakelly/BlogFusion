"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import HeaderStyle from "./HeaderStyle.css"
import { redirect, usePathname } from "next/navigation"
import blogPosts from "../blogArray"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import SearchIMG from "./assets/search.svg"
import SwitchTheme from "../theme-switch/switch"

const Header = () => { 

    const [isDisabled, setIsDisabled] = useState(true);

    const [changeIcon, setChaneIcon] = useState(!false)
    const handleChangeIcon = () => { 
        setChaneIcon(!changeIcon)
    }

    const {data: session} = useSession()
    const checkAuth = session?.user || null

    const pathname = usePathname(); 

    return(<div>
        <div style={changeIcon ? null : {background: 'none', width: '0'}} id="header-container-main">

        <div onClick={handleChangeIcon} style={changeIcon ? null : {width: '100em'}} id="hamburger-menu-top">
            {changeIcon ? (
                <CloseIcon className="hamburgerIcon" />
            ) : ( 
                <MenuIcon className="hamburgerIcon" />
            )}

            {/* <h1 style={changeIcon ? {display: 'block'} : {display: 'contents'}}>Blog<span>Fusion</span></h1> */}
          </div>
         
            {changeIcon ? (
                <>
                <h1 className="blog-logo">Blog<span>Fusion</span></h1>
            <ul>
                <Link style={pathname === '/' ? { color: 'var(--hardBlue)', textDecoration: 'underline' } : null} href="/">Home</Link>
                <Link style={pathname === '/blogs' ? { color: 'var(--hardBlue)', textDecoration: 'underline' } : null} href="/blogs">Blogs</Link>
                    <div className="line-header" style={{border: 'solid 1px var(--blacky)', height: '20px'}}></div>
                    <h4 className="head-date" style={{color: 'gray', fontFamily: 'cursive'}}>{new Date().toLocaleDateString()}</h4>
                <div>
                    {
                        checkAuth ? (
                            <div style={{display: 'flex', gap: '20px'}}>
                                    <button style={{color: 'var(--blacky)', padding: '3.5px 25px', cursor: 'pointer', backgroundColor: 'var(--lightBlue)', border: '3px solid var(--lightBlue)', borderRadius: '4px'}} onClick={() => signOut({redirectTo: '/'})}>logout</button>
                                <Link style={pathname === "/" || pathname === "/blogs" ? {display: 'block'} : {display: 'none'}} href="/dashboard">
                                    <button style={{color: 'var(--blacky)', padding: '3.5px 25px', cursor: 'pointer', backgroundColor: 'var(--lightBlue)', border: '3px solid var(--lightBlue)', borderRadius: '4px'}}>dashboard</button>
                                </Link>
                              </div>
                        ) : (
                            <div className="auth-section-head">
                                <Link style={pathname === '/auth/login' ? { color: 'var(--hardBlue)', fontWeight: 'bold' } : null} href="/auth/login">Login</Link>
                                <Link style={pathname === '/auth/signup' ? { color: 'var(--hardBlue)', fontWeight: 'bold' } : null} href="/auth/signup">Signup</Link>
                            </div>
                        )
                    }
                </div>
            </ul>
            <div className="search-and-mode-head">
            <div className="search-header">
                <input disabled={isDisabled}  placeholder={isDisabled ? "Disabled" : "Enter a topic"} style={isDisabled ? {cursor: 'not-allowed'} : ""}
                ></input>
                <Image src={SearchIMG} width={20} height={20} alt="search"></Image>
               </div>
                <SwitchTheme/>
            </div>
                </>
            ) : (
                null
            )}
            {/* Stop Here */}
        </div>

        {/* Responsive header
        <div id="responsive-head-container-main">

        </div> */}
    </div>)
}
export default Header; 