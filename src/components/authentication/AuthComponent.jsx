import Image from "next/image"
import Link from "next/link"
import AuthStyle from "./AuthStyle.css"
import Google from "./assets/google.svg"


export default function Authentication({authMethod, onClick}) { 

    return(
        <div id="auth-container-master">
          <div style={{cursor: 'pointer', textDecoration: 'none'}} onClick={onClick}>
          <div className="auth-container-main">
             <div className="auth-init">
              <Image src={Google} width={30} height={30} alt="google img"></Image>
              <h2>{authMethod} with Google</h2>
             </div>
          </div>
          </div>
        </div>
    )
}