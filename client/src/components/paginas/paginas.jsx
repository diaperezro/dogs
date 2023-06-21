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
        const pag_destino  = event.target.dataset.value;
        let objeto = {}
        
        if( pag_destino !== "prev" && pag_destino !== "next"){
            // Este objeto sera el que guarde la info de que indice 
            // esta siendo activado.

            const inicio = (8 * (pag_destino - 1))
            let final = (8 * (pag_destino))
            if (final > dogsOriginal.length) {
                final = dogsOriginal.length + 1
            }
            console.log(inicio,final)
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
        else{
            let pag_destino_1
            let delta = 1
            for (const key in active) {
                if (active[key] ===  true) pag_destino_1 = parseInt(key);
            }

            if(pag_destino === "prev"){
                if(pag_destino_1 === 1) delta = 0 
                const inicio = (8 * ((pag_destino_1- delta) - 1))
                let final = (8 * (pag_destino_1 - delta))
                console.log(inicio,final)
                // Renderizo el rango en funcion del indice clickeado
                const rango = allDogs.renderization.slice(inicio, final)
                setRender(rango)
                for (const key in active) {
                    objeto[key] = false
                }
                setActive({...objeto, [pag_destino_1- delta]:true})
            }
            if(pag_destino === "next"){
                if(pag_destino_1 === Math.ceil((allDogs.renderization.length / 8)) ) delta = 0 
                const inicio = (8 * ((pag_destino_1 + delta) - 1))
                let final = (8 * (pag_destino_1 + delta))
                if (final > dogsOriginal.length) {
                    final = dogsOriginal.length + 1
                }
                console.log(inicio,final)
                // Renderizo el rango en funcion del indice clickeado
                const rango = allDogs.renderization.slice(inicio, final)
                setRender(rango)
                setRender(rango)
                for (const key in active) {
                    objeto[key] = false
                }
                setActive({...objeto, [pag_destino_1 + delta]:true})
            }
        }

    }

    useEffect(() => {

        // RELACIONADO A LA RENDERIZACION DE LAS CARTAS EN
        // LA PAGINA 1

        if (allDogs.renderization) {
            
            // Muestre todo porque no llega a los 9
            if (allDogs.renderization.length < 8) {
                setRender(allDogs.renderization);
            }

            //Muestre solo los 9 primeros, ya que son mas de nueve
            else {
                setRender(allDogs.renderization.slice(0, 8));
            }
        }

        // -----------------------------------------------------------
        // CREACION ARREGLO DE PAGINACION E INICIALIZACION DE LOS 
        // ESTILOS EN EL INDICE 1 EN TRUE Y LOS DEMAS EN FALSE. 
        const contenedor = []

        // Limite de numero de paginas
        const stop = Math.ceil((allDogs.renderization.length / 8))

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
                    <li onClick={cambiarPag} data-value= "prev">anterior</li>
                    {pag?.map( pagina =>
                        <li onClick={cambiarPag} data-value={pagina} className={ active[pagina] ? style.active : style.notActive} key={pagina}>
                            {pagina}
                        </li>
                    )}
                    <li onClick={cambiarPag} data-value= "next">siguiente</li>
                </ul>
            </div>
            <br></br>
        </>
    )
}