/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";

import { BENEF, GRPFAM, ADD, MODIF, VER } from "../../../assets/icons/svgs.js";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { tarjetaFamilia } from "../css/tarjetaFamilia";
import { tarjetaPersona } from "../css/tarjetaPersona";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class pruebaDaniel extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
	constructor() {
		super();
		this.items = [
			{ icono: "BENEF", parentesco: "Titular", leyenda: "Dar de alta al titular del grupo familiar", boton: "AGREGAR" },
			{ icono: "GRPFAM", parentesco: "Grupo Familiar", leyenda: "Dar de alta un nuevo integante del grupo familiar", boton: "AGREGAR" },
		];
		this.items1 = [
			{ icono: "VER", parentesco: "Titular", imagen: "", nombre: "Jose Perez", estado: "Afiliacion activa" },
			{ icono: "MODIF", parentesco: "Conyuje", imagen: "", nombre: "Juan Jose Ruiz", estado: "Afiliacion activa" },
			{ icono: "", parentesco: "Hijo", imagen: "", nombre: "Juan Jose Ruiz", estado: "Afiliacion activa" },
		];

		this.area = "body";
		this.svgs = { VER: VER, BENEF: BENEF, GRPFAM: GRPFAM, ADD: ADD, MODIF: MODIF };
	}

	static get styles() {
		return css`
			${gridLayout}
			${tarjetaFamilia}
			${tarjetaPersona}
            ${button}
            :host {
				display: grid;
				grid-template-rows: auto 1fr;
			}
			.grilla {
				overflow-y: auto;
			}
		`;
	}

	render() {
		return html`
			<div class="grid row grilla itemsCenter" style="grid-gap:2rem">
				${this.items.map((item) => {
					return html`
						<div class="tarjeta-familia">
							<div titulo>
								<div help>${this.svgs[item.icono]}</div>
								<div>${item.parentesco}</div>
							</div>
							<div cuerpo>${item.leyenda}</div>
							<button raised>${item.boton}</button>
						</div>
					`;
				})}
				${this.items1.map((item) => {
					return html`
						<div class="tarjeta-persona">
							<div titulo>
								<div help style="visibility:${item.icono == "" ? "hidden" : "visible"};" @click="${this.icono}">${this.svgs[item.icono]}</div>
								<div>${item.parentesco}</div>
							</div>
							<div cuerpo><img src="https://app.uocra.org/credencialSindical/sinusuario.png" /></div>
							<div nombre>${item.nombre}</div>
							<div estado>${item.estado}</div>
						</div>
					`;
				})}
			</div>
		`;
	}

	firstUpdated(changedProperties) {}

	stateChanged(state, name) {
		if (name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
		}
		if (name == SCREEN) {
			this.hidden = true;
			const isCurrentScreen = ["pruebaTarjetaFamilia"].includes(state.screen.name);
			if (isInLayout(state, this.area) && isCurrentScreen) {
				this.hidden = false;
			}
		}
	}
	icono() {
		alert("Hola");
	}
	static get properties() {
		return {
			mediaSize: {
				type: String,
				reflect: true,
				attribute: "media-size",
			},
			icono: {
				type: String,
				reflect: true,
			},
		};
	}
}

window.customElements.define("prueba-daniel", pruebaDaniel);
