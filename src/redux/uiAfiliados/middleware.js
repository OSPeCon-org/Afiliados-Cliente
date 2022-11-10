/** @format */

import { setCurrent as setCurrentContactos } from "../afiliadoContactos/actions";
import { getByAfiliadoId as getContacto } from "../afiliadoContactos/actions";
import { setCurrent as setCurrentDatos } from "../afiliadoDatos/actions";
import { getByAfiliadoId as getDomicilio, setCurrent as setCurrentDomicilio } from "../afiliadoDomicilios/actions";
import { goTo } from "../routing/actions";
import { ALTA_DE_FAMILIAR, ALTA_DE_TITULAR, VER_AFILIADO } from "./actions";

export const altaDeTitular =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type == ALTA_DE_TITULAR) {
            dispatch(
                setCurrentDatos({
                    id: "",
                    apellido: "",
                    nombre: "",
                    tipoDocumentoId: "",
                    documento: "",
                    parentescoId: "e4389c83-310c-4399-b5fa-9ab06a00eb23",
                    cuil: getState().afiliados.currentCuil,
                    fechaNacimiento: "",
                    fecha: "",
                    planId: "",
                    sexo: "",
                    estadoCivilId: "",
                    discapacitado: 0,
                    nacionalidadId: "",
                    legacyId: 0,
                    activo: 0,
                    FechaAlta: "",
                    UsuarioAlta: "",
                    FechaUpdate: "",
                    UsuarioUpdate: "",
                    estadosAfiliacionId: "4863e7e8-b653-4433-a6c5-85585e114781",
                    TitularId: "",
                    UsuarioAfiliadosId: "",
                })
            );

            dispatch(
                setCurrentDomicilio({
                    id: "",
                    afiliadoId: "",
                    calle: "",
                    altura: "",
                    piso: "",
                    departamento: "",
                    localidad: "",
                    codigoPostal: "",
                    legacyId: 0,
                    activo: 0,
                    FechaAlta: "",
                    UsuarioAlta: "",
                    FechaUpdate: "",
                    UsuarioUpdate: "",
                })
            );

            dispatch(
                setCurrentContactos({
                    id: "",
                    afiliadosId: "",
                    celular: "",
                    particular: "",
                    laboral: "",
                    mail: "",
                    mail2: "",
                    legacyId: 0,
                    activo: 0,
                    FechaAlta: "",
                    UsuarioAlta: "",
                    FechaUpdate: "",
                    UsuarioUpdate: "",
                })
            );

            dispatch(goTo("afiliadoDatos"));
        }
    };

export const altaDeFamiliar =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type == ALTA_DE_FAMILIAR) {
            dispatch(
                setCurrentDatos({
                    id: "",
                    apellido: "",
                    nombre: "",
                    tipoDocumentoId: "",
                    documento: "",
                    parentescoId: "",
                    cuil: "",
                    fechaNacimiento: "",
                    fecha: "",
                    planId: "",
                    sexo: "",
                    estadoCivilId: "",
                    discapacitado: 0,
                    nacionalidadId: "",
                    legacyId: 0,
                    activo: 0,
                    FechaAlta: "",
                    UsuarioAlta: "",
                    FechaUpdate: "",
                    UsuarioUpdate: "",
                    estadosAfiliacionId: "4863e7e8-b653-4433-a6c5-85585e114781",
                    TitularId: action.titularId,
                    UsuarioAfiliadosId: "",
                })
            );

            dispatch(
                setCurrentDomicilio({
                    id: "",
                    afiliadoId: "",
                    calle: "",
                    altura: "",
                    piso: "",
                    departamento: "",
                    localidad: "",
                    codigoPostal: "",
                    legacyId: 0,
                    activo: 0,
                    FechaAlta: "",
                    UsuarioAlta: "",
                    FechaUpdate: "",
                    UsuarioUpdate: "",
                })
            );

            dispatch(
                setCurrentContactos({
                    id: "",
                    afiliadosId: "",
                    celular: "",
                    particular: "",
                    laboral: "",
                    mail: "",
                    mail2: "",
                    legacyId: 0,
                    activo: 0,
                    FechaAlta: "",
                    UsuarioAlta: "",
                    FechaUpdate: "",
                    UsuarioUpdate: "",
                })
            );
            dispatch(goTo("afiliadoDatos"));
        }
    };

export const verAfiliado =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type == VER_AFILIADO) {
            dispatch(setCurrentDatos(action.afiliado));
            dispatch(getDomicilio(action.afiliado.id));
            dispatch(getContacto(action.afiliado.id));
            dispatch(goTo("afiliadoDatos"));
        }
    };

export const middleware = [altaDeTitular, altaDeFamiliar, verAfiliado];
