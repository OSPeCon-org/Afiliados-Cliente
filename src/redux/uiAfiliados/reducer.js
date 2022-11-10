/** @format */

import { ALTA_DE_FAMILIAR, ALTA_DE_TITULAR, VER_AFILIADO } from "./actions";

const initialState = {
    titular: null,
    titularTimeStamp: null,
    familiar: null,
    familiarTimeStamp: null,
    esTitular: false,
    verAfiliadoTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case ALTA_DE_TITULAR:
            newState.titular = {};
            newState.titularTimeStamp = new Date().getTime();
            break;
        case ALTA_DE_FAMILIAR:
            newState.familiar = {};
            newState.familiarTimeStamp = new Date().getTime();
            break;
        case VER_AFILIADO:
            newState.esTitular = action.afiliado.titularId == action.afiliado.id;
            newState.verAfiliadoTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
