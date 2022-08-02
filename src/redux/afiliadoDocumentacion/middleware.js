import { GET, GET_SUCCESS, GET_ERROR } from "./actions";
import { RESTRequest } from "../rest/actions";

import { c } from "../fetchs";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            //dispatch(RESTRequest(webApiAfiliados, "", GET_SUCCESS, GET_ERROR, ""));
            dispatch({
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
                        {
                            PlanId: 1,
                            ParentescoId: 1,
                            Discapacidad: 2,
                            titulo: "Documento dorso",
                            imagen: "UPLOAD",
                            estado: "PENDIENTE",
                            copete: "Debe subir el documento",
                            accion1: "NUEVO DOCUMENTO",
                            accion2: "",
                        },
                        {
                            PlanId: 1,
                            ParentescoId: 1,
                            Discapacidad: 2,
                            titulo: "Recibo de sueldo o alta temprana",
                            imagen: "UPLOAD",
                            estado: "PENDIENTE",
                            copete: "Debe subir el documento",
                            accion1: "VER DOCUMENTO",
                            accion2: "",
                        },
                        {
                            PlanId: 1, //tabla plan
                            ParentescoId: 2, //tabla parentesco
                            Discapacidad: 2, //si o no
                            Documentacion: 0, //id documentos
                        },
                        {
                            PlanId: 1, //tabla plan
                            ParentescoId: 3, //tabla parentesco
                            Discapacidad: 1, //si o no
                            Documentacion: 0, //id documentos
                        },
                        {
                            PlanId: 2, //tabla plan
                            ParentescoId: 1, //tabla parentesco
                            Discapacidad: 2, //si o no
                            Documentacion: 0, //id documentos
                        },
                        {
                            PlanId: 2, //tabla plan
                            ParentescoId: 2, //tabla parentesco
                            Discapacidad: 1, //si o no
                            Documentacion: 0, //id documentos
                        },
                        {
                            PlanId: 2, //tabla plan
                            ParentescoId: 3, //tabla parentesco
                            Discapacidad: 1, //si o no
                            Documentacion: 0, //id documentos
                        },
                        {
                            PlanId: 3, //tabla plan
                            ParentescoId: 1, //tabla parentesco
                            Discapacidad: 2, //si o no
                            Documentacion: 0, //id documentos
                        },
                        {
                            PlanId: 3, //tabla plan
                            ParentescoId: 2, //tabla parentesco
                            Discapacidad: 1, //si o no
                            Documentacion: 0, //id documentos
                        },
                        {
                            PlanId: 3, //tabla plan
                            ParentescoId: 3, //tabla parentesco
                            Discapacidad: 2, //si o no
                            Documentacion: 0, //id documentos
                        },
                    ].filter((item) => {
                        return item.PlanId == action.planId && item.ParentescoId == action.parentescoId && item.Discapacidad == action.discapacidad;
                    }),
                },
            });
        }
    };

export const processGet =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_SUCCESS) {
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
