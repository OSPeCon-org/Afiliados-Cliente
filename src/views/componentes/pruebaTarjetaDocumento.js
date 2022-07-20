/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";

import { UPLOAD, SETTINGS, OK, CANCEL, HELP } from "../../../assets/icons/svgs.js";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { tarjetaDocumento } from "../css/tarjetaDocumento";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { RutaOpcionesControl } from "./rutaOpciones";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class pruebaTarjetaDocumento extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.first = true;
        this.alta = true;
        this.benef = {};
        this.nombre = "";
        this.items = [
            { titulo: "Documento frente", imagen: "OK", estado: "ACEPTADO", copete: "Aprobado", accion1: "VER DOCUMENTO", accion2: "" },
            { titulo: "Documento dorso", imagen: "CANCEL", estado: "RECHAZADO", copete: "Motivo del rechazo", accion1: "NUEVO DOCUMENTO", accion2: "VER DOCUMENTO" },
            { titulo: "Constancia de CUIL", imagen: "SETTINGS", estado: "EN PROCESO", copete: "A la espera de aprobación", accion1: "VER DOCUMENTO", accion2: "" },
            { titulo: "Formulario F154", imagen: "UPLOAD", estado: "PENDIENTE", copete: "Debe subir el documento", accion1: "NUEVO DOCUMENTO", accion2: "" },
        ];
        this.area = "body";
        this.svgs = { OK: OK, CANCEL: CANCEL, SETTINGS: SETTINGS, UPLOAD: UPLOAD };
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${tarjetaDocumento}
            ${button}
            :host {
                display: grid;
                grid-template-rows: auto 1fr;
            }
            .grilla {
                overflow-y: auto;
            }
        `;
    }

    render() {
        return html`
            <ruta-opcionescontrol></ruta-opcionescontrol>
            <div class="grid row grilla itemsCenter">
                ${this.items.map((item) => {
                    return html`
                        <div class="tarjeta" tipo=${item.imagen}>
                            <div titulo>
                                <div>${item.titulo}</div>
                                <div help>${HELP}</div>
                            </div>
                            <div estado>
                                <div>${item.estado}</div>
                                <div copete>${item.copete}</div>
                            </div>
                            ${this.svgs[item.imagen]}
                            <div acciones>
                                <button link disabled>${item.accion2}</button>
                                <button link action>${item.accion1}</button>
                            </div>
                        </div>
                    `;
                })}
            </div>
        `;
    }

    firstUpdated(changedProperties) {
        let controles = this.shadowRoot.querySelectorAll("*");
        controles.forEach((c) => {
            if (c.data) {
                c.value = this.item[c.data];
                c.addEventListener("change", (e) => {
                    this.updateProp(e, c.data);
                });
            }
        });
    }

    updateProp(e, prop) {
        this.item[prop] = e.currentTarget.value;
        if (e.currentTarget.type == "checkbox") this.item[prop] = e.currentTarget.checked;
        this.update();
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["formDocumentacion"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
        }
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            icono: {
                type: String,
                reflect: true,
            },
        };
    }
}

window.customElements.define("prueba-tarjetadocumento", pruebaTarjetaDocumento);
