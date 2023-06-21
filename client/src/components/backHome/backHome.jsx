import { Link } from "react-router-dom"
import style from "./backHome.module.css"
export default function BackHome(){
    return(
        <div className={style.backhome}>
            <Link to='/home'><button>ir a home</button></Link>
        </div>
    )
}