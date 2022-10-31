/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../redux/store";
import { connect } from "@brunomon/helpers";

import { BENEF, GRPFAM, ADD, MODIF, VER } from "../../assets/icons/svgs.js";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { isInLayout } from "../redux/screens/screenLayouts";
import { button } from "@brunomon/template-lit/src/views/css/button";

import { SubirDocumentoControl } from "./componentes/subirDocumento";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class mainScreen extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
	}

	static get styles() {
		return css`
			${gridLayout}
			${button}
            :host {
				display: grid;
				grid-template-rows: auto 1fr;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	render() {
		return html`
			<!-- <button link @click="${this.bo}">
				<div>subir</div>
			</button>
			<subir-documento-control
				id="subir"
				titulo="Subir documento"
				botonPc="DESDE MI PC"
				botonCamara="DE MI CAMARA"
				botonVolver="VOLVER"
				onCamara=${this.subirDocumentoCamera}
			></subir-documento-control> -->
		`;
	}

	subir() {
		this.shadowRoot.querySelector("#foto").hidden = false;
	}
	bo() {
		this.shadowRoot.querySelector("#subir").hidden = false;
	}
	subirDocumentoCamera() {
		let foto = this.shadowRoot.querySelector("#foto");
		//foto.iddetalle = e.currentTarget.iddetalle;
		foto.hidden = false;
		this.volver();
	}

	firstUpdated(changedProperties) {}

	stateChanged(state, name) {
		if (name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
		}
		if (name == SCREEN) {
			this.hidden = true;
			const isCurrentScreen = ["main"].includes(state.screen.name);
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

window.customElements.define("main-screen", mainScreen);
