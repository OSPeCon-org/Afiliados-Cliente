import { GET_GRUPO_FAMILIAR, GET_GRUPO_FAMILIAR_SUCCESS, GET_GRUPO_FAMILIAR_ERROR, AFILIADO_BY_CUIL, AFILIADO_BY_CUIL_SUCCESS, AFILIADO_BY_CUIL_ERROR } from "./actions";
import { RESTRequest, RESTAdd } from "../rest/actions";
import { grupoFamiliarFetch, afiliadosByCuilFetch } from "../fetchs";

import { store } from "../store";

export const getGrupoFamiliar =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_GRUPO_FAMILIAR) {
            store.dispatch(RESTRequest(grupoFamiliarFetch, "?titularId=" + action.titularId, GET_GRUPO_FAMILIAR_SUCCESS, GET_GRUPO_FAMILIAR_ERROR, getState().autorizacion.entities.token));
        }
    };
export const afiliadosByCuil =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === AFILIADO_BY_CUIL) {
            store.dispatch(RESTRequest(afiliadosByCuilFetch, action.cuil, AFILIADO_BY_CUIL_SUCCESS, AFILIADO_BY_CUIL_ERROR, getState().autorizacion.entities.token));
        }
    };

export const processGet =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        /*if (
			action.type == ) {
			dispatch(success());
		}*/
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        /*if (action.type === GET_ERROR) {
        }*/
    };

export const GetById =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_BY_ID_SUCCESS) {
            //dispatch(RESTRequest(afiliadosGetById, "{" + "}", )){}
        }
    };

/*export const add =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD) {
            dispatch(RESTAdd(afiliadosAddFetch, action.item, ADD_SUCCESS, ADD_ERROR, getState().autorizacion.entities.token));
        }
    };*/

export const middleware = [getGrupoFamiliar, afiliadosByCuil, processGet, processError];
