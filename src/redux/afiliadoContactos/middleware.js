import { GET, success, ADD, ADD_SUCCESS, ADD_ERROR } from "./actions";
import { RESTRequest, RESTAdd } from "../rest/actions";

import { afiliadosContactosAddFetch } from "../fetchs";
import { store } from "../store";

export const get =
	({ dispatch, getState }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET) {
			
		}
	};

export const processGet =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		
	};

export const processError =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		
	};

export const add =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === ADD) {
			dispatch(RESTAdd(afiliadosContactosAddFetch, action.item , ADD_SUCCESS, ADD_ERROR, ""));
        }
	};

export const middleware = [get, processGet, processError, add];
