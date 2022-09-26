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
import { invalidCUITCUIL } from "../../../libs/funciones";


import { goHistoryPrev, goTo } from "@brunomon/template-lit/src/redux/routing/actions";



const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";


export class afiliadoPorCuil extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
        this.cuil = ""
	

    this.validaciones = {    
        cuil: { invalid: false, isInvalid: invalidCUITCUIL }
    }}
    

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
			<div id="titulo"><div>Ingrese CUIL del Titular</div></div>
			<div id="cuerpo" class="grid row">
            <div class="input" ?error=${this.validaciones.cuil.invalid}>
						<input id="cuil" .value=${this.cuil} @blur="${this.enlace("cuil")}" />
						<label for="cuil">CUIL</label>
						<label error>Debe ingresar numero de CUIL válido</label>
						<label subtext>Requerido</label>
					</div>
				<button raised @click="${this.siguiente}">BUSCAR</button>
			</div>
		`;
	}

	siguiente() {
		store.dispatch(goTo("main"));
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

	stateChanged(state, name) {
		if (name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
		}
		if (name == SCREEN) {
			this.hidden = true;
			const isCurrentScreen = ["afiliadoPorCuil"].includes(state.screen.name);
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

window.customElements.define("afiliado-porcuil", afiliadoPorCuil);