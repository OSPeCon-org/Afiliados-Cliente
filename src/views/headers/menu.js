/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { logo } from "@brunomon/template-lit/src/views/css/logo";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { MENU, RIGHT, PERSON } from "../../../assets/icons/svgs";
import { AUTORIZACION_ERROR, logout } from "../../redux/autorizacion/actions";
import { gesturesController } from "@brunomon/template-lit/src/views/controllers/gesturesController";
import { loguearConNuevoUsuario, LOGUEAR_CON_NUEVO_USUARIO, selection, showConfirm } from "../../redux/ui/actions";
import { autorizacion } from "../../redux/autorizacion/actions";
import { getGrupoFamiliar } from "../../redux/afiliados/actions";
import { setCurrent as setCurrentDatos } from "../../redux/afiliadoDatos/actions";
import { setCurrent as setCurrentDomicilio } from "../../redux/afiliadoDomicilios/actions";
import { setCurrent as setCurrentContactos } from "../../redux/afiliadoContactos/actions";
import logoCruz from "../../../assets/image/logoCruz.png";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SELECTION = "ui.menu.timeStamp";
const SCREEN = "screen.timeStamp";
const AUTORIZACION = "autorizacion.timeStamp";
const AUTORIZACION_FALLA = "autorizacion.errorTimeStamp";
const LOGUEAR = "ui.loguearConNuevoUsuarioTimeStamp";

export class menuPrincipal extends connect(store, MEDIA_CHANGE, SCREEN, AUTORIZACION, SELECTION, AUTORIZACION_FALLA, LOGUEAR)(LitElement) {
    constructor() {
        super();
        this.area = "header";
        this.visible = false;
        this.arrastrando = false;
        this.usuario = null;
        this.optionsCount = 3;
        this.defaultOption = 2;
        this.selectedOption = new Array(this.optionsCount).fill(false);
        //this.selectedOption[this.defaultOption] = true;

        const gestures = new gesturesController(this, this.gestos);
        this.profile = "ACCEDER";
        this.popUp = null;
        this.logueado = false;

        window.addEventListener(
            "message",
            (e) => {
                var origin = e.origin;
                if (origin == "https://front.uocra.net") {
                    try {
                        this.popUp.close();
                        const profile = this.parseJwt(e.data);
                        if (profile.exp < new Date().getTime() / 1000) {
                            store.dispatch(showConfirm("Control de Accesos", "Su permiso ha expirado, ¿ quiere actualizalo ?", loguearConNuevoUsuario(), null));
                            return;
                        } else {
                            this.logueado = true;
                            store.dispatch(autorizacion(e.data));
                        }
                    } catch {}
                }
            },
            false
        );
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${select}
            ${logo}
            ${button}
            :host {
                display: grid;
                grid-auto-flow: column;
                padding: 0 !important;
                background-color: var(--primario);
            }
            :host([hidden]) {
                display: none;
            }
            :host(:not([logueado])) *[solo-logueado] {
                display: none;
            }
            #imagen {
                color: red;
                width: 2rem;
                height: 2rem;
                background-repeat: no-repeat;
                background-size: 2rem 2rem;
            }
            #titulo {
                color: var(--on-primario);
                cursor: pointer;
                font-size: 2vh;
            }
            .menuItem {
                color: var(--on-secundario);
                cursor: pointer;
            }
            div[oculto] {
                display: none;
            }
            #version {
                color: var(--on-primario);
                font-size: 0.6rem;
                align-self: start;
            }
            #opciones {
                font-size: 1.2vh;
                justify-content: end;
                padding: 0;
            }
            :host([media-size="large"]) .menu-button,
            :host([media-size="large"]) #velo {
                display: none;
            }
            #velo {
                position: fixed;
                top: 0;
                right: -100%;
                width: 100vw;
                height: 100vh;
                background-color: var(--velo);
                z-index: 90;
            }
            .menu-button {
                cursor: pointer;
                justify-self: end;
                justify-content: end;
                display: grid;
            }

            :host([visible]) #velo {
                right: 0;
            }

            :host([arrastrando]) #opciones {
                position: absolute;
                transition: none;
            }
            .activo {
                color: var(--light-text-color);
                font-size: var(--font-label-size);
            }

            :host([media-size="large"]) button[selected] {
                color: var(--terciario);
                stroke: var(--terciario);
                fill: var(--terciario);
            }

            :host(:not([media-size="large"])) #opciones {
                position: fixed;
                top: 0;
                right: -100%;
                height: 100vh;
                width: 60%;
                grid-auto-flow: row;
                background-color: var(--secundario);
                align-content: start;
                transition: 0.3s all;
                display: grid;
                justify-items: start;
                z-index: 100;
            }
            svg {
                height: 3.5vh;
                width: 3.5vh;
            }
            button[etiqueta] {
                display: grid;
                grid-auto-flow: column;
                grid-template-columns: auto 1fr;
                grid-gap: 0.3rem;
                align-items: center;
                align-content: center;
            }
            button[link] {
                color: var(--on-primario);
                stroke: var(--on-primario);
                fill: var(--on-primario);
            }
            button[raised] {
                box-shadow: none;
                padding: 3vh !important;
            }
            #version {
                color: var(--on-primario-bajada);
            }
            .popup {
                position: absolute;
                left: 0;
                top: 100%;
                background-color: var(--formulario);
                color: var(--on-formulario);
                display: none;
                z-index: 1000;
            }
            #acceso {
                position: relative;
            }
            #acceso[logueado]:hover .popup {
                display: grid;
            }
            :host([media-size="small"]) #acceso[logueado] .popup {
                display: grid;
                background-color: var(--secundario);
            }
            :host([media-size="small"]) #acceso[logueado] .popup button {
                color: var(--on-primario);
                font-size: 0.8rem;
                text-align: start;
                padding: 0rem 0rem;
            }
        `;
    }
    render() {
        return html`
            <div id="velo" @click=${this.toggleMenu}></div>
            <div class="grid column" style="padding: 0 1rem;">
                <div class="inner-grid column start">
                    <div id="imagen" style="background-image:url(${logoCruz})"></div>
                    <div id="titulo" @click="${this.click}" .option=${"main"}>${__DESCRIPTION__}</div>
                    <div id="version">${__VERSION__}</div>
                </div>
                <button raised circle class="menu-button" @click=${this.toggleMenu}>${MENU}</button>
            </div>

            <div id="opciones" class="grid column" @click=${this.toggleMenu}>
                <button raised circle action class="menu-button">${RIGHT}</button>

                <button link ?selected="${this.selectedOption[1]}" @click=${this.nuevaAfiliacion} solo-logueado>Nueva Afiliacion</button>

                <div id="acceso" ?logueado="${this.logueado}">
                    <button link etiqueta ?selected="${this.selectedOption[2]}" @click=${this.abrir} .option=${"log"}>
                        <div>${PERSON}</div>
                        <div class="justify-self-start">${this.profile}</div>
                    </button>
                    <div class="grid popup">
                        <button flat="" action="" @click=${this.abrirForzado}>
                            <div>Acceder con otro usuario</div>
                        </button>
                        <button flat="" action="" @click=${this.salir}>
                            <div>Salir</div>
                        </button>
                    </div>
                </div>
            </div>
        `;
    } /*<button link ?selected="${this.selectedOption[0]}" @click=${this.nuevaAfiliacion} solo-logueado>Nueva Afiliacion</button>*/
    isSelected(e) {
        return true;
    }
    gestos(e) {
        if (this.mediaSize != "large") {
            if (e.detail.ACTION == "move") {
                if (e.detail.dx > 0) {
                    this.arrastrando = true;
                    this.opciones.style.right = -e.detail.dx + "px";
                }
            }
            if (e.detail.ACTION == "end" && e.detail.LEFT_TO_RIGHT) {
                this.arrastrando = false;
                if (e.detail.dx > 40) {
                    this.toggleMenu();
                } else {
                    this.opciones.style.right = "0";
                }
            }
        }
    }
    toggleMenu() {
        this.visible = !this.visible;
        this.opciones.style.right = this.visible ? "0" : "-100%";
    }

    nuevaAfiliacion(e) {
        this.selectedOption = new Array(this.optionsCount).fill(false);
        this.selectedOption[Array.from(e.currentTarget.parentNode.children).indexOf(e.currentTarget) - 1] = true;

        if (store.getState().autorizacion.entities.titulares.length == 0) {
            store.dispatch(goTo("afiliadoPorCuil"));
        } else {
            store.dispatch(getGrupoFamiliar(store.getState().autorizacion.entities.titulares[0].titularId));
            store.dispatch(goTo("afiliadoMostrar"));
        }

        store.dispatch(selection(e.currentTarget.option));
    }

    grupoFamiliar(e) {
        this.selectedOption = new Array(this.optionsCount).fill(false);
        this.selectedOption[Array.from(e.currentTarget.parentNode.children).indexOf(e.currentTarget) - 1] = true;
        store.dispatch(goTo("afiliadoMostrar"));
    }
    parseJwt(token) {
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

    abrir(e) {
        if (this.profile == "ACCEDER") {
            this.popUp = window.open("https://front.uocra.net/auth/index.html", "_blank", "top=0,left=0,width=" + window.innerWidth / 2 + ",height=" + window.innerHeight, true);
        }
    }
    abrirForzado(e) {
        this.popUp = window.open("https://front.uocra.net/auth/index.html?nuevo=true", "_blank", "top=0,left=0,width=" + window.innerWidth / 2 + ",height=" + window.innerHeight, true);
        store.dispatch(goTo("main"));
    }

    salir() {
        this.profile = "ACCEDER";
        this.logueado = false;
        store.dispatch(goTo("main"));
    }

    firstUpdated(changedProperties) {
        this.opciones = this.shadowRoot.querySelector("#opciones");
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            const isCurrentScreen = state.screen.name != null;
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
        }
        if (name == AUTORIZACION) {
            const profile = this.parseJwt(state.autorizacion.tokenAutentication);
            this.profile = profile["family_name"] + " " + profile["given_name"];
        }
        if (name == AUTORIZACION_FALLA) {
            store.dispatch(showConfirm("Control de Accesos", "Acceso denegado, ¿ quiere acceder con otro usuario ?", loguearConNuevoUsuario(), null));
        }
        if (name == LOGUEAR) {
            this.abrirForzado();
        }
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
            hidden: {
                type: Boolean,
                reflect: true,
            },
            profile: {
                type: String,
                reflect: false,
            },
            area: {
                type: String,
            },
            visible: {
                type: Boolean,
                reflect: true,
            },
            arrastrando: {
                type: Boolean,
                reflect: true,
            },
            selectedOption: {
                type: Array,
            },
            logueado: {
                type: Boolean,
                reflect: true,
            },
        };
    }
}
window.customElements.define("menu-principal", menuPrincipal);
