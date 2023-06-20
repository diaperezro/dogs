import style from "./despTemp.module.css"
import { useDispatch, useSelector } from "react-redux"
import { setFiltro } from "../../redux/actions/index"


export default function DespTdieta(){

    const dispatch = useDispatch()

    const temps = useSelector((state) => state.temps)
    const allDogs = useSelector((state) => state.allDogs)

    function filtroTemp(event) {
        const busqueda = event.target.value
        const filtrotemp = allDogs.renderization.filter( dog => {
                return dog.temperament.includes(busqueda)
        })
        dispatch(setFiltro([...filtrotemp]))
    }
    return(
        <>
            <div className={style.select}>
                <select onChange={filtroTemp} className={style.desplegable} defaultValue="defaultOption">
                <option value="defaultOption" disabled>Selecciona un tipo de raza</option>
                
                    { temps?.map( temp =>
                        <option value= {temp} key={temp}>{temp}</option>
                    )}
                </select>
            </div>
        </>
    )
}
