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
        this.iddetalle = 0;
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
                position: relative;
                display: grid;
                grid-template-rows: repeat(3, auto);
                grid-gap: 0.5rem;
                width: min-content;
                height: min-content;
                background-color: var(--primario);
                place-items: center;
                justify-self: center;
                align-self: center;
                margin-top: 2rem;
                border-radius: 1rem;
                align-content: flex-start;
                padding-top: 1rem;
                box-shadow: 2px 2px 12px white;
                overflow-y: auto;
                padding: 1rem;
            }
            #botonera {
                display: grid;
                grid-template-columns: 100px 100px;
                border: solid 1px var(--on-primario);
                border-radius: 0.5rem;
                justify-items: center;
            }
            #botonera-grabar {
                display: grid;
                grid-template-columns: 100px 100px;
                border: solid 1px var(--on-primario);
                border-radius: 0.5rem;
                justify-items: center;
            }
            #x {
                height: 1.4rem;
                font-size: 1rem;
                justify-self: right;
                color: white;
                margin: 0 2rem;
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
                font-weight: 600;
                color: var(--on-primario);
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
                <div id="titulo_sacar">Sacar foto</div>
                <video id="video" width="300" height="300" autoplay muted playsinline style="border-radius: 1rem;"></video>
                <div id="botonera">
                    <div id="click-close" @click="${this.volver}">${CANCEL}</div>
                    <div id="click-photo" @click="${this.camaraFoto}">${CAMERA}</div>
                </div>
                <div id="titulo_guardar" ?hidden=${this.foto.length == 0}>Guardar foto</div>
                <canvas id="canvas" width="300" height="300" ?hidden=${this.foto.length == 0} style="border-radius: 1rem;"></canvas>
                <div id="botonera-grabar" ?hidden=${this.foto.length == 0}>
                    <div id="click-close" @click="${this.cerrar}">${CANCEL}</div>
                    <div id="click-rotar" @click="${this.grabar}">${SAVE}</div>
                </div>
            </div>
        `;
    }
    grabar() {
        //store.dispatch(showMsgBox("GUARDAR", "Seguro de guardar la <b>foto?.</b>"));
        let imagen = {
            IdDetalle: this.iddetalle,
            Foto: this.foto,
        };
        //store.dispatch(addDetalleImagenes(imagen, null));
        this.shadowRoot.querySelector("#video").hidden = false;
        this.shadowRoot.querySelector("#titulo_sacar").hidden = false;
        this.shadowRoot.querySelector("#botonera").hidden = false;
        this.foto = "";
        this.update();
    }

    cerrar() {
        this.foto = "";
        this.shadowRoot.querySelector("#video").hidden = false;
        this.shadowRoot.querySelector("#titulo_sacar").hidden = false;
        this.shadowRoot.querySelector("#botonera").hidden = false;
        this.update();
    }

    //async camaraStar() {
    //	this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
    //	this._video.srcObject = this.stream;
    //}

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
            this.shadowRoot.querySelector("#video").hidden = true;
            this.shadowRoot.querySelector("#titulo_sacar").hidden = true;
            this.shadowRoot.querySelector("#botonera").hidden = true;
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
                IdDetalle: this.iddetalle,
                Foto: this.foto,
            };
            store.dispatch(addDetalleImagenes(imagen, null));
        }

        /*if (name == DATOS_DETALLE_IMAGENES && this.current == "encuesta") {
            this.foto = "";
            this.update();
            store.dispatch(showWarning("FOTO", "Se grabo la foto corractamente!", "fondoInformacion", 5000));
        }
        if (name == ERROR_DETALLE_IMAGENES && this.current == "encuesta") {
            store.dispatch(showWarning("Imagen No Guardado", "Verifique su conexion de datos y reintente", "fondoError", 4000));
        }*/
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
            iddetalle: {
                type: Number,
                reflect: true,
                attribute: "iddetalle",
            },
            current: {
                type: String,
                reflect: true,
            },
        };
    }
}
window.customElements.define("foto-screen", fotoScreen);
