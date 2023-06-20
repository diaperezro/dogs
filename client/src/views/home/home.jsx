import Cards from "../../components/cards/cards"
import Navbar from "../../components/navBar/navBar"
import DespTemp from "../../components/despTemp/despTemp"
import DespTcreat from "../../components/despTcreat/despTcreat"
import DespAlfabet from "../../components/despAlfabet/despAlfabet"
import DespHs from "../../components/desphs/desphs"
import Paginas from "../../components/paginas/paginas"
import style from "./home.module.css"
import axios from "axios"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDogs, getDietas, setDietsDB} from "../../redux/actions/index"
import { Link } from "react-router-dom"

export default function Home() {

    const dispatch = useDispatch()
    const temps = useSelector((state) => state.temps)

    const [render, setRender] = useState([])

    // Trae por primera vez los estados globales
    useEffect(() => {
        dispatch(getDogs())
        dispatch(getDietas())
    }, [dispatch])

    useEffect(() => {
        dispatch(setDietsDB(temps))
    }, [render])

    return (
        <div className={style.home}>

            {/* Barra de busqueda +  crear receta */}
            <div className={style.top}>
                <div  className={style.Navbar}>
                    <Navbar/>
                </div>
                <div  className={style.receta}>
                    <Link to="/newreciepe"><button>Crear una receta</button></Link>
                </div>
            </div>
            <br></br>

            {/* filtros */}
            <div className={style.filtros}>
                <span><DespTemp/></span>
                <span><DespTcreat/></span>
            </div>
            <br></br>

            {/* filtros orden*/}
            <div className={style.order}>
                <span><DespAlfabet/></span>
                <span><DespHs/></span>
            </div>
            <br></br>
            
            {/* Paginas */}
            <Paginas setRender={setRender} />
            <br></br>

            {/* Cartas */}
            <Cards allDogs={render} />

        </div>
    )
}
