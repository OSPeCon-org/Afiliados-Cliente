import { GET, SUCCESS } from "./actions";

const initialState = {
    entitiesCountOk: 3,
    entitiesCountError: 0,
    timeStamp: null,
    errorTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case GET:
            newState.entitiesCountOk = 5;
            break;
        case SUCCESS:
            newState.entitiesCountOk -= 1;
            if (newState.entitiesCountOk == 0) {
                newState.timeStamp = new Date().getTime();
            }
            //newState.timeStamp = new Date().getTime();
            break;
    }
    return newState;
};
