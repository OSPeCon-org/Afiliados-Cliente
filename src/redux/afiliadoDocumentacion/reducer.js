import {
    GET_SUCCESS,
    GET_ERROR,
    ADD_DOCUMENTACION_SUCCESS,
    ADD_DOCUMENTACION_ERROR,
    GET_DOCUMENTACION_AFILIADO_BY_ID_SUCCESS,
    GET_DOCUMENTACION_AFILIADO_BY_ID_ERROR,
    GET_DOCUMENTACION_BY_ID_SUCCESS,
    GET_DOCUMENTACION_BY_ID_ERROR,
} from "./actions";

const initialState = {
    addTimeStamp: null,
    addErrorTimeStamp: null,
    documentacionById: null,
    documentacionByIdTimeStamp: null,
    documentacionByIdTimeStampError: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case ADD_DOCUMENTACION_SUCCESS:
            newState.addTimeStamp = new Date().getTime();
            break;
        case ADD_DOCUMENTACION_ERROR:
            newState.addErrorTimeStamp = new Date().getTime();
            break;
        case GET_DOCUMENTACION_AFILIADO_BY_ID_SUCCESS:
            newState.documentacionById = action.payload.receive;
            newState.documentacionByIdTimeStamp = new Date().getTime();
            break;
        case GET_DOCUMENTACION_AFILIADO_BY_ID_ERROR:
            newState.documentacionByIdTimeStampError = new Date().getTime();
            break;
    }
    return newState;
};
