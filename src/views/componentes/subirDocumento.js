/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { dialog } from "@brunomon/template-lit/src/views/css/dialog";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";

import { fotoScreen } from "./fotoScreen";

export class SubirDocumentoControl extends connect(store)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.titulo = "";
        this.botonPc = "";
        this.botonCamara = "";
        this.botonVolver = "";
        this.onPc = null;
        this.onCamara = null;
        this.onVolver = null;
    }
    static get styles() {
        return css`
            ${button}
            ${dialog}
            ${gridLayout}
            :host[hidden] {
                display: none;
            }
        `;
    }

    willUpdate(changedProperties) {
        if (changedProperties.has("hidden")) {
            if (!this.hidden) {
                this.renderRoot.querySelector("dialog").showModal();
            }
        }
        if (changedProperties.has("onCamara")) {
            let rr = this.onCamara;
            let dd = 0;
        }
    }
    render() {
        return html`<dialog>
                <div class="header">${this.titulo}</div>
                <div class="body grid row">
                    <button link @click="${this.PC}">
                        <div>${this.botonPc}</div>
                    </button>
                    <button link @click="${this.Camara}">
                        <div>${this.botonCamara}</div>
                    </button>
                </div>
                <div class="footer">
                    <button link @click="${this.volver}">
                        <div>${this.botonVolver}</div>
                    </button>
                </div>
            </dialog>
            <foto-screen id="foto" fotonombre="foto1" hidden></foto-screen>; `;
    }

    stateChanged(state, name) {}
    cerrar() {
        this.renderRoot.querySelector("dialog").close();
        this.hidden = true;
    }
    PC(e) {
        if (this.onPc) store.dispatch(this.onPc);
        this.cerrar();
    }
    Camara(e) {
        this.cerrar();
        this.shadowRoot.querySelector("#foto").showModal();
        //this.shadowRoot.querySelector("#foto").showModal();
        if (this.onCamara) {
            //this.onCamara();
        }
    }
    volver(e) {
        if (this.onVolver) store.dispatch(this.onVolver);
        this.cerrar();
    }
    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
            },
            titulo: { type: String, reflect: true },
            botonPc: { type: String, reflect: true },
            botonCamara: { type: String, reflect: true },
            botonVolver: { type: String, reflect: true },
            onPc: { type: Object, reflect: true },
            onCamara: { type: String, reflect: true },
            onVolver: { type: Object, reflect: true },
        };
    }
}
window.customElements.define("subir-documento-control", SubirDocumentoControl);
