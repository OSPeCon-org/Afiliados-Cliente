import { css } from "lit-element";

export const tarjetaDocumento = css`
    .tarjeta {
        display: grid;
        width: 24.5rem;
        background-color: var(--formulario);
        gap: 0;
        padding: 0;
        grid-template-areas:
            "titulo"
            "estado"
            "acciones";
        grid-template-rows: 3fr 8fr 2fr;
        align-content: start;
        overflow-y: auto;
        border-radius: 5px;
        cursor: pointer;
        overflow: hidden;
        min-height: 15rem;
    }

    .tarjeta svg {
        grid-area: titulo / titulo / acciones / acciones;
    }

    .tarjeta div[titulo] {
        display: grid;
        grid-area: titulo;
        color: var(--on-formulario);
        align-content: center;
        font-family: var(--font-header-h1-family);
        font-size: var(--font-header-h1-size);
        font-weight: var(--font-header-h1-weight);
        padding-left: 0.5rem;
        padding-top: 0.5rem;
        padding-right: 0.5rem;
        grid-auto-flow: column;
        grid-template-columns: 1fr auto;
    }
    .tarjeta div[estado] {
        grid-area: estado;
        color: var(--on-formulario-bajada);
        margin: auto;
        font-size: 3rem;
        color: var(--on-formulario-disabled);
        grid-auto-flow: row;
    }
    .tarjeta div[copete] {
        font-size: 1rem;
        text-align: center;
    }
    .icono {
    }
    .tarjeta div[acciones] {
        grid-area: acciones;
        display: grid;
        background-color: var(--formulario);
        border-top-color: var(--on-aplicacion-separador);
        border-top: 2px;
        grid-auto-flow: column;
        align-content: center;
        justify-content: space-between;
    }
    .accion[principal] {
        color: var(--primario);
    }
    .accion[secundaria] {
        color: var(--secundario);
    }
    .tarjeta div[help] svg {
        width: 1.5rem !important;
    }
    .tarjeta svg:not(:first-child) {
        height: auto;
        display: block;
        margin: auto;
        width: 70%;
        overflow: hidden;
    }

    .tarjeta[tipo="OK"] svg {
        color: rgba(89, 166, 13, 0.21);
        fill: rgba(89, 166, 13, 0.21);
    }
    .tarjeta[tipo="CANCEL"] svg {
        color: rgba(255, 0, 0, 0.14);
        fill: rgba(255, 0, 0, 0.14);
    }
    .tarjeta[tipo="SETTINGS"] svg {
        color: rgba(213, 217, 30, 0.36);
        fill: rgba(213, 217, 30, 0.36);
    }
    .tarjeta[tipo="UPLOAD"] svg {
        color: rgba(28, 59, 120, 0.15);
        fill: rgba(28, 59, 120, 0.15);
    }

    .tarjeta[dark] {
    }
`;
