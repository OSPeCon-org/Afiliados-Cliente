import { GET, GET_SUCCESS, GET_ERROR } from "./actions";
import { RESTRequest } from "../rest/actions";

import { estadosCivilesGetAllFetch } from "../fetchs";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            dispatch(RESTRequest(estadosCivilesGetAllFetch, "", GET_SUCCESS, GET_ERROR, ""));            
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
