/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";

import { BENEF, GRPFAM } from "../../../../assets/icons/svgs.js";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";

import { OPCION_DOMICILIO, RutaOpcionesControl } from "../../componentes/rutaOpciones";
import { goTo, goHistoryPrev } from "@brunomon/template-lit/src/redux/routing/actions";
import { cambioOpcioRuta } from "../../../redux/ruta/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const RUTA = "ruta.timeStamp";

export class afiliadoDireccionScreen extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.area = "body";
        this.current = "";
        this.svgs = { BENEF: BENEF, GRPFAM: GRPFAM };
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${button}
			${input}
			${select}
            :host {
                display: grid;
                position: relative;
                width: 100vw;
                grid-template-rows: auto 1fr;
                justify-items: center;
            }
            :host([hidden]) {
                display: none;
            }
            ruta-opcionescontrol {
                width: 100vw;
            }
            #cuerpo {
                width: 100vw;
                align-content: flex-start;
                grid-gap: 0;
                padding: 0;
                overflow-y: auto;
                background-color: var(--formulario);
            }
            :host([media-Size="medium"]) #cuerpo {
                width: 80vw;
            }
            :host([media-Size="large"]) #cuerpo {
                width: 70vw;
            }
            .grupo {
                display: grid;
                width: inherit;
                grid-template-columns: repeat(auto-fill, minmax(14rem, 20rem));
                grid-row-gap: 0.5rem;
                grid-column-gap: 2rem;
                padding: 1rem 0;
                justify-content: center;
                background-color: var(--formulario);
            }
            .linea {
                width: 90%;
                height: 1px;
                background-color: var(--on-formulario-separador);
                justify-self: center;
            }
        `;
    }

    render() {
        return html`
            <ruta-opcionescontrol></ruta-opcionescontrol>
            <div id="cuerpo" class="grid row">
                <div class="grupo">
                    <div class="input">
                        <input id="calle" />
                        <label for="calle">Calle</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input">
                        <input id="altura" />
                        <label for="altura">Altura</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input">
                        <input id="piso" />
                        <label for="piso">Piso</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input">
                        <input id="departamento" />
                        <label for="departamento">Departamento</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                </div>
                <div class="linea"></div>
                <div class="grupo">
                    <div class="select">
                        <select id="provincia" required>
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="1">Buenos Aires</option>
                            <option value="2">CABA</option>
                        </select>
                        <label for="provincia">Provincia</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select">
                        <select id="localidad" required>
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="1">Dolores</option>
                            <option value="2">Chascomus</option>
                        </select>
                        <label for="localidad">Localidad</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                </div>
                <div class="linea"></div>
                <div class="grupo">
                    <div class="input">
                        <input id="codigoPostal" />
                        <label for="codigoPostal">Codigo postal</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                </div>
                <div class="grid column" style="padding-bottom:5rem">
                    <button flat @click="${this.atras}">ANTERIOR</button>
                    <button raised @click="${this.siguiente}">SIGUIENTE</button>
                </div>
            </div>
        `;
    }

    atras() {
        store.dispatch(goHistoryPrev());
    }
    siguiente() {
        store.dispatch(goTo("afiliadoContacto"));
    }
    firstUpdated(changedProperties) {}

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["afiliadoDireccion"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                store.dispatch(cambioOpcioRuta(OPCION_DOMICILIO));
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

window.customElements.define("afiliado-direccion-screen", afiliadoDireccionScreen);
