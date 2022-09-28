import {GET_GRUPO_FAMILIAR, GET_GRUPO_FAMILIAR_SUCCESS, GET_GRUPO_FAMILIAR_ERROR } from "./actions";

const initialState = {
    grupoFamiliar: [],
    timeStamp: null,
    errorTimeStamp: null,
    }

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case GET_GRUPO_FAMILIAR:
            newState.grupoFamiliar = action.payload.receive;            
            break;
        case GET_GRUPO_FAMILIAR_SUCCESS:
                newState.timeStamp = new Date().getTime();
            break;  
            case GET_GRUPO_FAMILIAR_ERROR:
                newState.errorTimeStamp= new Date().getTime();
            break;  
    
    }
    return newState;
};
