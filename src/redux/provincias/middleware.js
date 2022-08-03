import { GET, GET_SUCCESS, GET_ERROR } from "./actions";
import { RESTRequest } from "../rest/actions";

import { c } from "../fetchs";

export const get =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            if (!getState().provincias.entities) {
                //dispatch(RESTRequest(webApiAfiliados, "", GET_SUCCESS, GET_ERROR, ""));
                dispatch({
                    type: GET_SUCCESS,
                    payload: {
                        receive: [
                            {
                                id: 1,
                                descripcion: "CABA",
                            },
                            {
                                id: 2,
                                descripcion: "Buenos Aires",
                            },
                        ],
                    },
                });
            } else {
                dispatch({
                    type: GET_SUCCESS,
                    payload: {
                        receive: getState().provincias.entities,
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
