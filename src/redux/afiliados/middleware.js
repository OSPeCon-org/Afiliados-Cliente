import { GET_GRUPO_FAMILIAR, GET_GRUPO_FAMILIAR_SUCCESS, GET_GRUPO_FAMILIAR_ERROR } from "./actions";
import { RESTRequest, RESTAdd } from "../rest/actions";


import { store } from "../store";


export const getGrupoFamiliar =
	({ dispatch, getState }) =>
	(next) =>
	(action) => {
		next(action);		
		if (action.type === GET_GRUPO_FAMILIAR) {
			            /*dispatch({
                type: GET_SUCCESS,
                payload: {
                    receive: [
                        {
                            PlanId: 1,
                            ParentescoId: 1,
                            Discapacidad: 2,
                            titulo: "Documento frente",
                            imagen: "UPLOAD",
                            estado: "PENDIENTE",
                            copete: "Debe subir el documento",
                            accion1: "NUEVO DOCUMENTO",
                            accion2: "",
                        },
                       
                    ].filter((item) => {
                        return item.PlanId == action.planId && item.ParentescoId == action.parentescoId && item.Discapacidad == action.discapacidad;
                    }),
                },
            });*/

			dispatch({
                type: GET_GRUPO_FAMILIAR,
                payload: {
                    receive: [
                        {
							id: "adab3da4-b83e-4d46-b2b6-3b268084b191",
							apellido: "ADAS ADAS",
							nombre: "ASDASD ASD AS",
							tipoDocumentoId: "eff03639-4ff1-4726-a742-c899d39a7ee5",
							tipoDocumentoNombre: "DNI",
							documento: 35947760,
							parentescoId: "8c0374a9-473d-4238-84ea-9c9c74a46655",
							parentescoNombre: "Menor a Cargo",
							cuil: "27-35947760-6",
							fechaNacimiento: "2022-08-09T00:00:00",
							fecha: "2022-09-23T15:32:22.6742508",
							planId: "1815d851-24b6-4a72-9830-4f4c4cf8ea79",
							planNombre: "Desempleo",
							sexo: "Femenino",
							estadoCivilId: "76151413-1847-4688-88f1-007356683e40",
							estadoCivilNombre: "Casado",
							discapacitado: true,
							nacionalidadId: "62dc612e-2411-43b4-bc03-5d52938e285c",
							nacionalidadNombre: "Argentino",
							estadosAfiliacionId: "76151413-1847-4688-88f1-007356683e40",
							estadosAfiliacionNombre: "estadoPruebs"
                        }]                    
                },
            });
		}
	};

export const processGet =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		/*if (
			action.type == ) {
			dispatch(success());
		}*/
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

export const add =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === ADD) {
			dispatch(RESTAdd(afiliadosAddFetch, action.item , ADD_SUCCESS, ADD_ERROR, ""));
        }
	};



export const middleware = [getGrupoFamiliar, processGet, processError];
