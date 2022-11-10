/** @format */

import { html, LitElement, css } from "lit";
import { connect } from "@brunomon/helpers";
import { store } from "../redux/store";
import { layoutsCSS } from "@brunomon/template-lit/src/views/ui/layouts";
import { getLayout } from "../redux/screens/screenLayouts";
import { goTo } from "../redux/routing/actions";
import { formTest } from "./componentes/formTest";
import { menuPrincipal } from "./headers/menu";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";

import { splashScreen } from "./splash/splash";
import { mainScreen } from "./mian";

import { RutaOpcionesControl } from "./componentes/rutaOpciones";

import { afiliadoMostrarScreen } from "./sistema/afiliadoAlta/afiliadoMostrar";
import { afiliadoDatosScreen } from "./sistema/afiliadoAlta/afiliadoDatos";
import { afiliadoDireccionScreen } from "./sistema/afiliadoAlta/afiliadoDireccion";
import { afiliadoContactoScreen } from "./sistema/afiliadoAlta/afiliadoContacto";
import { afiliadoDocumentacionScreen } from "./sistema/afiliadoAlta/afiliadoDocumentacion";
import { afiliadoAltaFinScreen } from "./sistema/afiliadoAlta/afiliadoAltaFin";
import { afiliadoPorCuil } from "./sistema/afiliadoAlta/afiliadoPorCuil";

import { pruebaDaniel } from "./prueba/pruebaDaniel";
import { pruebaFlor } from "./prueba/pruebaFlor";
import { pruebaCristian } from "./prueba/pruebaCristian";
import { SpinnerControl } from "./componentes/spinner";
import { pruebaTarjetaDocumento } from "./componentes/pruebaTarjetaDocumento";
import { AlertControl } from "./componentes/alert";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const SELECTION = "ui.menu.timeStamp";

export class viewManager extends connect(store, MEDIA_CHANGE, SCREEN, SELECTION)(LitElement) {
    constructor() {
        super();
        window.onpopstate = (event) => {
            if (event.state) {
                store.dispatch(goTo(event.state.option, true));
            } else {
                window.history.back();
            }
        };
    }

    static get styles() {
        return css`
            ${layoutsCSS}
            ${gridLayout}
            :host {
                display: grid;
                padding: 0;
                background-color: var(--aplicacion);
                overflow: hidden;
            }

            :host::-webkit-scrollbar {
                width: 0.5vw;
                cursor: pointer;
            }
            :host::-webkit-scrollbar([media-size="small"]) {
                display: none;
            }
            :host::-webkit-scrollbar-thumb {
                background: var(--secundario);
                border-radius: 5px;
            }
            #spinner {
                position: absolute;
                z-index: 100;
                height: 3rem;
                width: 3rem;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        `;
    }

    render() {
        return html`
            <spinner-control id="spinner" aro></spinner-control>
            <menu-principal area="header"></menu-principal>

            <splash-screen id="splash" area="body"></splash-screen>
            <main-screen id="main" area="body"></main-screen>

            <afiliado-mostrar-screen id="afiliadoMostrar" area="body"></afiliado-mostrar-screen>
            <afiliado-datos-screen id="afiliadoDatos" area="body"></afiliado-datos-screen>
            <afiliado-direccion-screen id="afiliadoDireccion" area="body"></afiliado-direccion-screen>
            <afiliado-contacto-screen id="afiliadoContacto" area="body"></afiliado-contacto-screen>
            <afiliado-documentacion-screen id="afiliadoDocumentacion" area="body"></afiliado-documentacion-screen>
            <afiliado-alta-fin-screen id="afiliadoAltaFin" area="body"></afiliado-alta-fin-screen>
            <afiliado-PorCuil id="afiliadoPorCuil" area="body"></afiliado-PorCuil>

            <confirm-control></confirm-control>
            <alert-control></alert-control>

            <prueba-daniel id="pruebaDaniel" area="body"></prueba-daniel>
            <prueba-flor id="pruebaFlor" area="body"></prueba-flor>
            <prueba-cristian id="pruebaCristian" area="body"></prueba-cristian>
        `;
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE || name == SCREEN) {
            this.mediaSize = state.ui.media.size;
            this.orientation = state.ui.media.orientation;
            this.layout = getLayout(state).name;
            if (!window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
                if ("standalone" in window.navigator && window.navigator.standalone) {
                    this.style.height = document.documentElement.offsetHeight ? document.documentElement.offsetHeight : window.innerHeight + "px";
                } else {
                    if (state.ui.media.orientation == "portrait") {
                        this.style.height = window.innerHeight < window.innerWidth ? window.innerWidth : window.innerHeight + "px";
                    } else {
                        this.style.height = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight + "px";
                    }
                }
            }
        }
        this.update();
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            layout: {
                type: String,
                reflect: true,
            },
            orientation: {
                type: String,
                reflect: true,
            },
        };
    }
}

window.customElements.define("view-manager", viewManager);
