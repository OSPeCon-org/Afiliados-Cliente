/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";

import { UPLOAD, SETTINGS, OK, CANCEL, HELP } from "../../../../assets/icons/svgs.js";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";

import { RutaOpcionesControl } from "../../componentes/rutaOpciones";
import { goHistoryPrev, goTo } from "@brunomon/template-lit/src/redux/routing/actions";

import manoOk from "../../../../assets/image/manoOk.png";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class afiliadoAltaFinScreen extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
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
			${input}
			${select}
            :host {
				display: grid;
				position: relative;
				width: 100vw;
				grid-template-rows: auto auto 1fr;
				justify-items: center;
				background-color: var(--aplicacion);
			}
			:host([hidden]) {
				display: none;
			}

			ruta-opcionescontrol {
				width: 100vw;
			}
			#titulo {
				display: grid;
				height: 2.4rem;
				width: 100vw;
				font-family: var(--font-header-h1-family);
				font-size: var(--font-header-h1-size);
				font-weight: 400;
				background-color: var(--terciario);
				color: var(--on-terciario);
			}
			#titulo div {
				margin: auto;
			}
			#cuerpo {
				background-color: var(--aplicacion);
			}
		`;
	}

	render() {
		return html`
			<ruta-opcionescontrol></ruta-opcionescontrol>
			<div id="titulo"><div>La registracion a finalizado</div></div>
			<div id="cuerpo" class="grid row">
				<img src="${manoOk}" />
				<button raised @click="${this.siguiente}">VOLVER</button>
			</div>
		`;
	}

	siguiente() {
		store.dispatch(goTo("main"));
	}
	firstUpdated(changedProperties) {}

	stateChanged(state, name) {
		if (name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
		}
		if (name == SCREEN) {
			this.hidden = true;
			const isCurrentScreen = ["afiliadoAltaFin"].includes(state.screen.name);
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

window.customElements.define("afiliado-alta-fin-screen", afiliadoAltaFinScreen);
