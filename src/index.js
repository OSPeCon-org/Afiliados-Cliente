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
import { getAll as GetAllPlanes } from "./redux/planes/actions";
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

console.log("Sirviendo datos de :" + AFILIACIONES_URL);

window.addEventListener(
    "message",
    function (e) {
        var origin = e.origin;
        if (origin == "https://front.uocra.net") {
            try {
                const profile = parseJwt(e.data);
                console.log(profile);
                popUp.close();
            } catch {}
            //document.getElementsByTagName("p")[0].innerHTML = "Apellido:" + profile["family_name"];
            //document.getElementsByTagName("p")[1].innerHTML = "Nombre:" + profile["given_name"];
            //document.getElementsByTagName("p")[2].innerHTML = "E-mail:" + profile["email"];
        }
    },
    false
);

function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}

let popUp = window.open("https://front.uocra.net/auth/index.html", "_blank", "top=0,left=0,width=" + window.innerWidth / 2 + ",height=" + window.innerHeight, true);
