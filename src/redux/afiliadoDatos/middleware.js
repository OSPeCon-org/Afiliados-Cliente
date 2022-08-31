import { GET, success } from "./actions";
import { RESTRequest } from "../rest/actions";

import { c } from "../fetchs";
import { getAll as GetAllParentesco, GET_SUCCESS as GET_SUCCESS_PARENTESCO } from "../parentescos/actions";
import { getAll as GetAllPlan, GET_SUCCESS as GET_SUCCESS_PLAN } from "../plan/actions";
import { getAll as GetAllTipoDocumento, GET_SUCCESS as GET_SUCCESS_TIPO_DOCUMENTO } from "../tipoDocumento/actions";
import { getAll as GetAllEstadosCiviles, GET_SUCCESS as GET_SUCCESS_ESTADOS_CIVILES } from "../estadosCiviles/actions";
import { getAll as GetAllNacionalidades, GET_SUCCESS as GET_SUCCESS_NACIONALIDADES } from "../nacionalidades/actions";
import { getAll as GetAllProvincias, GET_SUCCESS as GET_SUCCESS_PROVINCIAS } from "../provincias/actions";
import { getAll as GetAllLocalidades, GET_SUCCESS as GET_SUCCESS_LOCALIDADES } from "../localidades/actions";
import { store } from "../store";

export const get =
	({ dispatch, getState }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET) {
			dispatch(GetAllParentesco());
			dispatch(GetAllPlan());
			dispatch(GetAllTipoDocumento());
			dispatch(GetAllEstadosCiviles());
			dispatch(GetAllNacionalidades());
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
			action.type === GET_SUCCESS_PARENTESCO ||
			action.type === GET_SUCCESS_PLAN ||
			action.type === GET_SUCCESS_TIPO_DOCUMENTO ||
			action.type == GET_SUCCESS_ESTADOS_CIVILES ||
			action.type == GET_SUCCESS_NACIONALIDADES ||
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

export const middleware = [get, processGet, processError];
