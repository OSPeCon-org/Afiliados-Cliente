import { GET, success } from "./actions";
import { RESTRequest } from "../rest/actions";

import { c } from "../fetchs";
import { getAll as GetAllParentesco, GET_SUCCESS as GET_SUCCESS_PARENTESCO } from "../parentesco/actions";
import { getAll as GetAllPlan, GET_SUCCESS as GET_SUCCESS_PLAN } from "../plan/actions";
import { getAll as GetAllTipoDocumento, GET_SUCCESS as GET_SUCCESS_TIPO_DOCUMENTO } from "../tipoDocumento/actions";
import { getAll as GetAllEstadosCiviles } from "../estadosCiviles/middleware";
import { getAll as GetAllNacionalidades } from "../nacionalidades/actions";
import { store } from "../store";

export const get =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            dispatch(GetAllParentesco());
            dispatch(GetAllPlan());
            dispatch(GetAllTipoDocumento());
        }
    };

export const processGet =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_SUCCESS_PARENTESCO || action.type === GET_SUCCESS_PLAN || action.type === GET_SUCCESS_TIPO_DOCUMENTO) {
            dispatch(success());
        }
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        /*if (action.type === GET_ERROR) {
        }*/
    };

export const middleware = [get, processGet, processError];
