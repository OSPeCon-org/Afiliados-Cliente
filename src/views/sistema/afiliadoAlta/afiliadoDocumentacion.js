/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";

import { UPLOAD, SETTINGS, OK, CANCEL, HELP } from "../../../../assets/icons/svgs.js";
import { dialog } from "@brunomon/template-lit/src/views/css/dialog";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";

import { OPCION_DOCUM, RutaOpcionesControl } from "../../componentes/rutaOpciones";
import { tarjetaDocumento } from "../../css/tarjetaDocumento";
import { goHistoryPrev, goTo } from "@brunomon/template-lit/src/redux/routing/actions";
import { cambioOpcioRuta } from "../../../redux/ruta/actions";

import { fotoScreen } from "../../componentes/fotoScreen";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const AFILIADO_DOCUMENTACION = "afiliadoDocumentacion.timeStamp";

export class afiliadoDocumentacionScreen extends connect(store, SCREEN, MEDIA_CHANGE, AFILIADO_DOCUMENTACION)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.documentacion = [];
		this.items =
			//[];
			[
				{ titulo: "Documento frente", imagen: "UPLOAD", estado: "PENDIENTE", copete: "Debe subir el documento", accion1: "NUEVO DOCUMENTO", accion2: " VER DOCUMENTO" },
				{ titulo: "Documento dorso", imagen: "UPLOAD", estado: "PENDIENTE", copete: "Debe subir el documento", accion1: "NUEVO DOCUMENTO", accion2: "VER DOCUMENTO" },
				{ titulo: "Constancia de CUIL", imagen: "UPLOAD", estado: "PENDIENTE", copete: "Debe subir el documento", accion1: "VER DOCUMENTO", accion2: "VER DOCUMENTO" },
				{ titulo: "Formulario F154", imagen: "UPLOAD", estado: "PENDIENTE", copete: "Debe subir el documento", accion1: "NUEVO DOCUMENTO", accion2: "VER DOCUMENTO" },
			];
		this.svgs = { OK: OK, CANCEL: CANCEL, SETTINGS: SETTINGS, UPLOAD: UPLOAD };
	}

	static get styles() {
		return css`
			${gridLayout}
			${dialog}
            ${button}
			${input}
			${select}
			${tarjetaDocumento}
            :host {
				display: grid;
				position: relative;
				width: 100vw;
				grid-template-rows: auto 1fr;
				justify-items: center;
				background-color: var(--aplicacion);
			}
			:host([hidden]) {
				display: none;
			}
			*[hidden] {
				display: none;
			}
			ruta-opcionescontrol {
				width: 100vw;
			}
			#cuerpo {
				display: grid;
				overflow-y: auto;
				background-color: var(--aplicacion);
			}
			#datos {
				display: grid;
				width: 90vw;
				grid-template-columns: repeat(auto-fill, minmax(26rem, 28rem));
				grid-gap: 1rem;
				padding: 1rem 0;
				justify-content: center;
				justify-items: center;
				align-content: flex-start;
				background-color: var(--aplicacion);
			}
		`;
	}

	render() {
		return html`
			<ruta-opcionescontrol></ruta-opcionescontrol>
			<div id="cuerpo">
				<div id="datos">
					${this.items?.map((item) => {
						return html`
							<input id="documento" type="file" hidden />
							<div class="tarjeta-documento" tipo=${item.imagen}>
								<div titulo>
									<div>${item.titulo}</div>
									<div help @click="${this.help}">${HELP}</div>
								</div>
								<div estado>
									<div>${item.estado}</div>
									<div copete>${item.copete}</div>
								</div>
								${this.svgs[item.imagen]}
								<div acciones>
									<button link @click="${this.subirDocumento}">${item.accion1}</button>
									<button link action @click=${this.verDocumento}>${item.accion2}</button>
								</div>
							</div>

							<dialog id="subidaArchivos">
								<div class="footer column">
									<div class="inner-grid row">
										<button link @click="${this.subirDocumentoFile}">
											<div>DE MI PC</div>
										</button>
										<button link @click="${this.subirDocumentoCamera}">
											<div>DESDE CAMARA</div>
										</button>

										<button link @click="${this.volver}">
											<div style="text-align: end;" class="align-self-start">VOLVER</div>
										</button>
									</div>
								</div>
							</dialog>

							<foto-screen id="foto" fotonombre="foto1" hidden></foto-screen>
						`;
					})}
				</div>
				<div class="grid column" style="padding-bottom:5rem;">
					<button flat @click="${this.atras}">ANTERIOR</button>
					<button raised @click="${this.siguiente}">SIGUIENTE</button>
				</div>
			</div>
		`;
	}

	/*  <div class="photo inner-grid column center align-end">
                                <img id="imagen" src= />
                                <video id="video" autoplay="" playsinline=""></video>
                                <canvas id="canvas" hidden></canvas>
                                <button id="btnPhoto" class="BtnCaptura" @click=${this.capturarImagen}>X</button>
                            </div>*/

	atras() {
		store.dispatch(goHistoryPrev());
	}
	siguiente() {
		store.dispatch(goTo("afiliadoAltaFin"));
	}

	mostrarUpdates() {}

	subirDocumentoFile() {
		this.shadowRoot.querySelector("#documento").click();
	}

	subirDocumentoCamera(e) {
		let foto = this.shadowRoot.querySelector("#foto");
		//foto.iddetalle = e.currentTarget.iddetalle;
		foto.iddetalle = "e.currentTarget.iddetalle";
		foto.hidden = false;
		this.volver();
	}

	subirDocumento() {
		this.renderRoot.querySelector("#subidaArchivos").showModal();
	}

	volver() {
		this.renderRoot.querySelector("#subidaArchivos").close();
	}

	verDocumento() {}

	capturarImagen() {}

	help(titulo) {}
	firstUpdated(changedProperties) {}

	stateChanged(state, name) {
		if (name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
		}
		if (name == SCREEN) {
			this.hidden = true;
			const isCurrentScreen = ["afiliadoDocumentacion"].includes(state.screen.name);
			if (isInLayout(state, this.area) && isCurrentScreen) {
				this.hidden = false;
				store.dispatch(cambioOpcioRuta(OPCION_DOCUM));
			}
		}

		if (name == AFILIADO_DOCUMENTACION) {
			this.documentacion = state.afiliadoDocumentacion.documentacion;
			console.log(this.documentacion);
			this.items = this.documentacion.map((item) => {
				return {
					titulo: item.documentacionNombre,
					imagen: "UPLOAD",
					estado: "PENDIENTE",
					copete: "Debe subir el documento",
					accion1: "SUBIR DOCUMENTO",
					accion2: "VER DOCUMENTO",
				};
			});
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

window.customElements.define("afiliado-documentacion-screen", afiliadoDocumentacionScreen);
