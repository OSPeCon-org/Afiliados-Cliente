import { GET, GET_SUCCESS, GET_ERROR } from "./actions";
import { RESTRequest } from "../rest/actions";

import { c } from "../fetchs";

export const get =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            if (!getState().parentesco.entities) {
                //dispatch(RESTRequest(webApiAfiliados, "", GET_SUCCESS, GET_ERROR, ""));
                dispatch({
                    type: GET_SUCCESS,
                    payload: {
                        receive: [
                            {
                                id: 1,
                                descripcion: "Titular",
                            },
                            {
                                id: 2,
                                descripcion: "Conyuge",
                            },
                            {
                                id: 3,
                                descripcion: "Hija",
                            },
                            {
                                id: 4,
                                descripcion: "Madre",
                            },
                        ],
                    },
                });
            } else {
                dispatch({
                    type: GET_SUCCESS,
                    payload: {
                        receive: getState().parentesco.entities,
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
