import Card from "../card/card"
import style from "./cards.module.css" 
export default function Cards({allDogs}){

    let rsBusqueda = ''
    if( allDogs.length === 0 ) rsBusqueda = 'No se encontraron resultados para tu busqueda'

    return(
        <>
        <h2>{rsBusqueda}</h2>
        <div className={style.cards} >
            { allDogs?.map( dog =>
                <Card dog={dog} key={dog.id}/>
            )}
        </div>
        </>
    )
}