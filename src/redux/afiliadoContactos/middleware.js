import { GET, GET_BY_AFILIADO_ID, GET_BY_AFILIADO_ID_SUCCESS, GET_BY_AFILIADO_ID_ERROR, success, ADD, ADD_SUCCESS, ADD_ERROR, setCurrent } from "./actions";
import { RESTRequest, RESTAdd } from "../rest/actions";

import { afiliadosContactosAddFetch, afiliadosContactosGetByAfiliadoIdFetch } from "../fetchs";
import { store } from "../store";

export const get =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
        }
    };

export const GetByAfiliadoId =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_BY_AFILIADO_ID) {
            dispatch(RESTRequest(afiliadosContactosGetByAfiliadoIdFetch, action.id, GET_BY_AFILIADO_ID_SUCCESS, GET_BY_AFILIADO_ID_ERROR, getState().autorizacion.entities.token));
        }
    };

export const GetByAfiliadoIdSuccess =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_BY_AFILIADO_ID_SUCCESS) {
            let contacto = action.payload.receive[0];
            if (contacto == null) {
                contacto = { afiliadosId: "", celular: "", particular: "", laboral: "", mail: "", mail2: "" };
            }
            dispatch(setCurrent(contacto));
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
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD) {
            dispatch(RESTAdd(afiliadosContactosAddFetch, action.item, ADD_SUCCESS, ADD_ERROR, getState().autorizacion.entities.token));
        }
    };

export const middleware = [get, GetByAfiliadoId, GetByAfiliadoIdSuccess, processGet, processError, add];
