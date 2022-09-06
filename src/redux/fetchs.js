/** @format */

import { ODataEntity, ODataFetchFactory } from "@brunomon/odata-fetch-factory";
import { fetchFactory } from "../libs/fetchFactory";

let webApiExpedientes = SERVICE_URL;
let webApi = SERVICE_URL + "/api";
let webApiAfiliaciones = AFILIACIONES_URL + "/api/v1";

const expedienteOdataFactory = ODataFetchFactory({
	fetch: fetch,
	domain: webApiExpedientes,
});
//https://afiliaciones.api.uocra.net/api/v1/Parentescos/all

export const loginFetch = fetchFactory(webApi, "LoginOS");
export const logonFetch = ODataEntity(expedienteOdataFactory, "Logon");
export const recuperoFetch = ODataEntity(expedienteOdataFactory, "PedirRecupero");
export const cambiarPasswordFetch = ODataEntity(expedienteOdataFactory, "CambiarPassword");


export const estadosCivilesFetch = fetchFactory(webApiAfiliaciones, "EstadosCiviles/all");
export const localidadesFetch = fetchFactory(webApiAfiliaciones, "Localidades/all");
export const nacionaliodadesFetch = fetchFactory(webApiAfiliaciones, "Nacionalidades/all");
export const parentescosFetch = fetchFactory(webApiAfiliaciones, "Parentescos/all");
export const planesFetch = fetchFactory(webApiAfiliaciones, "Planes/all");
export const provinciasFetch = fetchFactory(webApiAfiliaciones, "Provincias/all");
export const tipoDocumentoFetch = fetchFactory(webApiAfiliaciones, "TipoDocumento/all");

export const afiliadosAddFetch = fetchFactory(webApiAfiliaciones, "Afiliados/add");
export const afiliadosDomiciliosFetch = fetchFactory(webApiAfiliaciones, "AfiliadosDomicilios/add");








