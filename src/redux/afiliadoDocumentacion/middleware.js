import { GET, GET_SUCCESS, GET_ERROR} from "./actions";
import { RESTRequest } from "../rest/actions";

import { afiliadosGetByPlanDocumentacionFetch } from "../fetchs";
import { store } from "../store";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            const body = { 
                planId: "108f11fb-9952-4fe0-a26f-f8ee4e2e9b8e", 
                parentescoId: "e4389c83-310c-4399-b5fa-9ab06a00eb23",
                discapacidad: false};
            dispatch(RESTRequest( afiliadosGetByPlanDocumentacionFetch, "?planId=" + body.planId + "&parentescoId=" + body.parentescoId + "&discapacidad=" + body.discapacidad, GET_SUCCESS, GET_ERROR, ""));
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
            /*store.GetState().afiliadoDocumentacion.documentacion.filter((item) => {
                return item.PlanId == action.planId && item.ParentescoId == action.parentescoId && item.Discapacidad == action.discapacidad;
            });*/

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

export const middleware = [get, processGet, processError];
