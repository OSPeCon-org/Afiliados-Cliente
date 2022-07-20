/* 
<div class="tarjeta-persona">
	<div titulo>
		<div help style="visibility:${item.icono == "" ? "hidden" : "visible"};" @click="${this.icono}">${this.svgs[item.icono]}</div>
		<div>${item.parentesco}</div>
	</div>
	<div cuerpo><img src="https://app.uocra.org/credencialSindical/sinusuario.png" /></div>
	<div nombre>${item.nombre}</div>
	<div estado>${item.estado}</div>
</div>
*/

import { css } from "lit-element";

export const tarjetaPersona = css`
	.tarjeta-persona {
		display: grid;
		width: 12rem;
		height: 9rem;
		background-color: var(--formulario);
		gap: 0;
		padding: 0;
		grid-template-rows: 3.5fr 8fr 2.8fr 2.6fr;
		align-content: start;
		border-radius: 5px;
		overflow: hidden;
	}

	.tarjeta-persona div[titulo] {
		display: grid;
		grid-template-columns: auto 1fr;
		color: var(--primario);
		font-family: var(--font-header-h1-menos-family);
		font-size: var(--font-header-h1-menos-size);
		font-weight: var(--font-header-h1-weight);
		padding: 0 0.4rem;
		align-content: center;
		text-align: right;
	}
	.tarjeta-persona div[help] {
		display: grid;
	}

	.tarjeta-persona div[help] svg {
		width: 1.6rem;
		height: 1.6rem;
		fill: var(--on-formulario-bajada) !important;
		opacity: 0.5;
		cursor: pointer;
	}
	.tarjeta-persona div[cuerpo] {
		display: grid;
		overflow: hidden;
		margin: auto;
	}
	.tarjeta-persona div[cuerpo] img {
		max-width: auto;
		max-height: 4rem;
		border-radius: 50%;
	}
	.tarjeta-persona div[estado] {
		text-align: center;
		font-family: var(--font-header-h1-menos-family);
		font-size: var(--font-header-h1-menos-size);
		font-weight: var(--font-header-h1-menos-weight);
	}
	.tarjeta-persona div[nombre] {
		padding: 0 0.4rem;
		font-family: var(--font-header-h1-menos-family);
		font-size: var(--font-header-h1-menos-size);
		font-weight: var(--font-header-h1-menos-weight);
		align-self: self-end;
		border-top: solid 1px var(--on-aplicacion-separador);
		opacity: 0.6;
	}

	.tarjeta-persona button {
		width: 100%;
	}
	.tarjeta-persona button[raised] {
		box-shadow: none !important;
	}
	.tarjeta-persona[dark] {
	}
`;
