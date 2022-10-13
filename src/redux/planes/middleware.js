import { GET, GET_SUCCESS, GET_ERROR, GET_BY_ID, GET_BY_ID_SUCCESS, GET_BY_ID_ERROR } from "./actions";
import { RESTRequest } from "../rest/actions";

import { planesGetAllFetch, planesByIdFetch } from "../fetchs";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            dispatch(RESTRequest(planesGetAllFetch, "", GET_SUCCESS, GET_ERROR, ""));
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

export const getById =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_BY_ID) {
            dispatch(RESTRequest(planesByIdFetch, "{" + action.id + "}", GET_BY_ID_SUCCESS, GET_BY_ID_ERROR, ""));
        }
    };

export const middleware = [get, getById, processGet, processError];
