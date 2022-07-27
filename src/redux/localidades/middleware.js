import { GET, GET_SUCCESS, GET_ERROR } from "./actions";
import { RESTRequest } from "../rest/actions";

import { c } from "../fetchs";

export const get =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            if (!getState().localidades.entities) {
                //dispatch(RESTRequest(webApiAfiliados, "", GET_SUCCESS, GET_ERROR, ""));
                dispatch({
                    type: GET_SUCCESS,
                    payload: {
                        receive: [
                            {
                                descripcion: "Avellaneda",
                            },
                            {
                                descripcion: "Chascomus",
                            },
                        ],
                    },
                });
            } else {
                dispatch({
                    type: GET_SUCCESS,
                    payload: {
                        receive: getState().localidades.entities,
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
