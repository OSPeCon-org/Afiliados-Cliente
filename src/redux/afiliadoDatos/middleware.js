import { GET, success, GET_ERROR, GET_BY_ID, GET_BY_ID_SUCCESS, GET_BY_ID_ERROR, ACTUALIZAR, ACTUALIZAR_SUCCESS, ACTUALIZAR_ERROR } from "./actions";
import { RESTRequest, RESTAdd } from "../rest/actions";

import { afiliadosAddFetch, afiliadosGetById } from "../fetchs";
import { getAll as GetAllParentescos, GET_SUCCESS as GET_SUCCESS_PARENTESCOS } from "../parentescos/actions";
import { getAll as GetAllPlanes, GET_SUCCESS as GET_SUCCESS_PLANES } from "../planes/actions";
import { getAll as GetAllTipoDocumento, GET_SUCCESS as GET_SUCCESS_TIPO_DOCUMENTO } from "../tipoDocumento/actions";
import { getAll as GetAllEstadosCiviles, GET_SUCCESS as GET_SUCCESS_ESTADOS_CIVILES } from "../estadosCiviles/actions";
import { getAll as GetAllNacionalidades, GET_SUCCESS as GET_SUCCESS_NACIONALIDADES } from "../nacionalidades/actions";
import { getAll as GetAllProvincias, GET_SUCCESS as GET_SUCCESS_PROVINCIAS } from "../provincias/actions";
import { getAll as GetAllLocalidades, GET_SUCCESS as GET_SUCCESS_LOCALIDADES } from "../localidades/actions";
import { store } from "../store";
import { getByAfiliadoId } from "../afiliadoContactos/actions";

export const get =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            dispatch(GetAllParentescos());
            dispatch(GetAllPlanes());
            dispatch(GetAllTipoDocumento());
            dispatch(GetAllEstadosCiviles());
            dispatch(GetAllNacionalidades());
            dispatch(GetAllProvincias());
            dispatch(GetAllLocalidades());
        }
    };

export const processGet =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (
            action.type == GET_SUCCESS_PARENTESCOS ||
            action.type == GET_SUCCESS_PLANES ||
            action.type == GET_SUCCESS_TIPO_DOCUMENTO ||
            action.type == GET_SUCCESS_ESTADOS_CIVILES ||
            action.type == GET_SUCCESS_NACIONALIDADES ||
            action.type == GET_SUCCESS_PROVINCIAS ||
            action.type == GET_SUCCESS_LOCALIDADES
        ) {
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

export const GetById =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_BY_ID_SUCCESS) {
            //dispatch(RESTRequest(afiliadosGetById, "{" + "}", )){}
        }
    };

export const actualizar =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ACTUALIZAR) {
            dispatch(RESTAdd(afiliadosAddFetch, action.item, ACTUALIZAR_SUCCESS, ACTUALIZAR_ERROR, getState().autorizacion.entities.token));
        }
    };

export const middleware = [get, processGet, processError, actualizar];
