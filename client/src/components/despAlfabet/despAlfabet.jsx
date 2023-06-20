import { useDispatch, useSelector } from "react-redux"
import { setFiltro } from "../../redux/actions/index"
import style from "./despAlfabet.module.css"

export default function DespAlfabet(){

    const dispatch = useDispatch()

    const allDogs = useSelector((state) => state.allDogs)

    function filtroAlf(event) {
        const busqueda = event.target.value
        let filtroalf = allDogs.renderization.sort((a, b) => {
            if ( a.name < b.name ) {
                return -1;
            }
            else if (a.name > b.name) {
                return 1;
            }
            else {
                return 0;
            }
        })
        if (busqueda === 'A-Z') {
            dispatch(setFiltro([...filtroalf]))
        }
        else {
            filtroalf = filtroalf.reverse()
            dispatch(setFiltro([...filtroalf]))
        }
    }

    return(
        <>
        <div className={style.select}>
            <select id="continents" onChange={filtroAlf} className={style.desplegable} defaultValue="defaultOption">
                <option value="defaultOption" disabled>Ordenar alfabeticamente:</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
        </div>
        </>
    )
}