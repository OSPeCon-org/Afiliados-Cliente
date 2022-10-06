/** @format */

import { reducer as uiReducer } from "./ui/reducer";
import { reducer as screenReducer } from "./screens/reducer";
import { reducer as routingReducer } from "./routing/reducer";
import { reducer as apiReducer } from "./api/reducer";
import { reducer as autorizacionReducer } from "./autorizacion/reducer";
import { reducer as rutaReducer } from "./ruta/reducer";
import { reducer as parentescosReducer } from "./parentescos/reducer";
import { reducer as planesReducer } from "./planes/reducer";
import { reducer as tipoDocumentoReducer } from "./tipoDocumento/reducer";
import { reducer as estadosCivilesReducer } from "./estadosCiviles/reducer";
import { reducer as nacionalidadesReducer } from "./nacionalidades/reducer";
import { reducer as afiliadoDatosREducer } from "./afiliadoDatos/reducer";
import { reducer as afiliadoDomiciliosREducer } from "./afiliadoDomicilios/reducer";
import { reducer as provinciasREducer } from "./provincias/reducer";
import { reducer as localidadesREducer } from "./localidades/reducer";
import { reducer as afiliadoDocumentacionREducer } from "./afiliadoDocumentacion/reducer";
import { reducer as afiliadoContactosREducer } from "./afiliadoContactos/reducer";
import { reducer as afiliadosReducer } from "./afiliados/reducer";
import { reducer as documentacionReducer } from "./documentacion/reducer";

export const rootReducer = (state = {}, action) => {
    const presentacionesEstadosRed = state.presentacionesEstados;
    return {
        api: apiReducer(state.api, action),
        ui: uiReducer(state.ui, action),
        screen: screenReducer(state.screen, action),
        routing: routingReducer(state.routing, action),
        ruta: rutaReducer(state.ruta, action),
        afiliados: afiliadosReducer(state.afiliados, action),
        afiliadoDatos: afiliadoDatosREducer(state.afiliadoDatos, action),
        afiliadoDomicilios: afiliadoDomiciliosREducer(state.afiliadoDomicilios, action),
        afiliadoContactos: afiliadoContactosREducer(state.afiliadoContactos, action),
        afiliadoDocumentacion: afiliadoDocumentacionREducer(state.afiliadoDocumentacion, action),
        parentescos: parentescosReducer(state.parentescos, action),
        planes: planesReducer(state.planes, action),
        tipoDocumento: tipoDocumentoReducer(state.tipoDocumento, action),
        estadosCiviles: estadosCivilesReducer(state.estadosCiviles, action),
        nacionalidades: nacionalidadesReducer(state.nacionalidades, action),
        provincias: provinciasREducer(state.provincias, action),
        localidades: localidadesREducer(state.localidades, action),
        documentacion: documentacionReducer(state.documentacion, action),
    };
};
