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
import { goTo } from "@brunomon/template-lit/src/redux/routing/actions";
import { getGrupoFamiliar, setCurrent as setCurrentDatos } from "../../../redux/afiliadoDatos/actions";
import { setCurrent as setCurrentDomicilio, getByAfiliadoId as getAfiliadoByIdDomicilio } from "../../../redux/afiliadoDomicilios/actions";
import { setCurrent as setCurrentContactos, getByAfiliadoId as getAfiliadoByIdContacto } from "../../../redux/afiliadoContactos/actions";

import foto from "../../../../assets/image/foto.png";
import { altaDeFamiliar, altaDeTitular, verAfiliado } from "../../../redux/uiAfiliados/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const GRUPO_FAMILIAR = "afiliados.timeStamp";
const AUTORIZACION = "autorizacion.timeStamp";

export class afiliadoMostrarScreen extends connect(store, SCREEN, MEDIA_CHANGE, AUTORIZACION, GRUPO_FAMILIAR)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.area = "body";
        this.current = "";
        this.grupoFamiliar = [];
        this.svgs = { BENEF: BENEF, GRPFAM: GRPFAM };

        this.items = [];
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
                grid-template-rows: 3rem 1fr;
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
            #cuerpo1 {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(10rem, 15rem));
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
        `;
    }

    render() {
        if (!this.items) {
            return html`
                <div id="subtitulo"><div>Nueva solicitud de afiliacion</div></div>
                <div id="cuerpo">
                    <div class="tarjeta-familia">
                        <div titulo>
                            <div help>${BENEF}</div>
                            <div>Titular</div>
                        </div>
                        <div cuerpo>Dar de alta al titular del grupo familiar</div>
                        <button raised @click="${this.nuevoTitular}">AGREGAR</button>
                    </div>
                </div>
            `;
        } else {
            return html`
                <div id="subtitulo"><div>Nueva solicitud de afiliacion</div></div>
                <div id="cuerpo1">
                    ${this.items?.map((item) => {
                        return html`<div class="tarjeta-persona">
                            <div titulo>
                                <div help ?invisible=${item.icono == ""} @click="${this.icono}">${this.svgs[item.icono]}</div>
                                <div>${item.parentescoNombre}</div>
                            </div>
                            <div cuerpo><img src="${foto}" /></div>
                            <div nombre>${item.apellido}, ${item.nombre}</div>
                            <div estado>${item.estadosAfiliacionNombre}</div>
                            <button raised @click="${this.mostrar}" .item=${item}>VER</button>
                        </div> `;
                    })}
                    <div class="tarjeta-familia">
                        <div titulo>
                            <div help>${GRPFAM}</div>
                            <div>Grupo Familiar</div>
                        </div>
                        <div cuerpo>Dar de alta un nuevo integante del grupo familiar</div>
                        <button raised @click="${this.nuevoFamiliar}">AGREGAR</button>
                    </div>
                </div>
            `;
        }
    }

    nuevoTitular() {
        store.dispatch(altaDeTitular());
    }
    nuevoFamiliar() {
        store.dispatch(altaDeFamiliar());
    }

    mostrar(e) {
        store.dispatch(verAfiliado(e.currentTarget.item));
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

        if (name == GRUPO_FAMILIAR) {
            this.items = state.afiliados.grupoFamiliar.map((item) => {
                item.imagen = "https://app.uocra.org/credencialSindical/" + item.documento + ".jpg";
                item.icono = "";
                return item;
            });
            this.update();
        }

        if (name == AUTORIZACION && false) {
            if (
                //state.autorizacion.entities.titulares != undefined &&
                state.autorizacion.entities.titulares.length == 0
            ) {
                this.items = null;
                this.update();
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
