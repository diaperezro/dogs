//import Card from "./card"
import style from "./paginas.module.css" 
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

export default function Paginas({ setRender }){

    const allDogs = useSelector((state) => state.allDogs)
    const dogsOriginal = useSelector((state) => state.dogsOriginal)
    const [pag, setPag] = useState([])
    const [active,setActive] = useState({})

    function cambiarPag(event) {
        
        // RENDERIZACION DE DIFRENTES PARTES DEL ARREGLO
        // DE LAS RAZAS EN FUNCION DEL CLICKEO DE LAS PAGINAS
        
        const pag_destino = event.target.value
        
        // Este objeto sera el que guarde la info de que indice 
        // esta siendo activado.
        let objeto = {}

        const inicio = (9 * (pag_destino - 1))
        let final = (9 * (pag_destino))
        if (final > dogsOriginal.length) {
            final = dogsOriginal.length + 1
        }

        // Renderizo el rango en funcion del indice clickeado
        const rango = allDogs.renderization.slice(inicio, final)
        setRender(rango)

        // Reinicio todos los estilos de la paginacion a false
        // luego le doy estilo solamente al indice clickeado 
        for (const key in active) {
            objeto[key] = false
        }
        setActive({...objeto, [pag_destino]:true})

    }

    useEffect(() => {

        // RELACIONADO A LA RENDERIZACION DE LAS CARTAS EN
        // LA PAGINA 1

        if (allDogs.renderization) {
            
            // Muestre todo porque no llega a los 9
            if (allDogs.renderization.length < 9) {
                setRender(allDogs.renderization);
            }

            //Muestre solo los 9 primeros, ya que son mas de nueve
            else {
                setRender(allDogs.renderization.slice(0, 9));
            }
        }

        // -----------------------------------------------------------
        // CREACION ARREGLO DE PAGINACION E INICIALIZACION DE LOS 
        // ESTILOS EN EL INDICE 1 EN TRUE Y LOS DEMAS EN FALSE. 
        const contenedor = []

        // Limite de numero de paginas
        const stop = Math.ceil((allDogs.renderization.length / 9))

        // Muestre todo porque no llega a los 9
        if (stop < 1) {
            for (let i = 0; i < 1; i++) {
                contenedor[i] = i + 1
            }
            setPag(contenedor)
            setActive({active_1:true})
        }
        else {
            let objeto_act = {}
            for (let i = 0; i < stop; i++) {

                //Creo el arreglo con las paginas 
                contenedor[i] = i + 1

                if( (i+1) !== 1){
                    objeto_act[i+1] = false
                }
                else{ objeto_act[i+1] = true }
            }
            setPag(contenedor)
            setActive(objeto_act)
        }

    }, [allDogs])

    return(
        <>
            <hr></hr>
            <div className= {style.paginas}>
                <ul>
                    {pag?.map( pagina =>
                        <li onClick={cambiarPag} value={pagina} className={ active[pagina] ? style.active : style.notActive} key={pagina}>
                            {pagina}
                        </li>
                    )}
                </ul>
            </div>
            <br></br>
        </>
    )
}