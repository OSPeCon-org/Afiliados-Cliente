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

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class afiliadoMostrarScreen extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.svgs = { BENEF: BENEF, GRPFAM: GRPFAM };

		//"https://app.uocra.org/credencialSindical/sinusuario.png"
		this.item = [
			{ id: 1, icono: "", parentesco: "Titular", imagen: "https://app.uocra.org/credencialSindical/28491226.jpg", nombre: "Juan Jose Ruiz", estado: "Afiliacion activa" },
			{ id: 1, icono: "", parentesco: "Conyuge", imagen: "https://app.uocra.org/credencialSindical/sinusuario.png", nombre: "Josefa Ruiz", estado: "Afiliacion activa" },
			{ id: 1, icono: "", parentesco: "Madre", imagen: "https://app.uocra.org/credencialSindical/17249982.jpg", nombre: "Antonia Maria", estado: "Afiliacion activa" },
			{ id: 1, icono: "", parentesco: "Hijo", imagen: "https://app.uocra.org/credencialSindical/17221332.jpg", nombre: "Lucas Ruiz", estado: "Afiliacion activa" },
		];
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
				overflow-y: auto;
				align-items: flex-start;
			}
			:host([hidden]) {
				display: none;
			}
			#cuerpo {
				overflow-y: auto;
				padding-top: 1rem;
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(12rem, 14rem));
				grid-gap: 1rem;
				justify-content: center;
				justify-items: center;
			}
		`;
	}

	render() {
		if (!this.item) {
			return html`
				<div id="cuerpo">
					<div class="tarjeta-familia">
						<div titulo>
							<div help>${BENEF}</div>
							<div>Titular</div>
						</div>
						<div cuerpo>Dar de alta al titular del grupo familiar</div>
						<button raised>AGREGAR</button>
					</div>
				</div>
			`;
		} else {
			return html`
				<div id="cuerpo">
					${this.item.map((item, index) => {
						return html` <div class="tarjeta-persona">
							<div titulo>
								<div help style="visibility:${item.icono == "" ? "hidden" : "visible"};" @click="${this.icono}">${this.svgs[item.icono]}</div>
								<div>${item.parentesco}</div>
							</div>
							<div cuerpo><img src="${item.imagen}" /></div>
							<div nombre>${item.nombre}</div>
							<div estado>${item.estado}</div>
						</div>`;
					})}
					<div class="tarjeta-familia">
						<div titulo>
							<div help>${GRPFAM}</div>
							<div>Grupo Familiar</div>
						</div>
						<div cuerpo>Dar de alta un nuevo integante del grupo familiar</div>
						<button raised>AGREGAR</button>
					</div>
				</div>
			`;
		}
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
