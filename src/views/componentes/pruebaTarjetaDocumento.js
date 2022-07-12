/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";

import { UPLOAD, SETTINGS, OK, CANCEL, HELP } from "../../../assets/icons/svgs.js";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { tarjetaDocumento } from "../css/tarjetaDocumento";
import { button } from "@brunomon/template-lit/src/views/css/button";

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
            { nombre: "F572", imagen: "http://localhost/AfiliadosWebImagenes/pdf.jpg", info: "24-01-2019" },
            { nombre: "DDJJ", imagen: "http://localhost/AfiliadosWebImagenes/doc.jpg", info: "30-09-2020" },
            { nombre: "Monotributo", imagen: "http://localhost/AfiliadosWebImagenes/2463730.png", info: "01-04-2021" },
            { nombre: "F152", imagen: "http://localhost/AfiliadosWebImagenes/docs.jpg", info: "12-01-2022" },
            { nombre: "DNI (familiar a cargo)", imagen: "http://localhost/AfiliadosWebImagenes/dni.jpg", info: "21-05-2022" },
        ];
        this.area = "body";
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${tarjetaDocumento}
            ${button}
            :host {
                display: grid;
                align-content: start;
                justify-content: center;
                overflow-y: auto;
                gap: 1rem;
                padding: 1rem;
                height: 70vh;
            }
        `;
    }

    render() {
        return html`
            <div class="tarjeta" ok>
                <div titulo>
                    <div>Documento frente</div>
                    <div>${HELP}</div>
                </div>
                <div estado>
                    <div>ACEPTADO</div>
                    <div class="copete">Aprobado</div>
                </div>
                ${OK}
                <div acciones>
                    <button link disabled></button>
                    <button link action>VER DOCUMENTO</button>
                </div>
            </div>

            <div class="tarjeta" cancel>
                <div titulo>
                    <div>Documento frente</div>
                    <div>${HELP}</div>
                </div>
                <div estado>
                    <div>RECHAZADO</div>
                    <div class="copete">Motivo Rechazo</div>
                </div>
                ${CANCEL}
                <div acciones>
                    <button link>VER DOCUMENTO</button>
                    <button link action>NUEVO DOCUMENTO</button>
                </div>
            </div>

            <div class="tarjeta" settings>
                <div titulo>
                    <div>Documento frente</div>
                    <div>${HELP}</div>
                </div>
                <div estado>
                    <div>EN PROCESO</div>
                    <div class="copete">A la espera de aprobación</div>
                </div>
                ${SETTINGS}
                <div acciones>
                    <button link disabled></button>
                    <button link action>VER DOCUMENTO</button>
                </div>
            </div>

            <div class="tarjeta" upload>
                <div titulo>
                    <div>Documento frente</div>
                    <div>${HELP}</div>
                </div>
                <div estado>
                    <div>PENDIENTE</div>
                    <div class="copete">Debe subir el documento</div>
                </div>
                ${UPLOAD}
                <div acciones>
                    <button link disabled></button>
                    <button link action>NUEVO DOCUMENTO</button>
                </div>
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
