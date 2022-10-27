import { GET, SUCCESS, ADD, ADD_SUCCESS, ADD_ERROR, SET_CURRENT, ACTUALIZAR, ACTUALIZAR_SUCCESS, ACTUALIZAR_ERROR } from "./actions";

const initialState = {
    timeStamp: null,
    errorTimeStamp: null,
    current: null,
    currentTimeStamp: null,
    addTimeStamp: null,
    actualizarTimeStamp: null,
    actualizarTimeStampError: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case GET:
            break;
        case SUCCESS:
            break;
        case SET_CURRENT:
            newState.current = action.item;
            newState.currentTimeStamp = new Date().getTime();
            break;
        case ADD_SUCCESS:
            newState.addTimeStamp = new Date().getTime();
            break;
        case ACTUALIZAR_SUCCESS:
            newState.actualizarTimeStamp = new Date().getTime();
            break;
        case ACTUALIZAR_ERROR:
            newState.actualizarTimeStampError = new Date().getTime();
            break;
    }
    return newState;
};
