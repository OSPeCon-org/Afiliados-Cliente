import { GET, SUCCESS, ADD, ADD_SUCCESS, ADD_ERROR, SET_CURRENT, ACTUALIZAR_SUCCESS, ACTUALIZAR_ERROR } from "./actions";

const initialState = {
	entitiesCountOk: 2,
	entitiesCountError: 0,
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
			newState.entitiesCountOk = 2;
			break;
		case SUCCESS:
			newState.entitiesCountOk -= 1;
			if (newState.entitiesCountOk == 0) {
				newState.timeStamp = new Date().getTime();
			}
			//newState.timeStamp = new Date().getTime();
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
