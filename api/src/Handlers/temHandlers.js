const axios = require("axios")
const { Temperament } = require("../db")

const setTem = async ( req , res ) => {
    
    try {
        // Recibo el arreglo con los temps desde el front
        const {nombre} = req.body
        console.log("nombre:")
        console.log(nombre)
        if(nombre.length !== 0){
            // Transformo el arreglo en un arreglo de objetos con propiedad 
            //"nombre" de tal forma que bulkcreate pueda hacer su magia.
            console.log("entre al temps no vacio")
            const allTemps = nombre.map((nombreItem) => ({ nombre: nombreItem }));
            // Si no hay temperamentos en la base de datos los creo.
            const temperamentos_DB = await Temperament.count()
            if(temperamentos_DB !== 124){    
                const newTem = await Temperament.bulkCreate(allTemps)
                console.log("temps modificados")
                res.status(200).json(newTem)  
            } 
            else{
                res.status(200).send("temps no modificados")
            } 
        }
        else{
            res.status(200).json("correcto, arreglo vacio")
        }
    } 
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const getAllTem = async ( req , res ) => {
    try {

        // Declaro el arreglo donde guardare los temps
        let temps = []
        const dogs = await (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=live_NvQ2yVkEFDjFB6jyaZo9qQxf3QYSYWolsuz4DcezHxujY7FtSTooi0ZZuLFH2Lxk`)).data
        
        dogs.forEach( dog => {
            
            //recordar que hay algunas razas que no tienen temperamento alguno
            if(dog.hasOwnProperty('temperament')){
                const tempz = dog.temperament.split(", ")
                tempz.forEach( temp =>{
                     if(!temps.includes(temp)){
                         temps.push(temp)
                     }
                })
            }
        });

        res.status(200).json(temps)  
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    setTem,
    getAllTem
}