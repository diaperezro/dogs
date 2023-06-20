const axios = require("axios")
const { Dog } = require("../db")
const { Temperament } = require("../db")
const { Op } = require('sequelize');


// Traer todas las razas (Home) , search Bar
const getAllDogs = async ( req , res) => {

    try {
        let { name } = req.query

    // SE TRAEN TODAS LAS RAZAS Y LUEGO SE DECIDE SI ES BUSQUEDA O TODAS SE NECESITAN TODAS
        // consulta DB ***
        let dogsDB = await Dog.findAll({
            attributes: [ "id", "image", "name", "height", "weight", "life_span", 'creacion'],
            include: [{
                model: Temperament,
                attributes: ['nombre'],
            }]
        })
            // Se limpia los temperamentos [ temp1, temp2, ... ] => "temp1, temp2, ..." 
            // y se guarda en una propiedad "temperament" que es la estandar API 
        dogsDB = dogsDB.map( dog =>{
            dog = {...dog.toJSON()}
            let temperaments = dog.Temperaments.map( temp => {
                return temp.nombre
            })
            temperaments = temperaments.join(", ")
            return {...dog, temperament: temperaments}
        })

        // consulta en la API
        const dogs = await (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=live_NvQ2yVkEFDjFB6jyaZo9qQxf3QYSYWolsuz4DcezHxujY7FtSTooi0ZZuLFH2Lxk`)).data
        const filtro_dogs = dogs.map( dog =>{
            
            // Algunos perros de la API no tenian TEMPEREMENTO, se les asigna uno => ( temperament: "No asignado" )
            if(!Object.keys(dog).includes('temperament')){
                dog = {...dog, temperament: "No asignado"}
            }
            
            // Algunos perros de la API no tenian PESO, se les asigna gigante => ( metric: "10000 - 10000" )
            if(dog.weight.metric.split(" ")[0].includes("NaN") || dog.weight.metric === "NaN" ){
                dog = {...dog,   weight: { metric: "10000 - 10000" }}
            }

            return(
                {
                    id:dog.id,
                    image:dog.image.url,
                    name:dog.name,
                    temperament:dog.temperament,
                    // Solo se extrae el peso en sistema metrico
                    weight:dog.weight.metric
                }
            )
        })

        // Se almacena la consulta DB + API
        const alldogs = [ ...dogsDB, ...filtro_dogs]

    // SE DIFERENCIA ENTRE CONSULTA DE BUSQUEDA Y USAR TODAS LAS RAZAS
        if(!name){
            res.status(200).json(alldogs)
        }
        else{
            // *** candidata a helper. (Estandarizar lo que se esta buscando)
            name = name.split(' ').map(word => word.split('')[0].toUpperCase() + word.slice(1)).join(' ')
            const filtroName = alldogs.filter( dog =>
                dog.name.includes(name)
            )
            res.status(200).json(filtroName)
        }

    } 
    catch (error) {
        res.status(400).json({error:error.message})
    }
}


// Crear perros (Form)
const setDogs = async ( req , res ) => {
    try {
        let { name, image, MinWeight, MaxWeight, MinHeight, MaxHeight, life_span_CI, life_span_CS, temperament } = req.body
        
        // *** candidata a helper. (Estandarizar lo que se esta creando)
        name = name.split(' ').map(word => word.split('')[0].toUpperCase() + word.slice(1)).join(' ')
        
        // *** candidata a helper. (Estandarizando life-span, weight, height)
        let life_span = life_span_CI + " - " + life_span_CS + " years"
        let weight = MinWeight + " - " + MaxWeight 
        let height = MinHeight + " - " + MaxHeight

        const newDog = await Dog.create({ image , name, height, weight, life_span })
        
        newDog.addTemperament(temperament)  
        res.status(200).json(newDog)  

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


// Traer la raza (Detail)
const getDogId = async ( req , res ) => {
    try {

        const { id } = req.params

        // Caso en el que id es un UUID. NaN(UUID) => true
        if (isNaN(id)) {

            // Consulta UNITARIA en la DB. 
            // Todos => incluya los temperamentos => solo el de cierto (id)
            let dogDB = await Dog.findAll({
                attributes: [ "id", "image", "name", "height", "weight", "life_span", 'creacion'],
                include: [{
                    model: Temperament,
                    attributes: ['nombre']
                }],
                where: {
                    id: {
                        [Op.eq]: id //
                    }
                }
            });

            // *** candidato a helper (hace el mismo filtro que en el primer handler)
            dogDB = dogDB.map( dog =>{
                dog = {...dog.toJSON()}
                let temperaments = dog.Temperaments.map( temp => {
                    return temp.nombre
                })
                temperaments = temperaments.join(", ")
                return {...dog, temperament: temperaments}
            })
        
            res.status(200).json(dogDB[0])
        }

        // Caso en el que id es un integer (API). NaN(id) => false
        else{

            let dogs = await (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=live_NvQ2yVkEFDjFB6jyaZo9qQxf3QYSYWolsuz4DcezHxujY7FtSTooi0ZZuLFH2Lxk`)).data
            
            // Filtro la raza de interes
            dogs = dogs.filter( dog => dog.id === parseInt(id))

            res.status(200).json({ 
                id:dogs[0].id,
                image:dogs[0].image.url, 
                name:dogs[0].name, 
                temperament:dogs[0].temperament, 
                weight:dogs[0].weight.metric, 
                life_span:dogs[0].life_span, 
                height:dogs[0].height.metric
            })
        
        }
    } 
    catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    getAllDogs,
    setDogs,
    getDogId,
}