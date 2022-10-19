/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";

import { BENEF, GRPFAM } from "../../../../assets/icons/svgs.js";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { button } from "@brunomon/template-lit/src/views/css/button";

import { tarjetaFamilia } from "../../css/tarjetaFamilia";
import { tarjetaPersona } from "../../css/tarjetaPersona";
import { goTo } from "@brunomon/template-lit/src/redux/routing/actions";
import { getGrupoFamiliar, setCurrent as setCurrentDatos } from "../../../redux/afiliadoDatos/actions";
import { setCurrent as setCurrentDomicilio, getByAfiliadoId as getAfiliadoByIdDomicilio } from "../../../redux/afiliadoDomicilios/actions";
import { setCurrent as setCurrentContactos, getByAfiliadoId as getAfiliadoByIdContacto } from "../../../redux/afiliadoContactos/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const GRUPO_FAMILIAR = "afiliados.timeStamp";
const AUTORIZACION = "autorizacion.timeStamp";

export class afiliadoMostrarScreen extends connect(store, SCREEN, MEDIA_CHANGE, AUTORIZACION, GRUPO_FAMILIAR)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.grupoFamiliar = [];
		this.svgs = { BENEF: BENEF, GRPFAM: GRPFAM };

		//"https://app.uocra.org/credencialSindical/sinusuario.png"//
		this.items = [];
		/*{ id: 1, icono: "", parentesco: "Titular", imagen: "https://app.uocra.org/credencialSindical/28491226.jpg", nombre: "Juan Jose Ruiz", estado: "Afiliacion activa" },
            { id: 1, icono: "", parentesco: "Conyuge", imagen: "https://app.uocra.org/credencialSindical/sinusuario.png", nombre: "Josefa Ruiz", estado: "Afiliacion activa" },
            { id: 1, icono: "", parentesco: "Madre", imagen: "https://app.uocra.org/credencialSindical/17249982.jpg", nombre: "Antonia Maria", estado: "Afiliacion activa" },
            { id: 1, icono: "", parentesco: "Hijo", imagen: "https://app.uocra.org/credencialSindical/17221332.jpg", nombre: "Lucas Ruiz", estado: "Afiliacion activa" },*/

		//this.item = null;
	}

	static get styles() {
		return css`
			${gridLayout}
			${button}
			${tarjetaFamilia}
			${tarjetaPersona}
            :host {
				display: grid;
				position: relative;
				width: 100vw;
				grid-template-rows: 3rem 1fr;
				background-color: var(--aplicacion);
			}
			:host([hidden]) {
				display: none;
			}
			#subtitulo {
				display: grid;
				font-family: var(--font-header-h1-family);
				font-size: var(--font-header-h1-size);
				font-weight: 400;
				background-color: var(--secundario);
				color: var(--on-secundario);
			}
			#subtitulo div {
				margin: auto;
			}
			#cuerpo {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(12rem, 14rem));
				grid-gap: 1rem;
				padding: 1rem 0;
				overflow-y: auto;
				justify-content: center;
				justify-items: center;
				align-content: flex-start;
				background-color: var(--aplicacion);
			}
			div[invisible] {
				visibility: hidden;
			}
		`;
	}

	render() {
		if (!this.items) {
			return html`
				<div id="subtitulo"><div>Nueva solicitud de afiliacion</div></div>
				<div id="cuerpo">
					<div class="tarjeta-familia">
						<div titulo>
							<div help>${BENEF}</div>
							<div>Titular</div>
						</div>
						<div cuerpo>Dar de alta al titular del grupo familiar</div>
						<button raised @click="${this.nuevo}">AGREGAR</button>
					</div>
				</div>
			`;
		} else {
			return html`
				<div id="subtitulo"><div>Nueva solicitud de afiliacion</div></div>
				<div id="cuerpo">
					${this.items?.map((item) => {
						return html`<div class="tarjeta-persona">
							<div titulo>
								<div help ?invisible=${item.icono == ""} @click="${this.icono}">${this.svgs[item.icono]}</div>
								<div>${item.parentescoNombre}</div>
							</div>
							<div cuerpo><img src="" /></div>
							<div nombre>${item.apellido}, ${item.nombre}</div>
							<div estado>${item.estadosAfiliacionNombre}</div>
							<button raised @click="${this.mostrar}" .item=${item}>VER</button>
						</div> `;
					})}
					<div class="tarjeta-familia">
						<div titulo>
							<div help>${GRPFAM}</div>
							<div>Grupo Familiar</div>
						</div>
						<div cuerpo>Dar de alta un nuevo integante del grupo familiar</div>
						<button raised @click="${this.nuevo}">AGREGAR</button>
					</div>
				</div>
			`;
		}
	}

	nuevo() {
		store.dispatch(
			setCurrentDatos({
				parentescoId: "",
				cuil: "",
				planId: "",
				apellido: "",
				nombre: "",
				sexo: "",
				fechaNacimiento: "",
				tipoDocumentoId: "",
				documento: "",
				estadoCivilId: "",
				nacionalidadId: "",
				discapacitado: "",
				estadosAfiliacionId: "4863e7e8-b653-4433-a6c5-85585e114781",
			})
		);

		store.dispatch(
			setCurrentDomicilio({
				afiliadoId: "",
				calle: "",
				altura: "",
				piso: "",
				departamento: "",
				provincia: "",
				localidad: "",
				codigoPostal: "",
			})
		);

		store.dispatch(
			setCurrentContactos({
				afiliadosId: "",
				celular: "",
				particular: "",
				laboral: "",
				mail: "",
				mail2: "",
			})
		);

		store.dispatch(goTo("afiliadoDatos"));
	}

	mostrar(e) {
		store.dispatch(setCurrentDatos(e.currentTarget.item));
		store.dispatch(getAfiliadoByIdDomicilio(e.currentTarget.item.id));
		store.dispatch(getAfiliadoByIdContacto(e.currentTarget.item.id));

		store.dispatch(goTo("afiliadoDatos"));
	}

	firstUpdated(changedProperties) {}

	stateChanged(state, name) {
		if (name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
		}

		if (name == SCREEN) {
			this.hidden = true;
			const isCurrentScreen = ["afiliadoMostrar"].includes(state.screen.name);
			if (isInLayout(state, this.area) && isCurrentScreen) {
				this.hidden = false;
			}
		}

		if (name == GRUPO_FAMILIAR) {
			this.items = state.afiliados.grupoFamiliar.map((item) => {
				item.imagen = "https://app.uocra.org/credencialSindical/" + item.documento + ".jpg";
				item.icono = "";
				return item;
			});
			this.update();
		}

		if (name == AUTORIZACION && false) {
			if (
				//state.autorizacion.entities.titulares != undefined &&
				state.autorizacion.entities.titulares.length == 0
			) {
				this.items = null;
				this.update();
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

window.customElements.define("afiliado-mostrar-screen", afiliadoMostrarScreen);
