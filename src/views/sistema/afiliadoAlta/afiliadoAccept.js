/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";

import { BENEF, GRPFAM, PERSON } from "../../../../assets/icons/svgs.js";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { button } from "@brunomon/template-lit/src/views/css/button";

import { tarjetaPersona } from "../../css/tarjetaPersona";
import { goTo } from "../../../redux/routing/actions";

import { accept } from "../../../redux/autorizacion/actions";
import { getGrupoFamiliar } from "../../../redux/afiliadoDatos/actions";
import { setCurrent as setCurrentDomicilio } from "../../../redux/afiliadoDomicilios/actions";
import { setCurrent as setCurrentContactos } from "../../../redux/afiliadoContactos/actions";

import { dialog } from "@brunomon/template-lit/src/views/css/dialog";
import foto from "../../../../assets/image/foto.png";
import { afiliadoAccion } from "../../../redux/afiliados/actions";
import { altaDeTitular } from "../../../redux/uiAfiliados/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const GRUPO_FAMILIAR = "afiliados.timeStamp";
const AFILIADO_BY_CUIL = "afiliados.afiliadoByCuilTimeStamp";
const ACCEPT = "autorizacion.acceptTimeStamp";

export class afiliadoAcceptScreen extends connect(store, SCREEN, MEDIA_CHANGE, ACCEPT, AFILIADO_BY_CUIL, GRUPO_FAMILIAR)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.area = "body";
        this.currentByCuil = "";

        this.svgs = { BENEF: BENEF, GRPFAM: GRPFAM };
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${button}
			${tarjetaPersona}
            ${dialog}
            :host {
                display: grid;
                position: relative;

                background-color: var(--aplicacion);
            }
            :host([hidden]) {
                display: none;
            }
            #subtitulo {
                display: grid;
                font-family: var(--font-header-h1-family);
                font-size: var(--font-header-h1-size);
                font-weight: 400;
                background-color: var(--secundario);
                color: var(--on-secundario);
            }
            #subtitulo div {
                margin: auto;
            }
            #cuerpo1 {
                display: grid;
                grid-gap: 1rem;
                padding: 1rem 0;
                overflow-y: auto;
                justify-content: center;
                justify-items: center;
                align-content: flex-start;
                background-color: transparent;
            }
            div[invisible] {
                visibility: hidden;
            }
            *[hidden] {
                display: none;
            }
            dialog {
                max-width: 80vw;
            }
            .tarjeta-persona {
                border: solid 1px var(--on-aplicacion-separador);
            }
        `;
    }

    render() {
        return html`
            <dialog id="encontrado" ?hidden=${this.modo != "encontrado"}>
                <div class="header">Confirmacion de identidad</div>
                <div class="body">
                    <div id="cuerpo1">
                        <div class="tarjeta-persona">
                            <div titulo>
                                <div help style="width:1px"></div>
                                <div style="text-align:left">${this.currentByCuil.apellido}, ${this.currentByCuil.nombre}</div>
                            </div>
                            <div cuerpo><img src="${foto}" /></div>
                            <div nombre>DNI: ${this.currentByCuil.documento}</div>
                            <div documento>F. NAC.: ${this.formato(this.currentByCuil.fechaNacimiento)}</div>
                        </div>
                    </div>
                </div>
                <div class="footer column">
                    <button link @click="${this.cancel1}">
                        <div>VOLVER</div>
                    </button>
                    <button link @click="${this.aceptar}">
                        <div>ACEPTAR</div>
                    </button>
                </div>
            </dialog>
            <dialog id="noencontrado" ?hidden=${this.modo != "no-encontrado"}>
                <div class="header">CUIL NO ENCONTRADO</div>
                <div class="body">El CUIL ingresado no se encuentra afiliado. Genera una nueva afiliacion?</div>
                <div class="footer column">
                    <button link @click="${this.cancel2}">
                        <div>VOLVER</div>
                    </button>
                    <button link @click="${this.afiliarme}">
                        <div>SI</div>
                    </button>
                </div>
            </dialog>
        `;
    }
    formato(fecha) {
        let r = new Date(fecha);
        return r.toLocaleString("fr", { year: "numeric", month: "2-digit", day: "2-digit" });
    }
    cancel1() {
        this.renderRoot.querySelector("#encontrado").close();
        this.hidden = true;
    }
    cancel2() {
        this.renderRoot.querySelector("#noencontrado").close();
        this.hidden = true;
    }
    aceptar() {
        this.renderRoot.querySelector("#encontrado").close();
        store.dispatch(accept(store.getState().afiliados.afiliadoByCuil.id));
    }

    afiliarme() {
        this.renderRoot.querySelector("#noencontrado").close();

        store.dispatch(altaDeTitular());
    }

    firstUpdated(changedProperties) {}

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
        }

        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["afiliadoAccept"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
        }

        if (name == AFILIADO_BY_CUIL && state.screen.name == "afiliadoPorCuil") {
            this.hidden = false;
            this.currentByCuil = state.afiliados.afiliadoByCuil;
            if (this.currentByCuil.status == 404) {
                this.modo = "no-encontrado";
                this.renderRoot.querySelector("#noencontrado").showModal();
            } else {
                this.modo = "encontrado";
                this.renderRoot.querySelector("#encontrado").showModal();
            }

            this.update();
        }
        if (name == ACCEPT && state.screen.name == "afiliadoPorCuil") {
            store.dispatch(goTo("afiliadoMostrar"));
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
            area: {
                type: String,
            },
            current: {
                type: String,
                reflect: true,
            },
            modo: {
                type: String,
                reflect: true,
            },
        };
    }
}

window.customElements.define("afiliado-accept-screen", afiliadoAcceptScreen);
