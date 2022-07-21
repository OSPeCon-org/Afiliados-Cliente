/** @format */

import { html, LitElement, css } from "lit";
import { connect } from "@brunomon/helpers";
import { store } from "../redux/store";
import { layoutsCSS } from "../views/ui/layouts";
import { getLayout } from "../redux/screens/screenLayouts";
import { goTo } from "../redux/routing/actions";
import { formTest } from "./componentes/formTest";
import { menuPrincipal } from "./headers/menu";
import { spinner } from "@brunomon/template-lit/src/views/css/spinner";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";

import { splashScreen } from "./splash/splash";
import { mainScreen } from "./mian";

import { pruebaTarjeta } from "./componentes/pruebaTarjeta";
import { pruebaTarjetaDocumento } from "./componentes/pruebaTarjetaDocumento";
import { RutaOpcionesControl } from "./componentes/rutaOpciones";

import { afiliadoMostrarScreen } from "./sistema/afiliadoAlta/afiliadoMostrar";

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
            ${spinner}
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
        `;
    }

<<<<<<< HEAD
	render() {
		return html`
			<div class="spinner" anillo fixed hidden></div>
			<menu-principal area="header"></menu-principal>

			<splash-screen id="splash" area="body"></splash-screen>
			<main-screen id="main" area="body"></main-screen>

			<afiliado-mostrar-screen id="afiliadoMostrar" area="body"></afiliado-mostrar-screen>

			<!--
            <form-test area="body"></form-test>>
            <prueba-tarjeta></prueba-tarjeta>
            -->
			<!--
				<prueba-tarjetadocumento></prueba-tarjetadocumento>
            -->
			<!--
			<prueba-tarjeta-familia id="pruebaTarjetaFamilia" area="body"></prueba-tarjeta-familia>
            -->
		`;
	}
=======
    render() {
        return html`
            <div class="spinner" anillo fixed hidden></div>
            <menu-principal area="header"></menu-principal>
            <!--
            <form-test area="body"></form-test>>
            <prueba-tarjeta></prueba-tarjeta>
            -->
            <prueba-tarjetadocumento></prueba-tarjetadocumento>
            <ruta-opcionescontrol area="body"></ruta-opcionescontrol>
        `;
    }
>>>>>>> 703b93bc50f4b64fa872cfeab1eb68aad096641a

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
