/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { dialog } from "@brunomon/template-lit/src/views/css/dialog";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";

import { cambioOpcioRuta } from "../../redux/ruta/actions";

const SHOW = "ui.alert.timeStamp";
const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const RUTA = "ruta.timeStamp";

const OPCION_DATOS = "Datos";
const OPCION_DOMICILIO = "Domicilio";
const OPCION_CONTACTO = "Contacto";
const OPCION_DOCUM = "Documentacion";

export class RutaOpcionesControl extends connect(store, SCREEN, MEDIA_CHANGE, SHOW, RUTA)(LitElement) {
    constructor() {
        super();
        this.hidden = false;
        this.pasoActual = null;
        store.dispatch(cambioOpcioRuta(OPCION_DATOS));
    }
    static get styles() {
        return css`
            ${gridLayout}
            :host {
            }
            :host[hidden] {
                display: none;
            }
            /*:host([media-Size="small"]) *[no-small] {
                display: none;
            }
            :host(:not([media-Size="small"])) *[only-small] {
                display: none;
            }*/
            :host([media-Size="small"]) .number {
                font-size: 1rem;
                height: 0.5rem;
                width: 0.5rem;
                align-content: center;
            }
            :host([media-Size="small"]) .linea,
            .number {
                border-top: 1px solid var(--on-primario);
            }
            :host([media-Size="small"]) .number {
                border: 1px solid var(--on-primario);
            }
            :host([media-Size="small"]) label {
                font-size: 0.8rem;
            }
            :host([media-Size="small"]) #datosPersonales::after {
                content: "Datos";
            }
            :host(:not([media-Size="small"])) #datosPersonales::after {
                content: "Datos Personales";
            }
            :host([media-Size="small"]) #documentacion::after {
                content: "Documentos";
            }
            :host(:not([media-Size="small"])) #documentacion::after {
                content: "Documentacion";
            }
            .cuerpo {
                background-color: var(--secundario);
                color: var(--on-primario);
            }
            .pasos {
                grid-template-columns: 1fr 1fr 1fr 1fr;
                background-color: var(--secundario);
                gap: 0;
            }
            .number {
                background-color: var(--secundario);
                border: 0.2rem solid var(--on-primario);
                text-align: center;
                border-radius: 50%;
                height: 2rem;
                width: 2rem;
                grid-column: 1;
                grid-row: 1;
                z-index: 2;
            }
            .number[selected] {
                background-color: var(--terciario);
                color: var(--on-aplicacion);
                border: 0.2px solid var(--on-primario);
                font-weight: bold;
            }
            .linea {
                border: none;
                border-top: 0.2rem solid var(--on-primario);
                grid-column: 1;
                grid-row: 1;
                z-index: 1;
            }
            .paso:first-child .linea {
                transform: translateX(+50%);
            }
            .paso:last-child .linea {
                transform: translateX(-50%);
            }
        `;
    }
    render() {
        return html` <div class="cuerpo grid align-center">
            <div class="pasos inner-grid column">
                <div class="paso inner-grid itemsCenter">
                    <div class="number grid" @click=${this.seleccionarOpcionRuta} .option=${OPCION_DATOS} ?selected=${this.pasoActual == OPCION_DATOS}>1</div>
                    <div class="linea justify-self-stretch"></div>
                    <label id="datosPersonales"></label>
                </div>
                <div class="paso inner-grid itemsCenter">
                    <div class="number grid" @click=${this.seleccionarOpcionRuta} .option=${OPCION_DOMICILIO} ?selected=${this.pasoActual == OPCION_DOMICILIO}>2</div>
                    <label>Domicilio</label>
                    <div class="linea justify-self-stretch"></div>
                </div>
                <div class="paso inner-grid itemsCenter">
                    <div class="number grid" @click=${this.seleccionarOpcionRuta} .option=${OPCION_CONTACTO} ?selected=${this.pasoActual == OPCION_CONTACTO}>3</div>
                    <label>Contacto</label>
                    <div class="linea justify-self-stretch"></div>
                </div>
                <div class="paso inner-grid itemsCenter">
                    <div class="number grid" @click=${this.seleccionarOpcionRuta} .option=${OPCION_DOCUM} ?selected=${this.pasoActual == OPCION_DOCUM}>4</div>
                    <label id="documentacion"></label>
                    <div class="linea justify-self-stretch"></div>
                </div>
            </div>
        </div>`;
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
        }
        if (name == SHOW) {
            this.hidden = false;
        }
        if (name == RUTA) {
            this.pasoActual = state.ruta.current;
        }
    }

    seleccionarOpcionRuta(e) {
        //store.dispatch(cambioOpcioRuta(e.currentTarget.option));
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-Size",
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
            pasoActual: {
                type: String,
                reflect: true,
            },
        };
    }
}
window.customElements.define("ruta-opcionescontrol", RutaOpcionesControl);
