/** @format */

import {} from "../css/main.css";
import {} from "../css/media.css";
import {} from "../css/nunito.css";
import {} from "../css/fontSizes.css";
import {} from "../css/colors.css";
import {} from "../css/shadows.css";

import { store } from "./redux/store";
import { captureMedia } from "./redux/ui/actions";
import { goTo } from "./redux/routing/actions";
import { viewManager } from "./views/manager";

import { register as registerSW, activate as activateSW } from "./libs/serviceWorker";

import { getAll as GetAllParentesco } from "./redux/parentescos/actions";
import { getAll as GetAllPlanes, getById } from "./redux/planes/actions";
import { getAll as GetAllTipoDocmento } from "./redux/tipoDocumento/actions";
import { getAll as GetAllEstadosCiviles } from "./redux/estadosCiviles/actions";
import { getAll as getAllDocumentacion } from "./redux/documentacion/actions";

import { getAll as GetAllNacionalidades } from "./redux/nacionalidades/actions";
if (process.env.NODE_ENV === "production") {
    registerSW();
    activateSW();
}

viewMode("main");
store.dispatch(captureMedia());
store.dispatch(goTo("splash"));
store.dispatch(getAllDocumentacion());

//store.dispatch(getById("108F11FB-9952-4FE0-A26F-F8EE4E2E9B8E"));

console.log("Sirviendo datos de :" + AFILIACIONES_URL);
