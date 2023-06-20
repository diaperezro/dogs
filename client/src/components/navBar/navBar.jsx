import { useDispatch } from "react-redux"
import { useState } from "react"
import { getDogsByName } from "../../redux/actions/index"
import style from "./navbar.module.css"

export default function Navbar(){
    
    const dispatch = useDispatch()
    const [searchString, setsearchString] = useState("")
    
    function SearchChange(event) {
        setsearchString(event.target.value)
        // if (event.target.value.length === 1 || event.target.value.length === 0) {
        //     dispatch(setFiltro([...filtrodietDB, ...filtrodietAPI]))
        // }
    }

    function SearchSubmit(event) {
        event.preventDefault()
        dispatch(getDogsByName(searchString))
    }

    return(

        <div className={style.navbar}>

            <form onChange={SearchChange} className={style.form}>
                <input placeholder="Busqueda por raza"></input>
                <button type = 'submit' onClick={SearchSubmit}>Buscar</button>
            </form>

        </div>
        
    )
}
