import { GET_ALL_SUCCESS, GET_ALL_ERROR } from "./actions";

const initialState = {
    documentacion: null,
    timeStamp: null,
    errorTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case GET_ALL_SUCCESS:
            newState.documentacion = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            break;
        case GET_ALL_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
