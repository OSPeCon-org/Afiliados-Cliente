/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";

import { BENEF, GRPFAM, PERSON } from "../../../../assets/icons/svgs.js";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { button } from "@brunomon/template-lit/src/views/css/button";

import { tarjetaFamilia } from "../../css/tarjetaFamilia";
import { tarjetaPersona } from "../../css/tarjetaPersona";
import { goTo } from "@brunomon/template-lit/src/redux/routing/actions";
import { getGrupoFamiliar, setCurrent } from "../../../redux/afiliados/actions";
import { accept, autorizacion } from "../../../redux/autorizacion/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const GRUPO_FAMILIAR = "afiliados.timeStamp";
const AUTORIZACION = "autorizacion.timeStamp";
const AFILIADO_BY_CUIL = "afiliados.afiliadoByCuilTimeStamp";
const ACCEPT = "afiliados.acceptTimeStamp";

export class afiliadoAcceptScreen extends connect(store, SCREEN, MEDIA_CHANGE, AUTORIZACION, ACCEPT, AFILIADO_BY_CUIL, GRUPO_FAMILIAR)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.area = "body";
        this.currentByCuil = "";

        this.svgs = { BENEF: BENEF, GRPFAM: GRPFAM };

        //"https://app.uocra.org/credencialSindical/sinusuario.png"//
        this.items = [];
        /*{ id: 1, icono: "", parentesco: "Titular", imagen: "https://app.uocra.org/credencialSindical/28491226.jpg", nombre: "Juan Jose Ruiz", estado: "Afiliacion activa" },
            { id: 1, icono: "", parentesco: "Conyuge", imagen: "https://app.uocra.org/credencialSindical/sinusuario.png", nombre: "Josefa Ruiz", estado: "Afiliacion activa" },
            { id: 1, icono: "", parentesco: "Madre", imagen: "https://app.uocra.org/credencialSindical/17249982.jpg", nombre: "Antonia Maria", estado: "Afiliacion activa" },
            { id: 1, icono: "", parentesco: "Hijo", imagen: "https://app.uocra.org/credencialSindical/17221332.jpg", nombre: "Lucas Ruiz", estado: "Afiliacion activa" },*/

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

                background-color: var(--aplicacion);
            }
            :host([hidden]) {
                display: none;
            }
            #subtitulo {
                display: grid;
                font-family: var(--font-header-h1-family);
                font-size: var(--font-header-h1-size);
                font-weight: 400;
                background-color: var(--secundario);
                color: var(--on-secundario);
            }
            #subtitulo div {
                margin: auto;
            }
            #cuerpo {
                display: grid;
                //grid-template-columns: repeat(auto-fill, minmax(12rem, 14rem));
                grid-gap: 1rem;
                padding: 1rem 0;
                overflow-y: auto;
                justify-content: center;
                justify-items: center;
                align-content: flex-start;
                background-color: var(--aplicacion);
            }
            div[invisible] {
                visibility: hidden;
            }
            *[hidden] {
                display: none;
            }
        `;
    }

    render() {
        return html`
            <div class="grid" ?hidden=${this.modo != "encontrado"}>
                <div id="subtitulo"><div>confirmacion de identidad</div></div>
                <div id="cuerpo">
                    <div class="tarjeta-persona">
                        <div titulo>
                            <div help>${PERSON}</div>
                            <div>${this.currentByCuil.apellido}, ${this.currentByCuil.nombre}</div>
                        </div>
                        <div cuerpo><img src="" /></div>
                        <div nombre>DNI: ${this.currentByCuil.documento}</div>
                        <div documento>FECHA NAC.:${this.currentByCuil.fechaNacimiento}</div>
                        <button raised @click="${this.aceptar}">ACEPTAR</button>
                    </div>
                </div>
            </div>
            <div class="grid" ?hidden=${this.modo != "no-encontrado"}>
                <div id="subtitulo"><div>No existe</div></div>
                <button raised @click="${this.afiliarme}">AFILIARME</button>
            </div>
        `;
    }

    /*return html`
            <div id="subtitulo"><div></div></div>
            <div id="cuerpo">
                <div class="tarjeta-persona">
                    <div titulo>
                        <div help ?invisible=${item.icono == ""} @click="${this.icono}">${this.svgs[item.icono]}</div>
                        <div>${this.currentByCuil.apellido}, ${this.currentByCuil.nombre}</div>
                    </div>
                    <div cuerpo><img src="${item.imagen}" /></div>
                    <div nombre>${item.apellido}, ${item.nombre}</div>
                    <div estado>${item.estadosAfiliacionNombre}</div>
                    <button raised @click="${this.aceptar}" .item=${item}>ACEPTAR</button>
                </div>
            </div>
        `;*/

    aceptar(e) {
        //store.dispatch(setCurrent(e.currentTarget.item));

        store.dispatch(accept(store.getState().afiliados.afiliadoByCuil.id));
        store.dispatch(goTo("afiliadoMostrar"));
    }

    afiliarme() {
        store.dispatch(
            setCurrent({
                parentescoId: "",
                cuil: "",
                planId: "",
                apellido: "",
                nombre: "",
                sexo: "",
                fechaNacimiento: "",
                tipoDocumento: "",
                documento: "",
                estadoCivil: "",
                nacionalidad: "",
                discapacitado: "",
            })
        );
        store.dispatch(goTo("afiliadoDatos"));
    }

    firstUpdated(changedProperties) {}

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
        }

        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["afiliadoAccept"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
        }

        /*if (name == GRUPO_FAMILIAR) {
            this.items = state.afiliados.grupoFamiliar.map((item) => {
                item.imagen = "https://app.uocra.org/credencialSindical/" + item.documento + ".jpg";
                item.icono = "";
                return item;
            });
            this.update();
        }

        if (name == AUTORIZACION) {
            if (state.autorizacion.entities.titulares.length == 0) {
                this.items = null;
                this.update();
            }
        }*/

        if (name == AFILIADO_BY_CUIL) {
            this.hidden = false;
            this.currentByCuil = state.afiliados.afiliadoByCuil;
            if (this.currentByCuil.status == 404) {
                this.modo = "no-encontrado";
            } else {
                this.modo = "encontrado";
            }

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
            modo: {
                type: String,
                reflect: true,
            },
        };
    }
}

window.customElements.define("afiliado-accept-screen", afiliadoAcceptScreen);
