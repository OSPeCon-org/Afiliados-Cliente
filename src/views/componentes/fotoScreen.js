/** @format */

import { html, LitElement, css } from "lit";

import { CANCEL, SAVE, CAMERA } from "../../../assets/icons/svgs";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo, goHistoryPrev } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
//import { showWarning, showMsgBox } from "../../redux/ui/actions";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";

import { add as addDocumentacion } from "../../redux/afiliadoDocumentacion/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const ACEPTAR_MSGBOX = "ui.msgbox.aceptarTimeStamp";

export class fotoScreen extends connect(store, ACEPTAR_MSGBOX, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.current = "";
		this.mediaSize = "";
		this.stream = null;
		this.fotonombre = "";
		this.foto = "";
		this.constraints = {
			audio: false,
			video: {
				width: 300,
				height: 300,
				aspectRatio: 1,
				facingMode: "environment",
			},
		};
	}

	static get styles() {
		return css`
			${gridLayout}
			:host {
				display: grid;
				position: fixed;
				top: 0;
				left: 0;
				padding: 0 !important;
				height: 100vh;
				width: 100vw;
				background-color: rgba(0, 0, 0, 0.5);
				z-index: 999;
			}
			:host([hidden]) {
				display: none;
			}
			:host([media-size="large"]) {
				/*height: 86vh;*/
			}
			#cuerpo {
				display: grid;
				background-color: black;
				place-self: center;
				border-radius: 0.5rem;
				overflow-y: auto;
				padding: 0.5rem;
			}
			#div_foto,
			#div_guardar {
				position: relative;
				grid-template-rows: repeat(3, auto);
				display: grid;
				width: min-content;
				height: min-content;
				grid-gap: 0.5rem;
			}
			svg {
				height: 2rem;
				width: 2rem;
				fill: white;
			}
			*[hidden] {
				display: none !important;
			}
			#titulo_sacar,
			#titulo_guardar {
				font-size: 1.2rem;
				font-weight: 400;
				color: var(--on-primario);
				text-align: center;
			}
			#click-close {
				position: absolute;
				top: -0.2rem;
				right: 0rem;
				font-size: 0.8rem;
				color: white;
				cursor: pointer;
			}
			#click-photo {
				display: grid;
				justify-self: center;
				background-color: white;
				border-radius: 50%;
				height: 2.2rem;
				width: 2.2rem;
				cursor: pointer;
			}
			#click-save {
				display: grid;
				cursor: pointer;
				width: fit-content;
			}
		`;
	}
	get _video() {
		return this.shadowRoot.querySelector("#video");
	}
	get _canvas() {
		return this.shadowRoot.querySelector("#canvas");
	}

	willUpdate(changedProperties) {
		if (changedProperties.has("hidden")) {
			if (!this.hidden) {
				this.camaraStar();
				this.foto = "";
			}
		}
	}
	render() {
		return html`
			<div id="cuerpo">
				<div id="div_foto">
					<div id="titulo_sacar">Sacar foto</div>
					<div id="click-close" @click="${this.volver}">X</div>
					<video id="video" width="400" height="400" autoplay muted playsinline style="border-radius: 1rem;"></video>
					<div id="click-photo" @click="${this.camaraFoto}"></div>
				</div>
				<div id="div_guardar" ?hidden=${this.foto.length == 0}>
					<div id="titulo_guardar">Guardar foto</div>
					<div id="click-close" @click="${this.cerrar}">X</div>
					<canvas id="canvas" width="400" height="400" style="border-radius: 1rem;"></canvas>
					<div id="click-save" @click="${this.grabar}">${SAVE}</div>
				</div>
			</div>
		`;
	}
	grabar() {
		//store.dispatch(showMsgBox("GUARDAR", "Seguro de guardar la <b>foto?.</b>"));
		let imagen = {
			fotonombre: this.fotonombre,
			Foto: this.foto,
		};
		//store.dispatch(addDetalleImagenes(imagen, null));
		this.shadowRoot.querySelector("#div_foto").hidden = false;
		this.foto = "";
		this.update();
	}

	cerrar() {
		this.foto = "";
		this.shadowRoot.querySelector("#div_foto").hidden = false;
		this.update();
	}

	camaraStar() {
		navigator.mediaDevices
			.getUserMedia(this.constraints)
			.then((stream) => {
				this.stream = stream;
				this._video.srcObject = stream;
			})
			.catch((err) => {
				console.error("Oops. Something is broken.", err);
			});
	}

	volver() {
		this.stream.getTracks().forEach(function (track) {
			track.stop();
		});
		this.hidden = true;
	}

	camaraFoto() {
		this._canvas.getContext("2d").drawImage(this._video, 0, 0, this._canvas.width, this._canvas.height);
		let image_data_url = this._canvas.toDataURL("image/jpeg");
		this.foto = image_data_url;
		console.log(image_data_url);
		if (this.foto.length > 0) {
			this.shadowRoot.querySelector("#div_foto").hidden = true;
		}
		this.update();
	}
	stateChanged(state, name) {
		if (name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.current = state.screen.name;
		}
		if (name == SCREEN) {
			//this.hidden = true;
			const isCurrentScreen = ["fotoScreen"].includes(state.screen.name);
			if (isInLayout(state, this.area) && isCurrentScreen) this.hidden = false;
		}
		if (name == ACEPTAR_MSGBOX && state.ui.msgbox.aceptarAccion == "GUARDAR") {
			let imagen = {
				fotonombre: this.fotonombre,
				Foto: this.foto,
			};
			store.dispatch(addDetalleImagenes(imagen, null));
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
				attribute: "hidden",
			},
			fotonombre: {
				type: String,
				reflect: true,
				attribute: "fotonombre",
			},
			current: {
				type: String,
				reflect: true,
			},
		};
	}
}
window.customElements.define("foto-screen", fotoScreen);
