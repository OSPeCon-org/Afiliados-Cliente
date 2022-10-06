/* 
{ titulo: "Documento frente", imagen: "OK", estado: "ACEPTADO", copete: "Aprobado", accion1: "VER DOCUMENTO", accion2: "" },
           
<div class="tarjeta-documento" tipo=${item.imagen}>
<div titulo>
    <div>${item.titulo}</div>
    <div help>${HELP}</div>
</div>
<div estado>
    <div>${item.estado}</div>
    <div copete>${item.copete}</div>
</div>
${this.svgs[item.imagen]}
<div acciones>
    <button link action>${item.accion2}</button>
    <button link action>${item.accion1}</button>
</div>
</div> 
*/

import { css } from "lit-element";

export const tarjetaDocumento = css`
    .tarjeta-documento {
        display: grid;
        width: 20rem;
        height: 9rem;
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
    }

    .tarjeta-documento svg {
        grid-area: titulo / titulo / acciones / acciones;
    }

    .tarjeta-documento div[titulo] {
        display: grid;
        grid-area: titulo;
        color: var(--on-formulario);
        align-content: center;
        font-family: var(--font-header-h1-family);
        font-size: 0.9rem;
        font-weight: var(--font-header-h1-weight);
        padding-left: 0.5rem;
        padding-top: 0.5rem;
        padding-right: 0.5rem;
        grid-auto-flow: column;
        grid-template-columns: 1fr auto;
        opacity: 0.7;
    }
    .tarjeta-documento div[estado] {
        grid-area: estado;
        color: var(--on-formulario-bajada);
        margin: auto;
        font-size: 1.8rem;
        color: var(--on-formulario-disabled);
        grid-auto-flow: row;
    }
    .tarjeta-documento div[copete] {
        font-size: 1rem;
        text-align: center;
    }
    .tarjeta-documento div[acciones] {
        grid-area: acciones;
        display: grid;
        background-color: var(--formulario);
        border-top-color: var(--on-aplicacion-separador);
        border-top: 2px;
        grid-auto-flow: column;
        align-content: center;
        justify-content: space-between;
    }
    .tarjeta-documento div[help] svg {
        width: 1.1rem !important;
    }
    .tarjeta-documento svg:not(:first-child) {
        height: auto;
        display: block;
        margin: auto;
        width: 50%;
        overflow: hidden;
    }
    .tarjeta-documento[tipo="OK"] svg {
        color: var(--ok);
        fill: var(--ok);
    }
    .tarjeta-documento[tipo="CANCEL"] svg {
        color: var(--cancel);
        fill: var(--cancel);
    }
    .tarjeta-documento[tipo="SETTINGS"] svg {
        color: var(--settings);
        fill: var(--settings);
    }
    .tarjeta-documento[tipo="UPLOAD"] svg {
        color: var(--upload);
        fill: var(--upload);
    }
    .tarjeta-documento button {
        font-size: 0.7rem !important;
        padding: 0px 0.3rem !important;
    }
    .tarjeta-documento[dark] {
    }
`;
