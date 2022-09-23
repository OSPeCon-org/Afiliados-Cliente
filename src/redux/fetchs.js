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

export const loginFetch = fetchFactory(webApi, "LoginOS");
export const logonFetch = ODataEntity(expedienteOdataFactory, "Logon");
export const recuperoFetch = ODataEntity(expedienteOdataFactory, "PedirRecupero");
export const cambiarPasswordFetch = ODataEntity(expedienteOdataFactory, "CambiarPassword");


export const estadosCivilesGetAllFetch = fetchFactory(webApiAfiliaciones, "EstadosCiviles/all");
export const localidadesGetAllFetch = fetchFactory(webApiAfiliaciones, "Localidades/all");
export const nacionaliodadesGetAllFetch = fetchFactory(webApiAfiliaciones, "Nacionalidades/all");
export const parentescosGetAllFetch = fetchFactory(webApiAfiliaciones, "Parentescos/all");
export const planesGetAllFetch = fetchFactory(webApiAfiliaciones, "Planes/all");
export const provinciasGetAllFetch = fetchFactory(webApiAfiliaciones, "Provincias/all");
export const tipoDocumentoGetAllFetch = fetchFactory(webApiAfiliaciones, "TipoDocumento/all");


export const afiliadosAddFetch = fetchFactory(webApiAfiliaciones, "Afiliados/add");
export const afiliadosGetById= fetchFactory(webApiAfiliaciones, "Afiliados");

export const afiliadosGetByPlanDocumentacionFetch = fetchFactory(webApiAfiliaciones, "DetalleDocumentacion/GetDetalleDocumentacionByPlanParentesco");
export const afiliadosDomiciliosAddFetch = fetchFactory(webApiAfiliaciones, "AfiliadosDomicilios/add");
export const afiliadosContactosAddFetch = fetchFactory(webApiAfiliaciones, "AfiliadosContactos/add");








