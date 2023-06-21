import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios";
import style from "./detail.module.css"
import BackHome from "../../components/backHome/backHome";

export default function Detail(){
    const {id} = useParams()
    const [ detalle , setDetalle ] = useState([])

    const obtenerDetalle = async () =>{
        const detail = (await axios.get(`http://localhost:3001/dog/${id}`)).data
        console.log(detail)
        setDetalle(detail)
    }

    useEffect(() => {
        obtenerDetalle()
    },[])

    return(
        <>
            <div className={style.titulo}>
                <h2>Detalle de la raza</h2>
            </div>  
            <div className={style.detail}>
                <div className={style.fotografia}>
                    <img src={detalle.image} alt="Imagen del perro"/>
                </div>
                
                <div className={style.informacion}>
                    <div className={style.name}>
                        <h1>{detalle.title}</h1>
                        <h3>{`Raza: ${detalle.name}`}</h3>                     
                    </div>

                    <div className={style.summary}>
                        <h5>{`Altura [CM] : ${detalle.height}`}</h5>
                        <h5>{`Peso [KG] : ${detalle.weight}`}</h5>
                        <h5>{`Temperamentos : ${detalle.temperament}`}</h5>
                    </div>
                    <div className={style.home}>
                        <BackHome/>
                    </div>
                </div>
            </div>

        </>
    )
}