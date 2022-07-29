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
import { get as GetAfiliadosDatos } from "../../../redux/afiliadoDatos/actions";

import { isEmpty, cuilInvalido, opcionInvalida, dniInvalido } from "../../../libs/funciones";
import { ThumbUpSharp } from "@material-ui/icons";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

const PARENTESCO = "parentesco.timeStamp";
const PLAN = "plan.timeStamp";
const TIPO_DOCUMENTO = "tipoDocumento.timeStamp";
const ESTADOS_CIVILES = "estadosCiviles.timeStamp";
const NACIONALIDADES = "nacionalidades.timeStamp";

const AFILIADO_DATOS_SUCCESS = "afiliadoDatos.timeStamp";

export class afiliadoDatosScreen extends connect(store, SCREEN, MEDIA_CHANGE, AFILIADO_DATOS_SUCCESS, PARENTESCO, PLAN, TIPO_DOCUMENTO, ESTADOS_CIVILES, NACIONALIDADES)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.area = "body";
        this.current = "";
        this.item = {};

        this.parentescos = null;
        this.planes = null;
        this.tipoDocumento = null;
        this.estadoCivil = null;
        this.nacionalidades = null;

        this.svgs = { BENEF: BENEF, GRPFAM: GRPFAM };
        this.validaciones = {
            parentesco: { invalid: false, isInvalid: isEmpty },
            cuil: { invalid: false, isInvalid: cuilInvalido },
            plan: { invalid: false, isInvalid: isEmpty },
            apellido: { invalid: false, isInvalid: isEmpty },
            nombre: { invalid: false, isInvalid: isEmpty },
            sexo: { invalid: false, isInvalid: opcionInvalida },
            documentoTipo: { invalid: false, isInvalid: opcionInvalida },
            documentoNumero: { invalid: false, isInvalid: dniInvalido },
            estadoCivil: { invalid: false, isInvalid: opcionInvalida },
            nacionalidad: { invalid: false, isInvalid: opcionInvalida },
            discapacidad: { invalid: false, isInvalid: opcionInvalida },
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
                    <div class="select" ?error=${this.validaciones.parentesco.invalid}>
                        <select id="parentesco" required .value=${this.item.parentesco} @blur="${this.enlace("parentesco")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            ${this.parentescos?.map((item) => {
                                return html` <option value=${item.id}>${item.descripcion}</option> `;
                            })}
                        </select>
                        <label for="parentesco">Parentesco</label>
                        <label error>Debe seleccionar una opción</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input" ?error=${this.validaciones.cuil.invalid}>
                        <input id="cuil" .value=${this.item.cuil} @blur="${this.enlace("cuil")}" />
                        <label for="cuil">CUIL</label>
                        <label error>El cuil es inválido</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select" ?error=${this.validaciones.plan.invalid}>
                        <select id="plan" required .value=${this.item.plan} @blur="${this.enlace("plan")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            ${this.planes?.map((item) => {
                                return html` <option>${item.descripcion}</option> `;
                            })}
                        </select>
                        <label for="plan">Plan</label>
                        <label error>Debe seleccionar una opción</label>
                        <label subtext>Requerido</label>
                    </div>
                </div>
                <div class="linea"></div>
                <div class="grupo">
                    <div class="input" ?error=${this.validaciones.apellido.invalid}>
                        <input id="apellido" .value=${this.item.apellido} @blur="${this.enlace("apellido")}" />
                        <label for="apellido">Apellido</label>
                        <label error>Debe ingresar apellido</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input" ?error=${this.validaciones.nombre.invalid}>
                        <input id="nombre" .value=${this.item.nombre} @blur="${this.enlace("nombre")}" />
                        <label for="nombre">Nombre</label>
                        <label error>Debe ingresar nombre</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select" required ?error=${this.validaciones.sexo.invalid}>
                        <select id="sexo" .value=${this.item.sexo} @blur="${this.enlace("sexo")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="1">Femenino</option>
                            <option value="2">Masculino</option>
                        </select>
                        <label for="sexo">Sexo</label>
                        <label error>Debe seleccionar una opción</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input">
                        <input id="nacimiento" type="date" />
                        <label for="nacimiento">Fecha de nacimiento</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select" ?error=${this.validaciones.documentoTipo.invalid}>
                        <select id="documentoTipo" required .value=${this.item.documentoTipo} @blur="${this.enlace("documentoTipo")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="1">DNI</option>
                            <option value="2">Cedula</option>
                        </select>
                        <label for="DocumentoTipo">Tipo de Documento</label>
                        <label error>Debe seleccionar una opción</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input" ?error=${this.validaciones.documentoNumero.invalid}>
                        <input id="documentoNumero" .value=${this.item.documentoNumero} @blur="${this.enlace("documentoNumero")}" />
                        <label for="documentoNumero">Numero de documento</label>
                        <label error>Debe ingresar numero de DNI</label>
                        <label subtext>Requerido</label>
                    </div>
                </div>
                <div class="linea"></div>
                <div class="grupo">
                    <div class="select" ?error=${this.validaciones.estadoCivil.invalid}>
                        <select id="estadoCivil" required .value=${this.item.estadosCiviles} @blur="${this.enlace("estadoCivil")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="1">Casado</option>
                            <option value="2">Soltero</option>
                        </select>
                        <label for="estadoCivil">Estado civil</label>
                        <label error>Debe seleccionar una opción</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select" ?error=${this.validaciones.nacionalidad.invalid}>
                        <select id="nacionalidad" required .value=${this.item.nacionalidad} @blur="${this.enlace("nacionalidad")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            ${this.nacionalidades?.map((item) => {
                                return html` <option>${item.descripcion}</option> `;
                            })}
                        </select>
                        <label for="nacionalidad">Nacionalidad</label>
                        <label error>Debe seleccionar una opción</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select" ?error=${this.validaciones.discapacidad.invalid}>
                        <select id="discapacidad" required .value=${this.item.discapacidad} @blur="${this.enlace("discapacidad")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="1">Si</option>
                            <option value="2">No</option>
                        </select>
                        <label for="discapacidad">Discapacidad</label>
                        <label error>Debe seleccionar una opción</label>
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
        /**TODO: poner alert si irASiguiente == false  */
        if (this.isValidForm()) {
            store.dispatch(goTo("afiliadoDireccion"));
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

                /**TODO: llenar este item en el stateChange */
                this.item = {
                    parentesco: "",
                    cuil: "",
                    plan: "",
                    apellido: "",
                    nombre: "",
                    sexo: 0,
                    nacimiento: "",
                    documentoTipo: 0,
                    documentoNumero: "",
                    estadoCivil: 0,
                    nacionalidad: 0,
                    dicapacidad: 0,
                };
            }
        }

        if (name == AFILIADO_DATOS_SUCCESS) {
            this.update();
        }

        if (name == PARENTESCO) {
            this.parentescos = state.parentesco.entities;
            this.update();
        }

        if (name == PLAN) {
            this.planes = state.parentesco.entities;
            this.update();
        }

        if (name == TIPO_DOCUMENTO) {
            this.tipoDocumento = state.parentesco.entities;
            this.update();
        }

        if (name == ESTADOS_CIVILES) {
            this.estadoCivil = state.parentesco.entities;
            this.update();
        }

        if (name == NACIONALIDADES) {
            this.nacionalidades = state.nacionalidades.entities;
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
