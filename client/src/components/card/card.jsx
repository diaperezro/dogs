import {Link} from "react-router-dom"
//import Array from "../array"
import style from "./card.module.css" 


export default function Card({dog}){
    return(
        <div className={style.card}>

            <div className={style.img_contenedor}>
                <img src={dog.image}/>
            </div>
            <div className={style.contenido}>
                <div className={style.titulo}>
                    <Link to = { `/detail/${dog.id}` }><h1>{dog.name}</h1></Link>
                </div>
                <div className={style.informacion}>
                    <h5>{`Temperamentos : ${dog.temperament}`}</h5>
                    <h5>{`Peso [kg] : ${dog.weight}`}</h5>
                </div>
            </div> 
          
        </div>
    )
}