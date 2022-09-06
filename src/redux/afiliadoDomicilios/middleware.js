import { GET, success, ADD, ADD_SUCCESS, ADD_ERROR } from "./actions";
import { RESTRequest, RESTAdd } from "../rest/actions";

import { afiliadosDomiciliosFetch } from "../fetchs";
import { getAll as GetAllProvincias, GET_SUCCESS as GET_SUCCESS_PROVINCIAS } from "../provincias/actions";
import { getAll as GetAllLocalidades, GET_SUCCESS as GET_SUCCESS_LOCALIDADES } from "../localidades/actions";
import { store } from "../store";




export const get =
	({ dispatch, getState }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET) {
			dispatch(GetAllProvincias());
			dispatch(GetAllLocalidades());
		}
	};

export const processGet =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (
			action.type == GET_SUCCESS_PROVINCIAS ||
			action.type == GET_SUCCESS_LOCALIDADES
		) {
			dispatch(success());
		}
	};

export const processError =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		/*if (action.type === GET_ERROR) {
        }*/
	};

export const add =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === ADD) {
			dispatch(RESTAdd(afiliadosDomiciliosFetch, action.item , ADD_SUCCESS, ADD_ERROR, ""));
        }
	};

export const middleware = [get, processGet, processError, add];
