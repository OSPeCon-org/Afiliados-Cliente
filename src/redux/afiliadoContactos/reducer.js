import { GET, SUCCESS, ADD, ADD_SUCCESS, ADD_ERROR } from "./actions";

const initialState = {
    timeStamp: null,
    errorTimeStamp: null,
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
    }
    return newState;
};
