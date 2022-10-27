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

export const autorizacionFetch = fetchFactory(webApiAfiliaciones, "Autorizacion");
export const acceptFetch = fetchFactory(webApiAfiliaciones, "Autorizacion/Accept");

export const estadosCivilesGetAllFetch = fetchFactory(webApiAfiliaciones, "EstadosCiviles/all");

export const localidadesGetAllFetch = fetchFactory(webApiAfiliaciones, "Localidades/all");

export const nacionaliodadesGetAllFetch = fetchFactory(webApiAfiliaciones, "Nacionalidades/all");

export const parentescosGetAllFetch = fetchFactory(webApiAfiliaciones, "Parentescos/all");
export const parentescosByIdFetch = fetchFactory(webApiAfiliaciones, "Parentescos");

export const planesGetAllFetch = fetchFactory(webApiAfiliaciones, "Planes/all");
export const planesByIdFetch = fetchFactory(webApiAfiliaciones, "Planes");

export const provinciasGetAllFetch = fetchFactory(webApiAfiliaciones, "Provincias/all");
export const tipoDocumentoGetAllFetch = fetchFactory(webApiAfiliaciones, "TipoDocumento/all");
export const getAllDocumentacionFetch = fetchFactory(webApiAfiliaciones, "Documentacion/all");
export const addDocumentacionFetch = fetchFactory(webApiAfiliaciones, "AfiliadosDocumentacion/add");

export const grupoFamiliarFetch = fetchFactory(webApiAfiliaciones, "Afiliados/grupoFamiliar");
export const afiliadosActualizarFetch = fetchFactory(webApiAfiliaciones, "Afiliados/actualizar");
export const afiliadosGetById = fetchFactory(webApiAfiliaciones, "Afiliados");
export const afiliadosByCuilFetch = fetchFactory(webApiAfiliaciones, "Afiliados/getByCuil");

export const afiliadosGetByPlanDocumentacionFetch = fetchFactory(webApiAfiliaciones, "DetalleDocumentacion/GetDetalleDocumentacionByPlanParentesco");
export const afiliadosDomiciliosAddFetch = fetchFactory(webApiAfiliaciones, "AfiliadosDomicilios/add");
export const afiliadosDomiciliosActualizarFetch = fetchFactory(webApiAfiliaciones, "AfiliadosDomicilios/actualizar");
export const afiliadosDomiciliosGetByAfiliadoIdFetch = fetchFactory(webApiAfiliaciones, "AfiliadosDomicilios/getByAfiliadoId");

export const afiliadosContactosAddFetch = fetchFactory(webApiAfiliaciones, "AfiliadosContactos/add");
export const afiliadosContactosActualizarFetch = fetchFactory(webApiAfiliaciones, "AfiliadosContactos/actualizar");
export const afiliadosContactosGetByAfiliadoIdFetch = fetchFactory(webApiAfiliaciones, "AfiliadosContactos/getByAfiliadoId");
