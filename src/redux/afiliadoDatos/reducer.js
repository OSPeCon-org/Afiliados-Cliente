import { GET, SUCCESS, ACTUALIZAR, ACTUALIZAR_SUCCESS, ACTUALIZAR_ERROR, SET_CURRENT } from "./actions";

const initialState = {
	entitiesCountOk: 7,
	entitiesCountError: 0,
	timeStamp: null,
	errorTimeStamp: null,
	currentId: null,
	actualizarTimeStamp: null,
	errorActualizarTimeStamp: null,
	current: null,
	currentTimeStamp: null,
	initial: null,
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
			break;
		case ACTUALIZAR_SUCCESS:
			newState.currentId = action.payload.receive;
			newState.current.id = action.payload.receive;
			newState.actualizarTimeStamp = new Date().getTime();
			break;
		case ACTUALIZAR_ERROR:
			newState.errorActualizarTimeStamp = new Date().getTime();
			break;
		case SET_CURRENT:
			newState.current = action.item;
			newState.currentId = action.item.id;
			newState.currentTimeStamp = new Date().getTime();
			break;
	}
	return newState;
};
