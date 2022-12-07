/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";

import { HELP } from "../../../../assets/icons/svgs.js";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { invalidCUITCUIL } from "../../../libs/funciones";
import { afiliadosByCuil } from "../../../redux/afiliados/actions";

import { goHistoryPrev, goTo } from "@brunomon/template-lit/src/redux/routing/actions";
import { afiliadoAcceptScreen } from "./afiliadoAccept";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class afiliadoPorCuil extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.area = "body";
        this.current = "";
        this.cuil = "";

        this.validaciones = {
            cuil: { invalid: false, isInvalid: invalidCUITCUIL },
        };
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${button}
			${input}
            :host {
                display: grid;
                position: relative;
                background-color: var(--aplicacion);
                align-content: start;
            }
            :host([hidden]) {
                display: none;
            }
            #titulo {
                display: grid;
                padding: 0.5rem;
                font-family: var(--font-header-h1-family);
                font-size: var(--font-header-h1-size);
                font-weight: 400;
                background-color: var(--secundario);
                color: var(--on-secundario);
            }
            #titulo div {
                margin: auto;
            }
            #cuerpo {
                background-color: var(--aplicacion);
                width: 60%;
                justify-self: center;
            }
            :host([media-Size="large"]) #cuerpo {
                width: 40%;
            }
        `;
    }

    render() {
        return html`
            <div id="titulo"><div>Ingrese CUIL del Titular</div></div>
            <div id="cuerpo" class="grid row">
                <div class="input" ?error=${this.validaciones.cuil.invalid}>
                    <input id="cuil" .value=${this.cuil} @blur="${this.enlace("cuil")}" />
                    <label for="cuil">CUIL</label>
                    <label error>Debe ingresar numero de CUIL válido</label>
                    <label subtext>Requerido</label>
                </div>
                <button raised @click="${this.buscar}">BUSCAR</button>
            </div>
            <afiliado-accept-screen id="afiliadoAccept"></afiliado-accept-screen>
        `;
    }

    buscar(state) {
        if (this.isValidForm()) {
            store.dispatch(afiliadosByCuil(this.cuil));
        }
    }

    isValidForm() {
        let isValid = true;
        Object.entries(this.validaciones).forEach(([field, value]) => {
            this.validaciones[field].invalid = this.validaciones[field].isInvalid(this.cuil);
            isValid = isValid && !this.validaciones[field].invalid;
        });
        this.requestUpdate();
        return isValid;
    }

    enlace(field) {
        return (e) => this.updateProperty(e, field);
    }

    updateProperty(e, field) {
        this.cuil = e.currentTarget.value;
        if (this.validaciones[field]) {
            this.validaciones[field].invalid = this.validaciones[field].isInvalid(this.cuil);
        }

        this.requestUpdate();
    }

    firstUpdated(changedProperties) {}

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["afiliadoPorCuil"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                this.validaciones.cuil.invalid = false;
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
        };
    }
}

window.customElements.define("afiliado-porcuil", afiliadoPorCuil);
