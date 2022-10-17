import { GET_ALL, GET_ALL_SUCCESS, GET_ALL_ERROR } from "./actions";
import { RESTRequest } from "../rest/actions";

import { getAllDocumentacionFetch } from "../fetchs";
import { store } from "../store";

export const getAll =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ALL) {
            dispatch(RESTRequest(getAllDocumentacionFetch, "", GET_ALL_SUCCESS, GET_ALL_ERROR, ""));
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
        /* if (action.type === GET_SUCCESS) {
            store.GetState().afiliadoDocumentacion.documentacion.filter((item) => {
                return item.PlanId == action.planId && item.ParentescoId == action.parentescoId && item.Discapacidad == action.discapacidad;
            });
        }*/
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        /* if (action.type === GET_ERROR) {
        }*/
    };

export const middleware = [getAll, processGet, processError];
