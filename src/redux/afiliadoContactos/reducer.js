import { GET, SUCCESS, ADD, ADD_SUCCESS, ADD_ERROR, SET_CURRENT } from "./actions";

const initialState = {
    timeStamp: null,
    errorTimeStamp: null,
    current: null,
    currentTimeStamp: null,
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
    }
    return newState;
};
