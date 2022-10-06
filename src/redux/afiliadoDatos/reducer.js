import { GET, SUCCESS, ACTUALIZAR, ACTUALIZAR_SUCCESS, ACTUALIZAR_ERROR } from "./actions";

const initialState = {
    entitiesCountOk: 7,
    entitiesCountError: 0,
    timeStamp: null,
    errorTimeStamp: null,
    currentId: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case GET:
            newState.entitiesCountOk = 7;
            break;
        case SUCCESS:
            newState.entitiesCountOk -= 1;
            if (newState.entitiesCountOk == 0) {
                newState.timeStamp = new Date().getTime();
            }
            //newState.timeStamp = new Date().getTime();
            break;
        case ACTUALIZAR_SUCCESS:
            newState.currentId = action.payload.receive;

            break;
    }
    return newState;
};
