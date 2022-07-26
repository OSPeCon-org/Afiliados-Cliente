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

import { OPCION_DATOS, RutaOpcionesControl } from "../../componentes/rutaOpciones";
import { goHistoryPrev, goTo } from "@brunomon/template-lit/src/redux/routing/actions";

import { cambioOpcioRuta } from "../../../redux/ruta/actions";
import { getAll as GetAllNacionalidades } from "../../../redux/nacionalidades/actions";
import { getAll as GetAllParentesco } from "../../../redux/parentesco/actions";
import { Store } from "@material-ui/icons";
import { get as GetAfiliadosDatos } from "../../../redux/afiliadoDatos/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

const PARENTESCO = "parentesco.timeStamp";
const PLAN = "plan.timeStamp";
const TIPO_DOCUMENTO = "tipoDocumento.timeStamp";
const ESTADOS_CIVILES = "estadosCiviles.timeStamp";
const NACIONALIDADES = "nacionalidades.timeStamp";

const AFILIADO_DATOS_SUCCESS = "afiliadoDatos.timeStamp";

export class afiliadoDatosScreen extends connect(store, SCREEN, MEDIA_CHANGE, AFILIADO_DATOS_SUCCESS, PARENTESCO)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.area = "body";
        this.current = "";
        this.parentescos = null;
        this.planes = [];
        this.tipoDocumento = [];
        this.estadoCivil = [];
        this.nacionalidades = [];

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
                    <div class="select">
                        <select id="parentesco" required>
                            <option value="" disabled selected>Selecciona una opción</option>
                            ${this.parentescos?.map((item) => {
                                return html` <option>${item.descripcion}</option> `;
                            })}
                        </select>
                        <label for="parentesco">Parentesco</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input">
                        <input id="cuil" />
                        <label for="cuil">CUIL</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select">
                        <select id="plan" required>
                            <option value="" disabled selected>Selecciona una opción</option>
                            ${this.planes.map((item) => {
                                return html` <option>${item.descripcion}</option> `;
                            })}
                        </select>
                        <label for="plan">Plan</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                </div>
                <div class="linea"></div>
                <div class="grupo">
                    <div class="input">
                        <input id="apellido" />
                        <label for="apellido">Apellido</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input">
                        <input id="nombre" />
                        <label for="nombre">Nombre</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select">
                        <select id="sexo" required>
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="1">Femenino</option>
                            <option value="2">Masculino</option>
                        </select>
                        <label for="sexo">Sexo</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input">
                        <input id="nacimiento" type="date" />
                        <label for="nacimiento">Fecha de nacimiento</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select">
                        <select id="documentoTipo" required>
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="1">DNI</option>
                            <option value="2">Cedula</option>
                        </select>
                        <label for="DocumentoTipo">Tipo de Documento</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input">
                        <input id="documentoNumero" type="number" />
                        <label for="documentoNumero">Numero de documento</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                </div>
                <div class="linea"></div>
                <div class="grupo">
                    <div class="select">
                        <select id="estadoCivil" required>
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="1">Casado</option>
                            <option value="2">Soltero</option>
                        </select>
                        <label for="estadoCivil">Estado civil</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select">
                        <select id="nacionalidad" required>
                            <option value="" disabled selected>Selecciona una opción</option>
                            ${this.nacionalidades.map((item) => {
                                return html` <option>${item.descripcion}</option> `;
                            })}
                        </select>
                        <label for="nacionalidad">Nacionalidad</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select">
                        <select id="discapacidad" required>
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="1">Si</option>
                            <option value="2">No</option>
                        </select>
                        <label for="discapacidad">Discapacidad</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                </div>
                <div class="grid column" style="padding-bottom:5rem">
                    <button flat @click="${this.atras}">CANCELAR</button>
                    <button raised @click="${this.siguiente}">SIGUIENTE</button>
                </div>
            </div>
        `;
    }

    atras() {
        store.dispatch(goHistoryPrev());
    }
    siguiente() {
        store.dispatch(goTo("afiliadoDireccion"));
    }

    /*verEstados() {
        if (store.getState().nacionalidades.entities) {
            this.nacionalidades = store.getState().nacionalidades.entities; //.Sort(); //ordenar
            return true;
        }

        if (store.getState().parentesco.entities) {
            this.parentescos = store.getState().parentesco.entities;
            //console.log(this.parentescos.descripcion);
            return true;
        }
        return false;
    }*/

    firstUpdated(changedProperties) {}

    stateChanged(state, name, e) {
        let hiddenAnterior = this.hidden;
        this.hidden = true;
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            const isCurrentScreen = ["afiliadoDatos"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                if (hiddenAnterior) {
                    store.dispatch(GetAfiliadosDatos());
                    store.dispatch(cambioOpcioRuta(OPCION_DATOS));
                }

                this.hidden = false;
            }
        }

        if (name == AFILIADO_DATOS_SUCCESS) {
            this.update();
        }

        if (name == PARENTESCO) {
            this.parentescos = state.parentesco.entities;
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

window.customElements.define("afiliado-datos-screen", afiliadoDatosScreen);
