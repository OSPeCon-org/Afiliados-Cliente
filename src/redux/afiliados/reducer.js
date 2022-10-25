import { GET_GRUPO_FAMILIAR, GET_GRUPO_FAMILIAR_SUCCESS, GET_GRUPO_FAMILIAR_ERROR, AFILIADO_BY_CUIL, AFILIADO_BY_CUIL_SUCCESS, AFILIADO_BY_CUIL_ERROR, AFILIADOS_ACCION } from "./actions";

const initialState = {
	grupoFamiliar: [],
	timeStamp: null,
	errorTimeStamp: null,
	afiliadoByCuil: null,
	afiliadoByCuilTimeStamp: null,
	afiliadoByCuilErrorTimeStamp: null,
	currentCuil: null,
	modo: null,
	modoTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
	const newState = {
		...state,
	};

	switch (action.type) {
		case GET_GRUPO_FAMILIAR:
			//newState.grupoFamiliar = [];

			/*newState.grupoFamiliar = [
                {
                    id: "adab3da4-b83e-4d46-b2b6-3b268084b191",
                    apellido: "Javier",
                    nombre: "Chiquito",
                    tipoDocumentoId: "eff03639-4ff1-4726-a742-c899d39a7ee5",
                    tipoDocumentoNombre: "DNI",
                    documento: 28491226,
                    parentescoId: "8c0374a9-473d-4238-84ea-9c9c74a46655",
                    parentescoNombre: "Titular",
                    cuil: "20200568779",
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
                    estadosAfiliacionNombre: "Aprobado",
                },
            ];*/

			break;
		case GET_GRUPO_FAMILIAR_SUCCESS:
			newState.grupoFamiliar = action.payload.receive;
			newState.timeStamp = new Date().getTime();
			break;
		case GET_GRUPO_FAMILIAR_ERROR:
			newState.errorTimeStamp = new Date().getTime();
			break;
		case AFILIADO_BY_CUIL:
			newState.currentCuil = action.cuil;
			break;
		case AFILIADO_BY_CUIL_SUCCESS:
			newState.afiliadoByCuil = action.payload.receive;
			newState.afiliadoByCuilTimeStamp = new Date().getTime();
			break;
		case AFILIADO_BY_CUIL_ERROR:
			newState.afiliadoByCuilErrorTimeStamp = new Date().getTime();
			break;
		case AFILIADOS_ACCION:
			newState.modo = action.modo;
			newState.modoTimeStamp = new Date().getTime();
			break;
	}
	return newState;
};
