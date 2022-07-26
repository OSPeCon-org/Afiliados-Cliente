/** @format */

import { reducer as uiReducer } from "./ui/reducer";
import { reducer as screenReducer } from "./screens/reducer";
import { reducer as routingReducer } from "./routing/reducer";
import { reducer as apiReducer } from "./api/reducer";
import { reducer as autorizacionReducer } from "./autorizacion/reducer";
import { reducer as rutaReducer } from "./ruta/reducer";
import { reducer as parentescoReducer } from "./parentesco/reducer";
import { reducer as planReducer } from "./plan/reducer";
import { reducer as tipoDocumentoReducer } from "./tipoDocumento/reducer";
import { reducer as estadosCivilesReducer } from "./estadosCiviles/reducer";
import { reducer as nacionalidadesReducer } from "./nacionalidades/reducer";
import { reducer as afiliadoDatosREducer } from "./afiliadoDatos/reducer";

export const rootReducer = (state = {}, action) => {
    const presentacionesEstadosRed = state.presentacionesEstados;
    return {
        api: apiReducer(state.api, action),
        ui: uiReducer(state.ui, action),
        screen: screenReducer(state.screen, action),
        routing: routingReducer(state.routing, action),
        ruta: rutaReducer(state.ruta, action),
        afiliadoDatos: afiliadoDatosREducer(state.afiliadoDatos, action),
        parentesco: parentescoReducer(state.parentesco, action),
        plan: planReducer(state.plan, action),
        tipoDocumento: tipoDocumentoReducer(state.tipoDocumento, action),
        estadosCiviles: estadosCivilesReducer(state.estadosCiviles, action),
        nacionalidades: nacionalidadesReducer(state.nacionalidades, action),
    };
};
