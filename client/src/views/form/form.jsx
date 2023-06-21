import { useState } from "react"
import { useSelector } from "react-redux"
import style from "./form.module.css"
import { validation, validation_submit } from "./validations"
import BackHome from "../../components/backHome/backHome"


export default function Form() {

    const temps = useSelector((state) => state.temps)

    const [form, setForm] = useState({
        name: "",
        image: "",
        MinWeight: 0,
        MaxWeight: 0,
        MinHeight: 0,  
        MaxHeight: 0,
        life_span_CI: 0,
        life_span_CS: 0,
        temperament: [],
    })

    const [error, setError] = useState({
        name: "",
        image: "",
        MinWeight: "",
        MaxWeight: "",
        MinHeight: "",  
        MaxHeight: "",
        life_span_CI: "",
        life_span_CS: "",
        temperament: "",
    })

    function clickTemp(event) {
        
        // Elimina los temperamentos cuando el usuario quiere
        const temperamento = event.target.value
        const posicion = temps.indexOf(temperamento ) + 1
        const filtro = form.temperament.filter( temper =>{
            return temper !== posicion   
        })
        setForm({...form,temperament:filtro})
    }

    function handleChange(event) {

        // Actualiza el formulario en funcion de la info ingresada 
        let var_cambio = event.target.name
        let cambio = event.target.value

        // Vuelve los valores enteros 
        if(var_cambio !== 'name' && var_cambio !== 'image' && var_cambio !== 'temperament'){
            cambio = parseInt(cambio)
        }

        // Ingresa los temperamentos elegidos
        if (var_cambio === 'temperament') {
            if(!form.temperament.includes(cambio)){
                const posicion = temps.indexOf(cambio) + 1 
                cambio = [...form.temperament, posicion ]
            }
        }
        setForm({ ...form, [var_cambio]: cambio })
        validation({ ...form, [var_cambio]: cambio }, error, setError)
    }

    function handleSubmit(event) {
        event.preventDefault()
        validation_submit(setForm, form , error, setError) 
    }

    return (
        <div className={style.page}>
            <h1>Henry Dogs</h1>

            <div className={style.formulario}>
                <BackHome/>
                <hr></hr>
                <br></br>
                <form onChange={handleChange} className={style.principal}>
                    <div><h2> Crea tu propia raza </h2></div>
                    <div>
                        <div className={style.entrada}>
                            <label><h4>Raza:</h4></label>
                            <input value = {form.name} name="name" className={style.cajasBasicas} placeholder="Ingresa la raza del perro"></input>
                        </div>
                        <span>{error.name}</span>
                        <br />

                        <div className={style.entrada}>
                            <label><h4>Imagen:</h4></label>
                            <input value = {form.image} name="image" className={style.cajasBasicas} placeholder="Ingresa la url de la imagen"></input>
                        </div>
                        <span>{error.image}</span>
                        <br />

                        <div className={style.entrada}>
                            <label><h4>Peso minimo:</h4></label>
                            <input value = {form.MinWeight} name="MinWeight" type="number" min="0" max="1000" step="1" className={style.cajasBasicas} placeholder="Ingresa el peso minimo del perro"></input>
                        </div>
                        <span>{error.MinWeight}</span>
                        <br />

                        <div className={style.entrada}>
                            <label><h4>Peso maximo:</h4></label>
                            <input value = {form.MaxWeight} name="MaxWeight" type="number" min="0" max="1000" step="1" className={style.cajasBasicas} placeholder="Ingresa el peso maximo del perro"></input>
                        </div>
                        <span>{error.MaxWeight}</span>
                        <br />

                        <div className={style.entrada}>
                            <label><h4>Altura minima:</h4></label>
                            <input value = {form.MinHeight} name="MinHeight" type="number" min="0" max="101" step="1" className={style.cajasBasicas} placeholder="Ingresa la altura minima del perro"></input>
                        </div>
                        <span>{error.MinHeight}</span>
                        <br />

                        <div className={style.entrada}>
                            <label><h4>Altura maxima:</h4></label>
                            <input value = {form.MaxHeight} name="MaxHeight" type="number" min="0" max="101" step="1" className={style.cajasBasicas} placeholder="Ingresa la altura maxima del perro"></input>
                        </div>
                        <span>{error.MaxHeight}</span>
                        <br />

                        <div className={style.entrada}>
                            <label><h4>Esparanza de vida (cota inferior):</h4></label>
                            <input value = {form.life_span_CI} name="life_span_CI" type="number" min="0" max="101" step="1" className={style.cajasBasicas} placeholder="Esparanza de vida (cota inferior)"></input>
                        </div>
                        <span>{error.life_span_CI}</span>

                        <div className={style.entrada}>
                            <label><h4>Esparanza de vida (cota superior):</h4></label>
                            <input value = {form.life_span_CS} name="life_span_CS" type="number" min="0" max="101" step="1" className={style.cajasBasicas} placeholder="Esparanza de vida (cota superior)"></input>
                        </div>
                        <span>{error.life_span_CS}</span>
                    </div>
                    
                    <div className={style.temps}><h4>Temperamentos:</h4></div>
                    <div className={style.select}>
                        <select name="temperament" className={style.desplegable} defaultValue="defaultOption">
                            <option value="defaultOption" disabled>Selecciona los temperamentos asociados a tu raza:</option>
                            {temps?.map(temp => (
                                <option key={temp}>{temp}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        {form.temperament?.map( temper => (
                            <option onClick={clickTemp} key={temps[temper-1]}>{temps[temper-1]}</option>
                        ))}
                    </div>
                    <br></br>
                    <span>{error.temperament}</span>
                    <hr></hr>

                </form>
                <button type="submit" onClick={ handleSubmit } className={style.botons}> Crear raza </button>
            </div>
        </div>
    )
}