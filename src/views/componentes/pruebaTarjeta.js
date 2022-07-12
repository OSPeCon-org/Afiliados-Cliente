/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";

import { UPLOAD, SETTINGS, OKCIRCLE, CANCELCIRCLE } from "../../../assets/icons/svgs.js";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { isInLayout } from "../../redux/screens/screenLayouts";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class pruebaTarjeta extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.first = true;
        this.alta = true;
        this.benef = {};
        this.nombre = "bruno";
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
            :host {
                display: grid;
                grid-template-rows: 15rem 5rem 5rem 5rem;
                align-content: start;
                align-items: start;
                overflow-y: auto;
                gap: 1rem;
                border-radius: 5px;
                cursor: pointer;
                width: 20rem;
                height: 33rem;
                background-color: var(--formulario);
            }

            .subtitulo {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                width: 95vw;
                font-size: var(--font-subcaption-size);
                padding-bottom: 1rem;
                margin-left: 0.5rem;
            }
            .s1bold {
                font-weight: bold;
            }
            .superior {
                overflow: hidden;
                height: 100%;
                background-image: url("http://localhost/AfiliadosWebImagenes/2463730.png");
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain;
            }
            .superior > img {
                object-fit: cover;
                min-height: 100%;
                min-width: 100%;
            }
            .inferior {
                display: grid;

                grid-template-rows: 1fr 1fr 1fr;
                grid-template-columns: 1fr;
                //padding: 0.2rem;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                font-family: sans-serif;
                /* text-align: center;
                justify-content: center;
                align-items: center;
                width: 95%; */
            }

            .pietarjeta {
                background: var(--neutro-30);
                border-radius: 0 0 10px 10px;
                text-align: center;
                color: white;
            }
            .titulo {
                display: grid;
                grid-template-rows: 1fr 1fr;
                padding-bottom: 1fr;
            }
            .primario {
                display: grid;
                color: var(--on-aplicacion);
                font-weight: 600;
                font-size: 1.8rem;
            }
            .secundario {
                display: grid;
                color: var(--on-formulario-disabled);
            }
            .descripcion {
                display: grid;
                padding-bottom: 1fr;
                color: var(--on-formulario-disabled);
            }
            .accion {
                display: grid;
                grid-template-columns: 1fr 1fr;
                color: var(--secundario-10);
                //justify-content: space-between;
                justify-items: center;
                align-items: center;
                font-weight: 700;
                font-size: 1.2rem;
            }
            .accion1 {
                display: grid;
                align-self: center;
            }
            .accion2 {
                display: grid;
                align-self: center;
            }
        `;
    }

    render() {
        return html`
            <!-- <div class="subtitulo s1bold">PRUEBA TARJETA</div> -->

            <div class="inner-grid superior"></div>

            <div class="grid titulo">
                <div class="primario">Título</div>
                <div class="secundario">Copete</div>
            </div>
            <div class="grid descripcion">Descripción</div>
            <div class="inner-grid accion">
                <div>ACCION 1</div>
                <div>ACCION 2</div>
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
            titulo: {
                type: String,
                reflect: true,
            },
            subtitulo: {
                type: String,
                reflect: true,
            },
            descrip: {
                type: Boolean,
                reflect: true,
            },
            accion1: {
                type: String,
                reflect: true,
            },
            accion2: {
                type: String,
                reflect: true,
            },
            accion3: {
                type: String,
                reflect: true,
            },
        };
    }
}

window.customElements.define("prueba-tarjeta", pruebaTarjeta);
