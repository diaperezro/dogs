
export function validation( form, error, setError ){

    const name = form.name
    const image = form.image
    const MinWeight = parseInt(form.MinWeight)
    const MaxWeight = parseInt(form.MaxWeight)
    const MinHeight = parseInt(form.MinHeight)
    const MaxHeight = parseInt(form.MaxHeight)
    const life_span_CI = parseInt(form.life_span_CI)
    const life_span_CS = parseInt(form.life_span_CS)
    const temperament = form.temperament

    const regex_name = /^[A-Za-z\s]+$/g
    const regex_image = /^https:\/\/.*\.(jpg|jpeg|png|gif|bmp)$/i

    let error_name = ''
    let error_image = ''
    let error_MinWeight = ''
    let error_MaxWeight = ''
    let error_MinHeight = ''
    let error_MaxHeight = ''
    let error_life_span_CI = ''
    let error_life_span_CS = ''
    let error_temperament = ''

    if (regex_name.test(name) || name === '') error_name = ''
    else { error_name = 'La raza solo puede tener letras y espacios' }

    if (regex_image.test(image) || image === '') error_image = ''
    else { error_image = 'La URL que ingresaste no corresponde a la de una imagen' }

    if (MinWeight > MaxWeight) error_MaxWeight = 'El peso maximo no puede ser menor al minimo' 
    else{ error_MinWeight = ''; error_MaxWeight = ''}

    if (MinHeight > MaxHeight) error_MaxHeight = 'La altura maxima no puede ser menor a la minima'
    else { error_MinHeight = ''; error_MaxHeight = '' }

    if (life_span_CI > life_span_CS) error_life_span_CS = 'La vida maxima no puede ser menor que la vida minima'
    else { error_life_span_CI = ''; error_life_span_CS = ''      }

    if (temperament.length !== 0) {
        error_temperament = ''
    }

    setError({
        ...error,
        name: error_name,
        image: error_image,
        MinWeight: error_MinWeight,
        MaxWeight: error_MaxWeight,
        MinHeight: error_MinHeight,
        MaxHeight: error_MaxHeight,
        life_span_CI: error_life_span_CI,
        life_span_CS: error_life_span_CS,
        temperament: error_temperament,
    })

}

export function validation_submit(setForm, form , error, setError){
    if (form.name === '') {
        setError({ ...error, name: "Debes completar este campo" })
    }
    else if (form.image === '') {
        setError({ ...error, image: "Debes completar este campo" })
    }
    else if(Object.values(form).includes(0)){ 
        for (const key in form) {
            if (form[key] === 0) {
                setError({ ...error, [key]: "Este campo no puede ser igual a 0" })
                break
            }
        }
    }
    else if (form.temperament.length === 0) {
        setError({ ...error, temperament: "Debes completar este campo" })
    }

    else{
        window.alert("Raza creada de forma correcta")
        crearDog(form.name, form.image, form.MinWeight, form.MaxWeight, form.MinHeight, form.MaxHeight, form.life_span_CI, form.life_span_CS, form.temperament)
        setForm({
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
    }

}


// OJO ESTO DEBERIA ESTAR EN OTRO LADO ESTO SOLO VALIDACION
async function crearDog(name, image, MinWeight, MaxWeight, MinHeight, MaxHeight, life_span_CI, life_span_CS, temperament) {
    fetch('http://localhost:3001/dog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, 
            image, 
            MinWeight, 
            MaxWeight, 
            MinHeight, 
            MaxHeight, 
            life_span_CI, 
            life_span_CS, 
            temperament
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}