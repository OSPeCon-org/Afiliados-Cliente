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
import { add as addImagen } from "../../../redux/afiliadoDocumentacion/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const AFILIADO_DOCUMENTACION = "afiliadoDocumentacion.documentacionByIdTimeStamp";
const ADD_DOCUMENTACION_SUCCESS = "afiliadoDocumentacion.addTimeStamp";

export class afiliadoDocumentacionScreen extends connect(store, SCREEN, MEDIA_CHANGE, AFILIADO_DOCUMENTACION, ADD_DOCUMENTACION_SUCCESS)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.area = "body";
        this.current = "";
        this.documentacion = [];
        this.documentacionAfiliado = [];

        this.items = [];
        /*[
                { titulo: "Documento frente", imagen: "UPLOAD", estado: "PENDIENTE", copete: "Debe subir el documento", accion1: "NUEVO DOCUMENTO", accion2: " VER DOCUMENTO" },
                { titulo: "Documento dorso", imagen: "UPLOAD", estado: "PENDIENTE", copete: "Debe subir el documento", accion1: "NUEVO DOCUMENTO", accion2: "VER DOCUMENTO" },
                { titulo: "Constancia de CUIL", imagen: "UPLOAD", estado: "PENDIENTE", copete: "Debe subir el documento", accion1: "VER DOCUMENTO", accion2: "VER DOCUMENTO" },
                { titulo: "Formulario F154", imagen: "UPLOAD", estado: "PENDIENTE", copete: "Debe subir el documento", accion1: "NUEVO DOCUMENTO", accion2: "VER DOCUMENTO" },
            ];*/
        //this.svgs = { OK: OK, CANCEL: CANCEL, SETTINGS: SETTINGS, UPLOAD: UPLOAD };
        // this.estados = { 0: "PENDIENTE", 1: "APROBADO", 2: "RECHAZADO", 3: "EN PROCESO" };

        this.svgs = {
            0: { tipo: "UPLOAD", estado: "PENDIENTE", imagen: UPLOAD, copete: "Debe subir el documento", accion1: "NUEVO DOCUMENTO", accion2: "" },
            1: { tipo: "OK", estado: "APROBADO", imagen: OK, copete: "", accion1: "", accion2: " VER DOCUMENTO" },
            2: { tipo: "CANCEL", estado: "RECHAZADO", imagen: CANCEL, copete: "Debe subir el documento", accion1: "", accion2: "VER DOCUMENTO" },
            3: { tipo: "SETTINGS", estado: "EN PROCESO", imagen: SETTINGS, copete: "", accion1: "", accion2: " VER DOCUMENTO" },
        };
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
                <input id="documento" type="file" accept="image/*,.pdf" hidden @change=${this.setFile} />
                <div id="datos">
                    ${this.items?.map((item) => {
                        return html`
                            <div class="tarjeta-documento" tipo=${this.svgs[item.estado].tipo}>
                                <div titulo>
                                    <div>${item.titulo}</div>
                                    <div help @click="${this.help}">${HELP}</div>
                                </div>
                                <div estado>
                                    <div>${this.svgs[item.estado].estado}</div>
                                    <div copete>${this.svgs[item.estado].copete}</div>
                                </div>
                                ${this.svgs[item.estado].imagen}
                                <div acciones>
                                    <button id="subirDocumento" link @click="${this.subirDocumento}" .itemId=${item}>${this.svgs[item.estado].accion1}</button>
                                    <button link action @click=${this.verDocumento} .itemId=${item}>${this.svgs[item.estado].accion2}</button>
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
                <span
                    tabindex="0"
                    @focus="${(_) => {
                        this.shadowRoot.querySelector("#subirDocumento").focus();
                    }}"
                ></span>
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
        foto.iddetalle = "e.currentTarget.iddetalle";
        foto.hidden = false;
        this.volver();
    }

    subirDocumento(e) {
        this.shadowRoot.querySelector("#documento").itemId = e.currentTarget.itemId;
        this.renderRoot.querySelector("#subidaArchivos").showModal();
    }

    volver() {
        this.renderRoot.querySelector("#subidaArchivos").close();
    }

    verDocumento(e) {
        window.open(e.currentTarget.itemId.url);
    }

    capturarImagen() {}

    async guardarImagen(file, id) {
        let fileContent = await this.getFileContentAsync(file);
        fileContent = fileContent.split(",")[1];

        console.log(id);
        let itemImagen = {
            afiliadoId: store.getState().afiliadoDatos.current.id,
            detalleDocumentacionId: id,
            imagen: fileContent,
            tipo: file.type,
        };

        store.dispatch(addImagen(itemImagen));
    }

    setFile(e) {
        const file = e.currentTarget.files[0];

        if (file.size >= 3 * 1024 * 1024) {
            alert("Los Archivos deben ser menores a 3MB!");
            return false;
        }

        this.guardarImagen(file, e.currentTarget.itemId.detalleDocumentacionId);

        e.currentTarget.value = null;
        this.update();
    }

    async getFileContentAsync(file) {
        let result_base64 = await new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
        });
        return result_base64;
    }

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
                setTimeout(() => {
                    this.shadowRoot.querySelector("#subirDocumento").focus();
                }, 300);
            }
        }

        if (name == AFILIADO_DOCUMENTACION) {
            this.documentacionAfiliado = state.afiliadoDocumentacion.documentacionById;

            this.items = this.documentacionAfiliado.map((item) => {
                return {
                    id: item.id,
                    titulo: item.documentacion,
                    detalleDocumentacionId: item.detalleDocumentacionId,
                    url: item.url,
                    estado: item.estado,
                };
            });
            this.update();
        }

        if (name == ADD_DOCUMENTACION_SUCCESS) {
            this.renderRoot.querySelector("#subidaArchivos").close();
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
