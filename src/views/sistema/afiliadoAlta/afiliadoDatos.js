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
import { get as GetAfiliadosDatos, add as addAfiliadoDatos } from "../../../redux/afiliadoDatos/actions";
import { get as getDocumentacion } from "../../../redux/afiliadoDocumentacion/actions";

import { isEmpty, opcionInvalida, invalidDni, nameInvalido, invalidCUITCUIL,invalidFecha } from "../../../libs/funciones";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const PARENTESCOS = "parentescos.timeStamp";
const PLANES = "planes.timeStamp";
const TIPO_DOCUMENTO = "tipoDocumento.timeStamp";
const ESTADOS_CIVILES = "estadosCiviles.timeStamp";
const NACIONALIDADES = "nacionalidades.timeStamp";
const AFILIADO_DATOS_SUCCESS = "afiliadoDatos.timeStamp";


export class afiliadoDatosScreen extends connect(store, SCREEN, MEDIA_CHANGE, AFILIADO_DATOS_SUCCESS, PARENTESCOS, PLANES, TIPO_DOCUMENTO, ESTADOS_CIVILES, NACIONALIDADES)(LitElement) {
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

		this.svgs = { BENEF: BENEF, GRPFAM: GRPFAM };

		this.validaciones = {
			parentesco: { invalid: false, isInvalid: isEmpty },
			cuil: { invalid: false, isInvalid: invalidCUITCUIL },
			plan: { invalid: false, isInvalid: opcionInvalida },
			apellido: { invalid: false, isInvalid: nameInvalido },
			nombre: { invalid: false, isInvalid: nameInvalido },
			sexo: { invalid: false, isInvalid: opcionInvalida },
			nacimiento: { invalid: false, isInvalid: invalidFecha},
			tipoDocumento: { invalid: false, isInvalid: opcionInvalida },
			documentoNumero: { invalid: false, isInvalid: invalidDni },
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
					<div class="select" ?error=${this.validaciones.parentesco.invalid}>
						<select id="parentescos" .value="${this.item.parentesco}" required @blur="${this.enlace("parentesco")}">
							<option value="" disabled selected>Selecciona una opción</option>
							${this.parentescos?.map((item) => {
								return html` <option value=${item.id}>${item.descripcion}</option> `;
							})}
						</select>
						<label for="parentescos">Parentescos</label>
						<label error>Debe seleccionar una opción</label>
						<label subtext>Requerido</label>
					</div>
					<div class="input" ?error=${this.validaciones.cuil.invalid}>
						<input id="cuil" .value=${this.item.cuil} @blur="${this.enlace("cuil")}" />
						<label for="cuil">CUIL</label>
						<label error>El cuil es inválido. No ingresar guiones</label>
						<label subtext>Requerido</label>
					</div>
					<div class="select" ?error=${this.validaciones.plan.invalid}>
						<select id="planes" .value="${this.item.plan}" required @blur="${this.enlace("plan")}">
							<option value="" disabled selected>Selecciona una opción</option>
							${this.planes?.map((item) => {
								return html` <option value=${item.id}>${item.descripcion}</option> `;
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
					<div class="select" ?error=${this.validaciones.sexo.invalid}>
						<select id="sexo" .value="${this.item.sexo}" required @blur="${this.enlace("sexo")}">
							<option value="" disabled selected>Selecciona una opción</option>
							<option value="Femenino">Femenino</option>
							<option value="Masculino">Masculino</option>
						</select>
						<label for="sexo">Sexo</label>
						<label error>Debe seleccionar una opción</label>
						<label subtext>Requerido</label>
					</div>
					<div class="input" ?error=${this.validaciones.nacimiento.invalid}>
						<input id="nacimiento" value="${this.item.nacimiento}" type="date" @blur="${this.enlace("nacimiento")}"/>
						<label for="nacimiento">Fecha de nacimiento</label>
						<label error>Debe ingresar un fecha válida</label>
						<label subtext>Requerido</label>
					</div>
					<div class="select" ?error=${this.validaciones.tipoDocumento.invalid}>
						<select id="tipoDocumento" .value="${this.item.tipoDocumento}" required @blur="${this.enlace("tipoDocumento")}">
							<option value="" disabled selected>Selecciona una opción</option>
							${this.tipoDocumento?.map((item) => {
								return html` <option value=${item.id}>${item.descripcion}</option> `;
							})}
						</select>
						<label for="tipoDocumento">Tipo de Documento</label>
						<label error>Debe seleccionar una opción</label>
						<label subtext>Requerido</label>
					</div>
					<div class="input" ?error=${this.validaciones.documentoNumero.invalid}>
						<input id="documentoNumero" .value=${this.item.documentoNumero} @blur="${this.enlace("documentoNumero")}" />
						<label for="documentoNumero">Numero de documento</label>
						<label error>Debe ingresar numero de DNI válido</label>
						<label subtext>Requerido</label>
					</div>
				</div>
				<div class="linea"></div>
				<div class="grupo">
					<div class="select" ?error=${this.validaciones.estadoCivil.invalid}>
						<select id="estadosCiviles" .value="${this.item.estadoCivil}" required @blur="${this.enlace("estadoCivil")}">
							<option value="" disabled selected>Selecciona una opción</option>
							${this.estadosCiviles?.map((item) => {
								return html` <option value=${item.id}>${item.descripcion}</option> `;
							})}
						</select>
						<label for="estadosCiviles">Estado civil</label>
						<label error>Debe seleccionar una opción</label>
						<label subtext>Requerido</label>
					</div>
					<div class="select" ?error=${this.validaciones.nacionalidad.invalid}>
						<select id="nacionalidades" .value="${this.item.nacionalidad}" required @blur="${this.enlace("nacionalidad")}">
							<option value="" disabled selected>Selecciona una opción</option>
							${this.nacionalidades?.map((item) => {
								return html` <option value=${item.id}>${item.descripcion}</option> `;
							})}
						</select>
						<label for="nacionalidades">Nacionalidad</label>
						<label error>Debe seleccionar una opción</label>
						<label subtext>Requerido</label>
					</div>
					<div class="select" ?error=${this.validaciones.discapacidad.invalid}>
						<select id="discapacidad" .value="${this.item.discapacidad}" required @blur="${this.enlace("discapacidad")}">
							<option value="" disabled selected>Selecciona una opción</option>
							<option value="true">Si</option>
							<option value="false">No</option>
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
			
			const itemAfiliadoDatos = {
				apellido: this.item.apellido,
  				nombre: this.item.nombre,
  				tipoDocumentoId: this.item.tipoDocumento,
  				documento: this.item.documentoNumero,
  				parentescoId: this.item.parentesco,
  				cuil: this.item.cuil,
  				fechaNacimiento: this.item.nacimiento,
  				fecha: new Date(),
  				planId: this.item.plan,
  				sexo: this.item.sexo,
  				estadoCivilId: this.item.estadoCivil,
  				discapacitado: this.item.discapacidad,
  				nacionalidadId: this.item.nacionalidad,
  				estadosAfiliacionId: "76151413-1847-4688-88F1-007356683E40"
			}

			
			//store.dispatch(addAfiliadoDatos(itemAfiliadoDatos));
			//store.dispatch(getDocumentacion(this.item.plan, this.item.parentesco, this.item.discapacidad));
			store.dispatch(getDocumentacion("108f11fb-9952-4fe0-a26f-f8ee4e2e9b8e", "e4389c83-310c-4399-b5fa-9ab06a00eb23", false));


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

				/**TODO: llenar este item en el stateChange */
				this.item = {
					parentesco: "",
					cuil: "",
					plan: "",
					apellido: "",
					nombre: "",
					sexo: "",
					nacimiento: "",
					tipoDocumento: "",
					documentoNumero: "",
					estadoCivil: "",
					nacionalidad: "",
					discapacidad: "",
				};
			}
		}

		if (name == AFILIADO_DATOS_SUCCESS) {
			this.update();
		}

		if (name == PARENTESCOS) {
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
		};
	}
}

window.customElements.define("afiliado-datos-screen", afiliadoDatosScreen);
