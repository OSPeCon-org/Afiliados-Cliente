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

import { addDocumentacionFetch, afiliadosGetByPlanDocumentacionFetch, getDocumentaciongetByAfiliadoIdFetch, getDocumentacionByIdFetch } from "../fetchs";
import { store } from "../store";
import { restAfiliadoLoaded } from "../ui/actions";

export const get =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            dispatch(
                RESTRequest(
                    afiliadosGetByPlanDocumentacionFetch,
                    "?planId=" + action.planId + "&parentescoId=" + action.parentescoId + "&discapacidad=" + action.discapacidad,
                    GET_SUCCESS,
                    GET_ERROR,
                    getState().autorizacion.entities.token
                )
            );
            /*dispatch({
                type: GET_SUCCESS,
                payload: {
                    receive: [
                        {
                            PlanId: 1,
                            ParentescoId: 1,
                            Discapacidad: 2,
                            titulo: "Documento frente",
                            imagen: "UPLOAD",
                            estado: "PENDIENTE",
                            copete: "Debe subir el documento",
                            accion1: "NUEVO DOCUMENTO",
                            accion2: "",
                        },
                       
                    ].filter((item) => {
                        return item.PlanId == action.planId && item.ParentescoId == action.parentescoId && item.Discapacidad == action.discapacidad;
                    }),
                },
            });*/
        }
    };

export const processGet =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_SUCCESS) {
            dispatch(restAfiliadoLoaded());
        }
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ERROR) {
        }
    };

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
            dispatch(
                RESTRequest(
                    afiliadosGetByPlanDocumentacionFetch,
                    "?planId=" +
                        getState().afiliadoDatos.current.planId +
                        "&parentescoId=" +
                        getState().afiliadoDatos.current.parentescoId +
                        "&discapacidad=" +
                        getState().afiliadoDatos.current.discapacitado,
                    GET_SUCCESS,
                    GET_ERROR,
                    getState().autorizacion.entities.token
                )
            );
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
        if (action.type === GET_DOCUMENTACION_BY_ID) {
            dispatch(RESTRequest(getDocumentacionByIdFetch, action.id, GET_DOCUMENTACION_BY_ID_SUCCESS, GET_DOCUMENTACION_BY_ID_ERROR, getState().autorizacion.entities.token));
        }
    };

export const middleware = [get, addDocumentacion, processGet, processError, addDocumentacionSuccess, getDocumentaciongetByAfiliadoId, getDocumentacionById];
