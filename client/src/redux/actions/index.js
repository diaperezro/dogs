import axios from "axios"
export const GET_DOGS = "GET_DOGS"
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME"
export const SET_FILTRO = "SET_FILTRO"
export const GET_DIETAS = "GET_DIETAS"


export function getDogs() {
    return async function (dispatch) {
        const response = await axios('http://localhost:3001/dog')
        return dispatch({
            type: "GET_DOGS",
            payload: response.data
        })
    }
}

export function getDogsByName(nombre) {
    return async function (dispatch) {
        const response = (await axios(`http://localhost:3001/dog?name=${nombre}`))
        return dispatch({
            type: "GET_DOGS_BY_NAME",
            payload: response.data
        })
    }
}

export function setFiltro(arrayFiltrado) {
    return async function (dispatch) {
        return dispatch({
            type: "SET_FILTRO",
            payload: arrayFiltrado
        })
    }
}


export function getDietas() {
    return async function (dispatch) {
        const response = (await axios("http://localhost:3001/tem"))
        return dispatch({
            type: "GET_DIETAS",
            payload: response.data
        })
    }
}


export function setDietsDB(temps) {
    return async function () {
        let variable = temps
        axios.post('http://localhost:3001/tem', {
            nombre: variable
        })
        .then( response => {
            console.log(response.data);
        })
        .catch( error => {
            console.log(error);
        });
    }
}