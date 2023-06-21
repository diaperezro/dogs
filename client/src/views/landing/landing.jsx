import style from "./landing.module.css"
import BackHome from "../../components/backHome/backHome"

export default function Landing(){
    return(
            <div className={style.fondo} >
                <div className={style.home}>
                    <BackHome/>
                </div>
            </div>
    )
}