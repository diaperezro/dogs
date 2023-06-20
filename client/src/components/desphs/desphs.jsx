import { useDispatch, useSelector } from "react-redux"
import { setFiltro } from "../../redux/actions/index"
import style from "./desphs.module.css"

export default function DespHs({filtroHs}){

    const dispatch = useDispatch()

    const allDogs = useSelector((state) => state.allDogs)

    function filtroHs(event) {
        const busqueda = event.target.value

        if (busqueda === 'creciente') {
            let filtrohs = allDogs.renderization.sort( (a,b) => {
                a = parseInt(a.weight.split(" - ")[0])
                b = parseInt(b.weight.split(" - ")[0])
                if (a < b) {
                    return -1;
                }
                else if ( a > b) {
                    return 1;
                }
                else {
                    return 0;
                }
            })
            dispatch(setFiltro([...filtrohs]))
        }
        else {
            let filtrohs = allDogs.renderization.sort( (a,b) => {
                a = parseInt(a.weight.split(" - ")[0])
                b = parseInt(b.weight.split(" - ")[0])
                if (a < b) {
                    return 1;
                }
                else if ( a > b) {
                    return -1;
                }
                else {
                    return 0;
                }
            })
            dispatch(setFiltro([...filtrohs]))
        }

    }
    
    return(
        <>
            <div className={style.select}>
                <select id="continents" onChange={filtroHs} className={style.desplegable} defaultValue="defaultOption">
                    <option value="defaultOption" disabled>Orden Health Score:</option>
                    <option value="creciente">Creciente</option>
                    <option value="decreciente">Decreciente</option>
                </select>
            </div>
        </>
    )
}