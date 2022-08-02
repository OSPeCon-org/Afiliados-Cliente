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
                            id: 1,
                            descripcion: "Obligatorio",
                        },
                        {
                            id: 2,
                            descripcion: "Monotributista",
                        },
                        {
                            id: 3,
                            descripcion: "Adhrente",
                        },
                    ],
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
