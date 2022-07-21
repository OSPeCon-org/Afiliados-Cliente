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

import { RutaOpcionesControl } from "../../componentes/rutaOpciones";
import { goHistoryPrev, goTo } from "@brunomon/template-lit/src/redux/routing/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class afiliadoDatosScreen extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
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
					<div class="select">
						<select id="parentesco" required>
							<option value="" disabled selected>Selecciona una opción</option>
							<option value="1">Titular</option>
							<option value="2">Conyuge</option>
							<option value="3">Hija</option>
							<option value="4">Madre</option>
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
							<option value="1">Obligatorio</option>
							<option value="2">Monotributisca</option>
							<option value="3">Domestica</option>
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
							<option value="1">Argentino</option>
							<option value="2">Extranjero</option>
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
	firstUpdated(changedProperties) {}

	stateChanged(state, name) {
		if (name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
		}
		if (name == SCREEN) {
			this.hidden = true;
			const isCurrentScreen = ["afiliadoDatos"].includes(state.screen.name);
			if (isInLayout(state, this.area) && isCurrentScreen) {
				this.hidden = false;
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

window.customElements.define("afiliado-datos-screen", afiliadoDatosScreen);
