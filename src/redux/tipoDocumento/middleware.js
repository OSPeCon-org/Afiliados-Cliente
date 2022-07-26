import { GET, GET_SUCCESS, GET_ERROR } from "./actions";
import { RESTRequest } from "../rest/actions";

import { c } from "../fetchs";

export const get =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            if (!getState().tipoDocumento.entities) {
                //dispatch(RESTRequest(webApiAfiliados, "", GET_SUCCESS, GET_ERROR, ""));
                dispatch({
                    type: GET_SUCCESS,
                    payload: {
                        receive: [
                            {
                                descripcion: "DNI",
                            },
                            {
                                descripcion: "Cedula",
                            },
                        ],
                    },
                });
            } else {
                dispatch({
                    type: GET_SUCCESS,
                    payload: {
                        receive: getState().tipoDocumento.entities,
                    },
                });
            }
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
