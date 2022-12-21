import {
    GET,
    GET_SUCCESS,
    GET_ERROR,
    ADD_DOCUMENTACION,
    ADD_DOCUMENTACION_SUCCESS,
    ADD_DOCUMENTACION_ERROR,
    GET_DOCUMENTACION_AFILIADO_BY_ID,
    GET_DOCUMENTACION_AFILIADO_BY_ID_SUCCESS,
    GET_DOCUMENTACION_AFILIADO_BY_ID_ERROR,
    GET_DOCUMENTACION_BY_ID,
    GET_DOCUMENTACION_BY_ID_SUCCESS,
    GET_DOCUMENTACION_BY_ID_ERROR,
} from "./actions";
import { RESTRequest, RESTAdd } from "../rest/actions";

import { addDocumentacionFetch, getDocumentaciongetByAfiliadoIdFetch, getDocumentacionByIdFetch } from "../fetchs";
import { getDocumentaciongetByAfiliadoId as getDocumentacion } from "./actions";
import { store } from "../store";
import { restAfiliadoLoaded } from "../ui/actions";

export const addDocumentacion =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD_DOCUMENTACION) {
            dispatch(RESTAdd(addDocumentacionFetch, action.item, ADD_DOCUMENTACION_SUCCESS, ADD_DOCUMENTACION_ERROR, getState().autorizacion.entities.token));
        }
    };

export const addDocumentacionSuccess =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD_DOCUMENTACION_SUCCESS) {
            dispatch(getDocumentacion(getState().afiliadoDatos.current.id));
        }
    };

export const getDocumentaciongetByAfiliadoId =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_DOCUMENTACION_AFILIADO_BY_ID) {
            dispatch(
                RESTRequest(
                    getDocumentaciongetByAfiliadoIdFetch,
                    action.afiliadoId,
                    GET_DOCUMENTACION_AFILIADO_BY_ID_SUCCESS,
                    GET_DOCUMENTACION_AFILIADO_BY_ID_ERROR,
                    getState().autorizacion.entities.token
                )
            );
        }
    };

export const getDocumentacionById =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_DOCUMENTACION_AFILIADO_BY_ID) {
            dispatch(
                RESTRequest(
                    getDocumentaciongetByAfiliadoIdFetch,
                    action.afiliadoId,
                    GET_DOCUMENTACION_AFILIADO_BY_ID_SUCCESS,
                    GET_DOCUMENTACION_AFILIADO_BY_ID_ERROR,
                    getState().autorizacion.entities.token
                )
            );
        }
    };

export const getDocumentacionByIdSuccess =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_DOCUMENTACION_AFILIADO_BY_ID_SUCCESS) {
            dispatch(restAfiliadoLoaded());
        }
    };

export const middleware = [addDocumentacion, addDocumentacionSuccess, getDocumentaciongetByAfiliadoId, getDocumentacionById, getDocumentacionByIdSuccess];
