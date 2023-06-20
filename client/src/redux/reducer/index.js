import { GET_DOGS, GET_DOGS_BY_NAME, SET_FILTRO, GET_DIETAS } from "../actions/index";

let initialState = {

    allDogs: {
        tempFilter: [],
        creationFilter: [],
        renderization: []
    },

    dogsOriginal: [],

    temps: []

}


function rootReducer(state = initialState, action) {
    switch (action.type) {

        case GET_DOGS:
            return {
                ...state,
                allDogs: { ...state.allDogs, tempFilter: action.payload, renderization: action.payload },
                dogsOriginal: [...action.payload],
                //reciepesCopy: action.payload
            };

        case GET_DOGS_BY_NAME:
            return {
                ...state,
                allDogs: { ...state.allDogs, renderization: action.payload },
            };

        case SET_FILTRO:
            const rezago = [...state.allDogs.renderization]
            return {
                ...state,
                allDogs: { ...state.allDogs, tempFilter:rezago, renderization: action.payload },
            };

        case GET_DIETAS:
            return {
                ...state,
                temps: action.payload,
            };

        default:
            return state;
    }
}

export default rootReducer
