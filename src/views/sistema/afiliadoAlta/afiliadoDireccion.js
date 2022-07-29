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
import { get as GetAfiliadosDatos } from "../../../redux/afiliadoDatos/actions";
import { cambioOpcioRuta } from "../../../redux/ruta/actions";

import { isEmpty } from "../../../libs/funciones";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const RUTA = "ruta.timeStamp";

const PROVINCIAS = "provincias.timeStamp";
const LOCALIDADES = "localidades.timeStamp";

export class afiliadoDireccionScreen extends connect(store, SCREEN, MEDIA_CHANGE, PROVINCIAS, LOCALIDADES)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.area = "body";
        this.current = "";
        this.item = {};
        (this.provincias = null), (this.localidades = null), (this.svgs = { BENEF: BENEF, GRPFAM: GRPFAM });

        this.validaciones = {
            calle: { invalid: false, isInvalid: isEmpty },
            altura: { invalid: false, isInvalid: isEmpty },
            piso: { invalid: false, isInvalid: isEmpty },
            departamento: { invalid: false, isInvalid: isEmpty },
            provincia: { invalid: false, isInvalid: isEmpty },
            localidad: { invalid: false, isInvalid: isEmpty },
            codigoPostal: { invalid: false, isInvalid: isEmpty },
        };
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
                    <div class="input" ?error=${this.validaciones.calle.invalid}>
                        <input id="calle" .value=${this.item.calle} @blur="${this.enlace("calle")}" />
                        <label for="calle">Calle</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input" ?error=${this.validaciones.altura.invalid}>
                        <input id="altura" .value=${this.item.altura} @blur="${this.enlace("altura")}" />
                        <label for="altura">Altura</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input" ?error=${this.validaciones.piso.invalid}>
                        <input id="piso" .value=${this.item.piso} @blur="${this.enlace("piso")}" />
                        <label for="piso">Piso</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input" ?error=${this.validaciones.departamento.invalid}>
                        <input id="departamento" .value=${this.item.departamento} @blur="${this.enlace("departamento")}" />
                        <label for="departamento">Departamento</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                </div>
                <div class="linea"></div>
                <div class="grupo">
                    <div class="select" ?error=${this.validaciones.provincia.invalid}>
                        <select id="provincia" required .value=${this.item.provincia} @blur="${this.enlace("provincia")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            ${this.provincias?.map((item) => {
                                return html` <option>${item.descripcion}</option> `;
                            })}
                        </select>
                        <label for="provincia">Provincia</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select" ?error=${this.validaciones.localidad.invalid}>
                        <select id="localidad" required .value=${this.item.localidad} @blur="${this.enlace("localidad")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            ${this.localidades?.map((item) => {
                                return html` <option>${item.descripcion}</option> `;
                            })}
                        </select>
                        <label for="localidad">Localidad</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                </div>
                <div class="linea"></div>
                <div class="grupo">
                    <div class="input" ?error=${this.validaciones.codigoPostal.invalid}>
                        <input id="codigoPostal" .value=${this.item.codigoPostal} @blur="${this.enlace("codigoPostal")}" />
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
        if (this.isValidForm()) {
            store.dispatch(goTo("afiliadoContacto"));
        } else {
            this.requestUpdate();
        }
    }

    isValidForm() {
        let isValid = true;
        Object.entries(this.validaciones).forEach(([field, value]) => {
            this.validaciones[field].invalid = this.validaciones[field].isInvalid(this.item[field]);
            isValid = isValid && !this.validaciones[field].invalid;
        });
        return isValid;
    }

    enlace(field) {
        return (e) => this.updateProperty(e, field);
    }
    updateProperty(e, field) {
        this.item[field] = e.currentTarget.value;
        if (this.validaciones[field]) {
            this.validaciones[field].invalid = this.validaciones[field].isInvalid(this.item[field]);
        }

        this.requestUpdate();
    }

    firstUpdated(changedProperties) {}

    stateChanged(state, name) {
        let hiddenAnterior = this.hidden;
        this.hidden = true;
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            const isCurrentScreen = ["afiliadoDireccion"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                if (hiddenAnterior) {
                    store.dispatch(GetAfiliadosDatos());
                    store.dispatch(cambioOpcioRuta(OPCION_DOMICILIO));
                }
                this.hidden = false;

                this.item = {
                    calle: "",
                    altura: "",
                    piso: "",
                    departamento: "",
                    provincia: "",
                    localidad: "",
                    codigoPostal: "",
                };
            }
        }

        if (name == PROVINCIAS) {
            this.provincias = state.provincias.entities;
            this.update();
        }

        if (name == LOCALIDADES) {
            this.localidades = state.localidades.entities;
            this.update();
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
