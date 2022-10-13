import { GET_SUCCESS, GET_ERROR, GET_BY_ID_SUCCESS, GET_BY_ID_ERROR } from "./actions";

const initialState = {
    entities: null,
    timeStamp: null,
    errorTimeStamp: null,
    parentescosNombre: null,
    nombreTimeStamp: null,
    errorNombreTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case GET_SUCCESS:
            newState.entities = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            break;
        case GET_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
        case GET_BY_ID_SUCCESS:
            newState.parentescosNombre = action.payload.receive;
            newState.nombreTimeStamp = new Date().getTime();
            break;
        case GET_BY_ID_ERROR:
            newState.errorNombreTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
