import { GET, GET_BY_AFILIADO_ID, GET_BY_AFILIADO_ID_SUCCESS, GET_BY_AFILIADO_ID_ERROR, success, ADD, ADD_SUCCESS, ADD_ERROR, setCurrent } from "./actions";
import { RESTRequest, RESTAdd } from "../rest/actions";

import { afiliadosDomiciliosAddFetch, afiliadosDomiciliosGetByAfiliadoIdFetch } from "../fetchs";
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
        if (action.type == GET_SUCCESS_PROVINCIAS || action.type == GET_SUCCESS_LOCALIDADES) {
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

export const GetByAfiliadoId =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_BY_AFILIADO_ID) {
            dispatch(RESTRequest(afiliadosDomiciliosGetByAfiliadoIdFetch, action.id, GET_BY_AFILIADO_ID_SUCCESS, GET_BY_AFILIADO_ID_ERROR, getState().autorizacion.entities.token));
        }
    };

export const GetByAfiliadoIdSuccess =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_BY_AFILIADO_ID_SUCCESS) {
            let domicilio = action.payload.receive[0];
            if (domicilio == null) {
                domicilio = { afiliadoId: "", calle: "", altura: "", piso: "", departamento: "", provincia: "", localidad: "", codigoPostal: "" };
            }
            dispatch(setCurrent(domicilio));
        }
    };

export const add =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD) {
            dispatch(RESTAdd(afiliadosDomiciliosAddFetch, action.item, ADD_SUCCESS, ADD_ERROR, getState().autorizacion.entities.token));
        }
    };

export const middleware = [get, GetByAfiliadoId, GetByAfiliadoIdSuccess, processGet, processError, add];
