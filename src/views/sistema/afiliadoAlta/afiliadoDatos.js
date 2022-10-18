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
import { get as GetAfiliadosDatos, actualizar as addAfiliadoDatos } from "../../../redux/afiliadoDatos/actions";
import { get as getDocumentacion } from "../../../redux/afiliadoDocumentacion/actions";

import { isEmpty, opcionInvalida, invalidDni, nameInvalido, invalidCUITCUIL, invalidFecha, opcionBooleanaInvalida } from "../../../libs/funciones";
import { goPrev } from "../../../redux/routing/actions";
import { getById } from "../../../redux/parentescos/actions";
import { get, getByAfiliadoId } from "../../../redux/afiliadoDomicilios/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const PARENTESCOS = "parentescos.timeStamp";
const PLANES = "planes.timeStamp";
const TIPO_DOCUMENTO = "tipoDocumento.timeStamp";
const ESTADOS_CIVILES = "estadosCiviles.timeStamp";
const NACIONALIDADES = "nacionalidades.timeStamp";
const AFILIADO_DATOS_SUCCESS = "afiliadoDatos.timeStamp";
const CURRENT_AFILIADO = "afiliadoDatos.currentTimeStamp";

export class afiliadoDatosScreen extends connect(
    store,
    SCREEN,
    MEDIA_CHANGE,
    AFILIADO_DATOS_SUCCESS,
    PARENTESCOS,
    PLANES,
    TIPO_DOCUMENTO,
    ESTADOS_CIVILES,
    NACIONALIDADES,
    CURRENT_AFILIADO
)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.area = "body";
        this.current = "";
        this.item = {};

        this.parentescos = null;
        this.planes = null;
        this.tipoDocumento = null;
        this.estadosCiviles = null;
        this.nacionalidades = null;
        this.readonly = false;

        this.svgs = { BENEF: BENEF, GRPFAM: GRPFAM };

        this.validaciones = {
            parentescoId: { invalid: false, isInvalid: isEmpty },
            cuil: { invalid: false, isInvalid: invalidCUITCUIL },
            planId: { invalid: false, isInvalid: opcionInvalida },
            apellido: { invalid: false, isInvalid: nameInvalido },
            nombre: { invalid: false, isInvalid: nameInvalido },
            sexo: { invalid: false, isInvalid: opcionInvalida },
            fechaNacimiento: { invalid: false, isInvalid: invalidFecha },
            tipoDocumentoId: { invalid: false, isInvalid: opcionInvalida },
            documento: { invalid: false, isInvalid: invalidDni },
            estadoCivilId: { invalid: false, isInvalid: opcionInvalida },
            nacionalidadId: { invalid: false, isInvalid: opcionInvalida },
            discapacitado: { invalid: false, isInvalid: opcionBooleanaInvalida },
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
                height: 1px;
                background-color: var(--on-formulario-separador);
                justify-self: stretch;
            }
        `;
    }

    render() {
        return html`
            <ruta-opcionescontrol></ruta-opcionescontrol>
            <div id="cuerpo" class="grid row">
                <div class="grupo">
                    <div class="select" ?error=${this.validaciones.parentescoId.invalid}>
                        <select ?disabled=${this.readOnly} id="parentescos" .value="${this.item.parentescoId}" required @blur="${this.enlace("parentescoId")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            ${this.parentescos?.map((item) => {
                                return html` <option value=${item.id} ?selected=${this.item.parentescoId == item.id}>${item.descripcion}</option> `;
                            })}
                        </select>
                        <label for="parentescos">Parentescos</label>
                        <label error>Debe seleccionar una opción</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input" ?error=${this.validaciones.cuil.invalid}>
                        <input id="cuil" ?disabled=${this.readOnly} .value=${this.item.cuil} @blur="${this.enlace("cuil")}" />
                        <label for="cuil">CUIL</label>
                        <label error>Debe ingresar numero de CUIL válido</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select" ?error=${this.validaciones.planId.invalid}>
                        <select id="planes" ?disabled=${this.readOnly} .value="${this.item.planId}" required @blur="${this.enlace("planId")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            ${this.planes?.map((item) => {
                                return html` <option value=${item.id} ?selected=${this.item.planId == item.id}>${item.descripcion}</option> `;
                            })}
                        </select>
                        <label for="planes">Planes</label>
                        <label error>Debe seleccionar una opción</label>
                        <label subtext>Requerido</label>
                    </div>
                </div>
                <div class="linea"></div>
                <div class="grupo">
                    <div class="input" ?error=${this.validaciones.apellido.invalid}>
                        <input id="apellido" ?disabled=${this.readOnly} .value=${this.item.apellido} @blur="${this.enlace("apellido")}" />
                        <label for="apellido">Apellido</label>
                        <label error>Debe ingresar apellido</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input" ?error=${this.validaciones.nombre.invalid}>
                        <input id="nombre" ?disabled=${this.readOnly} .value=${this.item.nombre} @blur="${this.enlace("nombre")}" />
                        <label for="nombre">Nombre</label>
                        <label error>Debe ingresar nombre</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select" ?error=${this.validaciones.sexo.invalid}>
                        <select id="sexo" ?disabled=${this.readOnly} .value="${this.item.sexo}" required @blur="${this.enlace("sexo")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="Femenino" ?selected=${this.item.sexo?.toUpperCase() == "FEMENINO"}>Femenino</option>
                            <option value="Masculino" ?selected=${this.item.sexo?.toUpperCase() == "MASCULINO"}>Masculino</option>
                        </select>
                        <label for="sexo">Sexo</label>
                        <label error>Debe seleccionar una opción</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input" ?error=${this.validaciones.fechaNacimiento.invalid}>
                        <input id="nacimiento" ?disabled=${this.readOnly} .value="${this.item.fechaNacimiento?.substr(0, 10)}" type="date" @blur="${this.enlace("fechaNacimiento")}" />
                        <label for="nacimiento">Fecha de nacimiento</label>
                        <label error>Debe ingresar una fecha válida</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select" ?error=${this.validaciones.tipoDocumentoId.invalid}>
                        <select id="tipoDocumento" ?disabled=${this.readOnly} .value="${this.item.tipoDocumentoId}" required @blur="${this.enlace("tipoDocumentoId")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            ${this.tipoDocumento?.map((item) => {
                                return html` <option value=${item.id}>${item.descripcion}</option> `;
                            })}
                        </select>
                        <label for="tipoDocumento">Tipo de Documento</label>
                        <label error>Debe seleccionar una opción</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input" ?error=${this.validaciones.documento.invalid}>
                        <input id="documento" ?disabled=${this.readOnly} .value=${this.item.documento} @blur="${this.enlace("documento")}" />
                        <label for="documento">Numero de documento</label>
                        <label error>Debe ingresar numero de DNI válido</label>
                        <label subtext>Requerido</label>
                    </div>
                </div>
                <div class="linea"></div>
                <div class="grupo">
                    <div class="select" ?error=${this.validaciones.estadoCivilId.invalid}>
                        <select id="estadosCiviles" ?disabled=${this.readOnly} .value="${this.item.estadoCivilId}" required @blur="${this.enlace("estadoCivilId")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            ${this.estadosCiviles?.map((item) => {
                                return html` <option value=${item.id}>${item.descripcion}</option> `;
                            })}
                        </select>
                        <label for="estadosCiviles">Estado civil</label>
                        <label error>Debe seleccionar una opción</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select" ?error=${this.validaciones.nacionalidadId.invalid}>
                        <select id="nacionalidades" ?disabled=${this.readOnly} .value="${this.item.nacionalidadId}" required @blur="${this.enlace("nacionalidadId")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            ${this.nacionalidades?.map((item) => {
                                return html` <option value=${item.id}>${item.descripcion}</option> `;
                            })}
                        </select>
                        <label for="nacionalidades">Nacionalidad</label>
                        <label error>Debe seleccionar una opción</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="select" ?error=${this.validaciones.discapacitado.invalid}>
                        <select id="discapacitado" ?disabled=${this.readOnly} .value="${this.item.discapacitado}" required @blur="${this.enlace("discapacitado")}">
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                        <label for="discapacitado">Discapacidad</label>
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
        /**
         * TODO: poner alert si irASiguiente == false
         * preguntar si no hay titular no enviar item SIN campo titularID,
         * si hay titular, enviar item CON titularID
         *   */
        if (this.isValidForm()) {
            store.dispatch(goTo("afiliadoDireccion"));

            const itemAfiliadoDatos = {
                //afiliadoId: store.getState().afiliadoDatos.current.id,
                apellido: this.item.apellido,
                nombre: this.item.nombre,
                tipoDocumentoId: this.item.tipoDocumentoId,
                documento: this.item.documento,
                parentescoId: this.item.parentescoId,
                cuil: this.item.cuil,
                fechaNacimiento: this.item.fechaNacimiento,
                fecha: new Date(),
                planId: this.item.planId,
                sexo: this.item.sexo,
                estadoCivilId: this.item.estadoCivilId,
                discapacitado: this.item.discapacitado,
                nacionalidadId: this.item.nacionalidadId,
                estadosAfiliacionId: "4863E7E8-B653-4433-A6C5-85585E114781",
            };

            /**
             * TODO: accion que traiga contacto y domicilio
             *
             */
            store.dispatch(addAfiliadoDatos(itemAfiliadoDatos));
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
        //this.update();
        return isValid;
    }

    forceValid() {
        Object.entries(this.validaciones).forEach(([field, value]) => {
            this.validaciones[field].invalid = false;
        });
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

        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.hidden = true;
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

        if (name == CURRENT_AFILIADO) {
            this.item = state.afiliadoDatos.current;
            if (
                this.item.estadosAfiliacionId == "4863e7e8-b653-4433-a6c5-85585e114781" ||
                this.item.estadosAfiliacionId == "F814DDF6-61AF-4466-9FC9-5912CD22C73D" ||
                this.item.estadosAfiliacionId == ""
            ) {
                this.readOnly = false;
            } else {
                this.readOnly = true;
            }

            if (this.item.id) {
                this.isValidForm();
            } else {
                this.forceValid();
            }
            this.update();
        }

        if (name == AFILIADO_DATOS_SUCCESS) {
            this.update();
        }

        if (name == PARENTESCOS) {
            //si esta vacio, solo titular
            //
            /*if(state.afiliados.grupoFamiliar == null){
			
		}else if(state.afiliados.grupoFamiliar.idParentesco == ""){

		}*/
            this.parentescos = state.parentescos.entities;
            this.update();
        }

        if (name == PLANES) {
            this.planes = state.planes.entities;
            this.update();
        }

        if (name == TIPO_DOCUMENTO) {
            this.tipoDocumento = state.tipoDocumento.entities;
            this.update();
        }

        if (name == ESTADOS_CIVILES) {
            this.estadosCiviles = state.estadosCiviles.entities;
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
            readOnly: {
                type: Boolean,
                reflect: true,
            },
        };
    }
}

window.customElements.define("afiliado-datos-screen", afiliadoDatosScreen);
