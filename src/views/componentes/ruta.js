/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { dialog } from "@brunomon/template-lit/src/views/css/dialog";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";

const SHOW = "ui.alert.timeStamp";

export class RutaControl extends connect(store, SHOW)(LitElement) {
    constructor() {
        super();
        this.hidden = false;
        this.pasoActual = 1;
    }
    static get styles() {
        return css`
            ${gridLayout}
            :host {
            }
            :host[hidden] {
                display: none;
            }
            .cuerpo {
                background-color: var(--secundario);
                color: var(--on-primario);
            }
            .pasos {
                background-color: var(--secundario);
                gap: 0;
            }
            .number {
                background-color: var(--secundario);
                border: 3px solid var(--on-primario);
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
                border: 3px solid var(--terciario);
                font-weight: bold;
            }
            .linea {
                border: none;
                border-top: 3px solid var(--on-primario);
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
                    <div class="number grid" ?selected=${this.pasoActual == 1}>1</div>
                    <div class="linea justify-self-stretch"></div>
                    <label>Datos Personales</label>
                </div>
                <div class="paso inner-grid itemsCenter">
                    <div class="number grid" ?selected=${this.pasoActual == 2}>2</div>
                    <label>Domicilio</label>
                    <div class="linea justify-self-stretch"></div>
                </div>
                <div class="paso inner-grid itemsCenter">
                    <div class="number grid" ?selected=${this.pasoActual == 3}>3</div>
                    <label>Contacto</label>
                    <div class="linea justify-self-stretch"></div>
                </div>
                <div class="paso inner-grid itemsCenter">
                    <div class="number grid" ?selected=${this.pasoActual == 4}>4</div>
                    <label>Documentacion</label>
                    <div class="linea justify-self-stretch"></div>
                </div>
            </div>
        </div>`;
    }

    stateChanged(state, name) {
        if (name == SHOW) {
            this.hidden = false;
        }
    }

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
            },
            pasoActual: {
                type: Number,
                reflect: true,
            },
        };
    }
}
window.customElements.define("ruta-control", RutaControl);
