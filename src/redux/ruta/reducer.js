import { CAMBIO_OPCION_RUTA } from "./actions";
import { store } from "../store";

const initialState = {
    timeStamp: null,
    current: null,
};

export const reducer = (state = initialState, action, e) => {
    const newState = {
        ...state,
    };
    switch (action.type) {
        case CAMBIO_OPCION_RUTA:
            newState.timeStamp = new Date().getTime();
            newState.current = action.opcion;
            break;
    }
    return newState;
};
