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
import { actualizar as actualizarDomicilio } from "../../../redux/afiliadoDomicilios/actions";
import { cambioOpcioRuta } from "../../../redux/ruta/actions";
import { setCurrent as setCurrentDomicilio } from "../../../redux/afiliadoDomicilios/actions";

import { isEmpty, opcionInvalida, onlyLetter, onlyNumber } from "../../../libs/funciones";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const RUTA = "ruta.timeStamp";

const PROVINCIAS = "provincias.timeStamp";
const LOCALIDADES = "localidades.timeStamp";
const CURRENT_AFILIADO = "afiliadoDomicilios.currentTimeStamp";
const AFILIADO_LOADED = "ui.afiliadoLoadedTimeStamp";
const AFILIADO_DIRECCION_MOSTRAR = "ui.afiliadoDireccionMostrarTimeStamp";
const AFILIADOS_ACCION = "afiliados.modoTimeStamp";
const AFILIADO_DIRECCION_ACTUALIZAR_SUCCESS = "afiliadoDomicilios.actualizarTimeStamp";
const AFILIADO_DIRECCION_ACTUALIZAR_ERROR = "afiliadoDomicilios.actualizarTimeStampError";

export class afiliadoDireccionScreen extends connect(
	store,
	CURRENT_AFILIADO,
	SCREEN,
	MEDIA_CHANGE,
	PROVINCIAS,
	LOCALIDADES,
	AFILIADO_DIRECCION_ACTUALIZAR_SUCCESS,
	AFILIADO_DIRECCION_ACTUALIZAR_ERROR,
	AFILIADO_LOADED,
	AFILIADO_DIRECCION_MOSTRAR,
	AFILIADOS_ACCION
)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.item = {};
		(this.provincias = null), (this.localidades = null), (this.svgs = { BENEF: BENEF, GRPFAM: GRPFAM });
		this.readonly = false;

		this.validaciones = {
			calle: { invalid: false, isInvalid: onlyLetter },
			altura: { invalid: false, isInvalid: onlyNumber },
			provincia: { invalid: false, isInvalid: opcionInvalida },
			localidadesId: { invalid: false, isInvalid: opcionInvalida },
			codigoPostal: { invalid: false, isInvalid: onlyNumber },
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
				width: 70vw;
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
						<label error>Debe ingresar calle</label>
						<label subtext>Requerido</label>
					</div>
					<div class="input" ?error=${this.validaciones.altura.invalid}>
						<input id="altura" .value=${this.item.altura} @blur="${this.enlace("altura")}" />
						<label for="altura">Altura</label>
						<label error>Debe ingresar altura</label>
						<label subtext>Requerido</label>
					</div>
					<div class="input">
						<input id="piso" .value=${this.item.piso} />
						<label for="piso">Piso</label>
						<label error>No puede ser vacio</label>
						<label subtext>opcional</label>
					</div>
					<div class="input">
						<input id="departamento" .value=${this.item.departamento} />
						<label for="departamento">Departamento</label>
						<label error></label>
						<label subtext>opcional</label>
					</div>
				</div>
				<div class="linea"></div>
				<div class="grupo">
					<div class="select" ?error=${this.validaciones.provincia.invalid}>
						<select id="provincias" required .value=${this.item.provincia} @blur="${this.enlace("provincia")}">
							<option value="" disabled selected>Selecciona una opción</option>
							${this.provincias?.map((item) => {
								return html` <option value=${item.id}>${item.descripcion}</option> `;
							})}
						</select>
						<label for="provincias">Provincia</label>
						<label error>Debe seleccionar una opción</label>
						<label subtext>Requerido</label>
					</div>
					<div class="select" ?error=${this.validaciones.localidadesId.invalid}>
						<select id="localidades" required .value=${this.item.localidadesId} @blur="${this.enlace("localidadesId")}">
							<option value="" disabled selected>Selecciona una opción</option>
							${this.localidades?.map((item) => {
								return html` <option value=${item.id}>${item.descripcion}</option> `;
							})}
						</select>
						<label for="localidades">Localidad</label>
						<label error>Debe seleccionar una opción</label>
						<label subtext>Requerido</label>
					</div>
				</div>
				<div class="linea"></div>
				<div class="grupo">
					<div class="input" ?error=${this.validaciones.codigoPostal.invalid}>
						<input id="codigoPostal" .value=${this.item.codigoPostal} @blur="${this.enlace("codigoPostal")}" />
						<label for="codigoPostal">Codigo postal</label>
						<label error>Debe ingresar Código postal</label>
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
		store.dispatch(goTo("afiliadoDatos"));
	}

	siguiente() {
		if (this.isValidForm()) {
			const itemAfiliadoDomicilios = {
				afiliadoId: store.getState().afiliadoDatos.currentId,
				calle: this.item.calle,
				altura: this.item.altura,
				piso: this.item.piso,
				departamento: this.item.departamento,
				localidadesId: this.item.localidadesId,
				codigoPostal: this.item.codigoPostal,
			};
			store.dispatch(actualizarDomicilio(itemAfiliadoDomicilios));
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

	stateChanged(state, name) {
		let hiddenAnterior = this.hidden;
		this.hidden = true;
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			const isCurrentScreen = ["afiliadoDireccion"].includes(state.screen.name);
			if (isInLayout(state, this.area) && isCurrentScreen) {
				if (hiddenAnterior) {
					store.dispatch(cambioOpcioRuta(OPCION_DOMICILIO));
					this.item = state.afiliadoDomicilios.current;
				}
				//this.hidden = false;
			}
		}

		if (name == AFILIADO_LOADED) {
			const isCurrentScreen = ["afiliadoDireccion"].includes(state.screen.name);
			if (isCurrentScreen) {
				this.hidden = false;
			}
		}
		if (name == AFILIADO_DIRECCION_MOSTRAR) {
			this.hidden = false;
		}

		if (name == PROVINCIAS) {
			this.provincias = state.provincias.entities;
			this.update();
		}

		if (name == LOCALIDADES) {
			this.localidades = state.localidades.entities;
			this.update();
		}

		if (name == CURRENT_AFILIADO) {
			this.item = state.afiliadoDomicilios.current;
			if (this.item.id) {
				this.isValidForm();
			} else {
				this.forceValid();
			}
			this.update();
		}

		if (name == AFILIADO_DIRECCION_ACTUALIZAR_SUCCESS) {
			store.dispatch(goTo("afiliadoContacto"));
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

window.customElements.define("afiliado-direccion-screen", afiliadoDireccionScreen);
