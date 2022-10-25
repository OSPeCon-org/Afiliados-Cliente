import { GET, success, GET_ERROR, GET_BY_ID, GET_BY_ID_SUCCESS, GET_BY_ID_ERROR, ACTUALIZAR, ACTUALIZAR_SUCCESS, ACTUALIZAR_ERROR } from "./actions";
import { RESTRequest, RESTAdd } from "../rest/actions";

import { afiliadosActualizarFetch, afiliadosGetById } from "../fetchs";
import { getAll as GetAllParentescos, GET_SUCCESS as GET_SUCCESS_PARENTESCOS } from "../parentescos/actions";
import { getAll as GetAllPlanes, GET_SUCCESS as GET_SUCCESS_PLANES } from "../planes/actions";
import { getAll as GetAllTipoDocumento, GET_SUCCESS as GET_SUCCESS_TIPO_DOCUMENTO } from "../tipoDocumento/actions";
import { getAll as GetAllEstadosCiviles, GET_SUCCESS as GET_SUCCESS_ESTADOS_CIVILES } from "../estadosCiviles/actions";
import { getAll as GetAllNacionalidades, GET_SUCCESS as GET_SUCCESS_NACIONALIDADES } from "../nacionalidades/actions";
import { getAll as GetAllProvincias, GET_SUCCESS as GET_SUCCESS_PROVINCIAS } from "../provincias/actions";
import { getAll as GetAllLocalidades, GET_SUCCESS as GET_SUCCESS_LOCALIDADES } from "../localidades/actions";
import { store } from "../store";
import { getGrupoFamiliar } from "../afiliados/actions";
import { getByAfiliadoId as getByAfiliadoIdContacto } from "../afiliadoContactos/actions";
import { getByAfiliadoId as getByAfiliadoIdDomicilio } from "../afiliadoDomicilios/actions";
import { addAfiliadoLoaded, clearAfiliadoLoaded } from "../ui/actions";
import { get as getAfiliadoDocumentacion } from "../afiliadoDocumentacion/actions";

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
            dispatch(RESTAdd(afiliadosActualizarFetch, action.item, ACTUALIZAR_SUCCESS, ACTUALIZAR_ERROR, getState().autorizacion.entities.token));
            //dispatch(RESTRequest(autorizacionFetch, "?token=" + action.token, AUTORIZACION_SUCCESS, AUTORIZACION_ERROR, ""));
        }
    };

export const actualizarSuccess =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ACTUALIZAR_SUCCESS) {
            //dispatch(RESTAdd(afiliadosAddFetch, action.item, ACTUALIZAR_SUCCESS, ACTUALIZAR_ERROR, getState().autorizacion.entities.token));

            dispatch(clearAfiliadoLoaded());

            if (getState().autorizacion.entities.titulares.length == 0) {
                getState().autorizacion.entities.titulares.push({
                    nombre: getState().afiliadoDatos.current.nombre,
                    apellido: getState().afiliadoDatos.current.apellido,
                    titularId: action.payload.receive,
                });
                dispatch(addAfiliadoLoaded());
                dispatch(getGrupoFamiliar(action.payload.receive));
            }
            dispatch(addAfiliadoLoaded());
            dispatch(getByAfiliadoIdContacto(getState().afiliadoDatos.current.id));
            dispatch(addAfiliadoLoaded());
            dispatch(getByAfiliadoIdDomicilio(getState().afiliadoDatos.current.id));
            dispatch(addAfiliadoLoaded());
            dispatch(getAfiliadoDocumentacion(getState().afiliadoDatos.current.planId, getState().afiliadoDatos.current.parentescoId, getState().afiliadoDatos.current.discapacitado));
        }
    };

export const middleware = [get, processGet, processError, actualizar, actualizarSuccess];
