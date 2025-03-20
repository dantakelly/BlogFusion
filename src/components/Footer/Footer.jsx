"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import InputSubscription from "../InputSubscription/InputSubscription"
import FooterStyle from "./FooterStyle.css"

import copyrightLogo from "./assets/copyright.svg"


export default function Footer() { 

    const pathname = usePathname(); 

    return(<>
        <div id="footer-container-master">
            <div className="topPart-footer">
            {/* about section */}
                <div className="about-and-contact-foot">
                    <div className="about-stion">
                        <h1>About</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                    </div>
                    <div className="contact-foot">
                        <h4>Email: <span style={{fontWeight: '300'}}>cultertraz@gmail.com</span></h4>
                        <h4>Phone: <span style={{fontWeight: '300'}}>1876 493-8471</span></h4>
                    </div>
                </div>
                {/*  */}
                {/* Link Section */}
                <div className="link-section-foot">
                    <div className="link1-foot">
                        <h4>Quick Link</h4>
                        <ul>
                            <Link style={pathname === '/' ? { color: 'var(--hardBlue)', textDecoration: 'underline' } : null} href="/">Home</Link>
                            <Link style={pathname === '/blogs' ? { color: 'var(--hardBlue)', textDecoration: 'underline' } : null} href="/blogs">Blogs</Link>
                                {/* <div style={{border: 'solid 1px var(--blacky)', height: '20px'}}></div> */}
                                <Link style={pathname === '/auth/login' ? { color: 'var(--hardBlue)', fontWeight: 'bold' } : null} href="/auth/login">Login</Link>
                                <Link style={pathname === '/auth/signup' ? { color: 'var(--hardBlue)', fontWeight: 'bold' } : null} href="/auth/signup">Signup</Link>
                        </ul>
                    </div>
                    <div className="link2-foot">
                        <h4>Category</h4>
                        <ul>
                            <Link style={pathname === '/categories/lifestyle' ? { color: 'var(--hardBlue)', textDecoration: 'underline'} : null} href="/">Lifestyle</Link>
                            <Link style={pathname === '/categories/technology' ? { color: 'var(--hardBlue)', textDecoration: 'underline' } : null} href="/">Technology</Link>
                            <Link style={pathname === '/categories/travel' ? { color: 'var(--hardBlue)', textDecoration: 'underline' } : null} href="/">Travel</Link>
                            <Link style={pathname === '/categories/business' ? { color: 'var(--hardBlue)', textDecoration: 'underline' } : null} href="/">Business</Link>
                            <Link style={pathname === '/categories/economy' ? { color: 'var(--hardBlue)', textDecoration: 'underline' } : null} href="/">Economy</Link>
                            <Link style={pathname === '/categories/sports' ? { color: 'var(--hardBlue)', textDecoration: 'underline' } : null} href="/">Sports</Link>   
                        </ul>
                    </div>
                </div>
                {/*  */}
                {/* Newsleeter Section */}
                <div className="newsletter-container-foot">
                    <div className="newsletter-text">
                        <h3>Weekly Newsletter</h3>
                        <p>Get blog articles and offers via email</p>
                    </div>
                    <InputSubscription/>
                </div>
                {/*  */}
            </div>

            {/* Bottom Section - footer */}
            <div className="bottomPart-footer">
             <div style={{width: '100%', height: '2px', backgroundColor: 'var(--lightBlue)'}}></div>
              <div className="bottomPart-content-foot">
                <div className="the-logo-section-foot">
                    <h1 style={{fontSize: '24px'}}>Blog<span style={{color: 'var(--hardBlue)'}}>Fusion</span></h1>
                    <div className="the-copyright-section">
                        <Image src={copyrightLogo} alt="copyright" width={20} height={20}></Image>
                        <p>BlogFusion {new Date().getFullYear()}. All Rights Reserved</p>
                    </div>
                </div>
                <div className="linki-footer-bottomPart">
                    <ul>
                        <Link href="#">Terms of Use</Link>
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Cookie Policy</Link>
                    </ul>
                </div>
              </div>
            </div>
        </div>
    </>)
}