// import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFiltro } from "../../redux/actions/index"
import style from "./despTcreat.module.css"


export default function DespTcreat() {
    
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.allDogs)

    function filtroCreat(event) {
        const busqueda = event.target.value
        if (busqueda === 'DB') {

            let filtrocreat = allDogs.renderization.filter( dog => {
                return Object.keys(dog).includes('creacion')
            })
            console.log(filtrocreat)
            // funcionalidad de devolverse si esta en ceros
            if (filtrocreat.length === 0) {
                filtrocreat = allDogs.tempFilter.filter(dog => {
                    return Object.keys(dog).includes('creacion')
                })
                dispatch(setFiltro([...filtrocreat]))
            }
            else { dispatch(setFiltro([...filtrocreat])) }

        }
        else {

            let filtrocreat = allDogs.renderization.filter( dog => {
                return !(Object.keys(dog).includes('creacion'))
            })
            // funcionalidad de devolverse si esta en ceros
            if (filtrocreat.length === 0) {
                filtrocreat = allDogs.tempFilter.filter( dog => {
                    return !(Object.keys(dog).includes('creacion'))
                })
                dispatch(setFiltro([...filtrocreat]))
            }
            else { dispatch(setFiltro([...filtrocreat])) }

        }
    }

    return (
        <>
            <div className={style.select}>
                <select id="continents" onChange={filtroCreat} className={style.desplegable} defaultValue="defaultOption">
                    <option value="defaultOption" disabled>Filtrar por creacion</option>
                    <option value="DB">Base de datos</option>
                    <option value="API">API</option>
                </select>
            </div>
        </>
    )
}
