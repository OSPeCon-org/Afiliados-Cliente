/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";

import { BENEF, GRPFAM } from "../../../../assets/icons/svgs.js";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";

import { OPCION_CONTACTO, RutaOpcionesControl } from "../../componentes/rutaOpciones";
import { goHistoryPrev, goTo } from "@brunomon/template-lit/src/redux/routing/actions";
import { cambioOpcioRuta } from "../../../redux/ruta/actions";

import { add as addAfiliadoContactos } from "../../../redux/afiliadoContactos/actions"
import { isEmpty, opcionInvalida, mailInvalid } from "../../../libs/funciones";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class afiliadoContactoScreen extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.area = "body";
        this.current = "";
        this.svgs = { BENEF: BENEF, GRPFAM: GRPFAM };

        this.validaciones = {
            celular: { invalid: false, isInvalid: isEmpty },
            particular: { invalid: false, isInvalid: isEmpty }, 
            laboral: { invalid: false, isInvalid: isEmpty }, 
            mail: { invalid: false, isInvalid: mailInvalid },
            mail2: { invalid: false, isInvalid: mailInvalid }, 
        };
       
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
                grid-template-rows: auto 1fr;
                justify-items: center;
            }
            :host([hidden]) {
                display: none;
            }
            ruta-opcionescontrol {
                width: 100vw;
            }
            #cuerpo {
                width: 100vw;
                align-content: flex-start;
                grid-gap: 0;
                padding: 0;
                overflow-y: auto;
                background-color: var(--formulario);
            }
            :host([media-Size="medium"]) #cuerpo {
                width: 80vw;
            }
            :host([media-Size="large"]) #cuerpo {
                width: 70vw;
            }
            .grupo {
                display: grid;
                width: inherit;
                grid-template-columns: repeat(auto-fill, minmax(14rem, 20rem));
                grid-row-gap: 0.5rem;
                grid-column-gap: 2rem;
                padding: 1rem 0;
                justify-content: center;
                background-color: var(--formulario);
            }
            .linea {
                width: 90%;
                height: 1px;
                background-color: var(--on-formulario-separador);
                justify-self: center;
            }
        `;
    }

    render() {
        return html`
            <ruta-opcionescontrol></ruta-opcionescontrol>
            <div id="cuerpo" class="grid row">
                <div class="grupo">
                    <div class="input" ?error=${this.validaciones.celular.invalid}>
                        <input id="telefonoCelular" .value=${this.item.celular} @blur="${this.enlace("celular")}"/>
                        <label for="telefonoCelular">Telefono celular</label>
                        <label error>Debe ingresar un numero de contacto</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input" ?error=${this.validaciones.particular.invalid}>
                        <input id="telefonoParticular"  .value=${this.item.particular} @blur="${this.enlace("particular")}"/>
                        <label for="telefonoParticular">Telefono particular</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Opcional</label>
                    </div>
                    <div class="input" ?error=${this.validaciones.laboral.invalid}>
                        <input id="telefonoLaboral" .value=${this.item.laboral} @blur="${this.enlace("laboral")}"  />
                        <label for="telefonoLaboral">Telefono laboral</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Opcional</label>
                    </div>
                </div>
                <div class="linea"></div>
                <div class="grupo">
                    <div class="input" ?error=${this.validaciones.mail.invalid}>
                        <input id="mail1" .value=${this.item.mail} @blur="${this.enlace("mail")}"/>
                        <label for="mail1">Mail 1</label>
                        <label error>Debe ingresar una cuenta de correo</label>
                        <label subtext>Requerido</label>
                    </div>
                    <div class="input" ?error=${this.validaciones.mail2.invalid}>
                        <input id="mail2" .value=${this.item.mail2} @blur="${this.enlace("mail2")}"/>
                        <label for="mail2">Mail 2</label>
                        <label error>No puede ser vacio</label>
                        <label subtext>Opcional</label>
                    </div>
                </div>
                <div class="grid column" style="padding-bottom:5rem">
                    <button flat @click="${this.atras}">ANTERIOR</button>
                    <button raised @click="${this.siguiente}">SIGUIENTE</button>
                </div>
            </div>
        `;
    }

    atras() {
        store.dispatch(goHistoryPrev());
    }

    siguiente() {
        if (this.isValidForm()) {

            const itemAfiliadoContactos ={
            afiliadosId: store.getState().afiliadoDatos.currentId,
            celular: this.item.celular,
            particular: this.item.particular,
            laboral: this.item.laboral,
            mail: this.item.mail,
            mail2: this.item.mail2,
            }
            
            store.dispatch(addAfiliadoContactos(itemAfiliadoContactos))
            store.dispatch(goTo("afiliadoDocumentacion"));
        } else {
            this.requestUpdate();
        }
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
            const isCurrentScreen = ["afiliadoContacto"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                store.dispatch(cambioOpcioRuta(OPCION_CONTACTO));
            }
        }

        this.item = {
            afiliadosId: "",
            celular: "",
            particular: "",
            laboral: "",
            mail: "",
            mail2: "",
        };   
        
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

window.customElements.define("afiliado-contacto-screen", afiliadoContactoScreen);
