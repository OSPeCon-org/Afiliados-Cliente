/* 
<div class="tarjeta-familia" tipo=${item.imagen}>
<div titulo>
	<div help>${this.svgs[item.icono]}</div>
	<div>${item.parentesco}</div>
</div>
<div cuerpo>${item.leyenda}</div>
<button raised>${item.boton}</button>
</div>
*/

import { css } from "lit-element";

export const tarjetaFamilia = css`
	.tarjeta-familia {
		display: grid;
		width: 12rem;
		height: 9rem;
		background-color: var(--formulario);
		gap: 0;
		padding: 0;
		grid-template-rows: 3.5fr 8fr 3fr;
		align-content: start;
		border-radius: 5px;
		overflow: hidden;
	}

	.tarjeta-familia div[titulo] {
		display: grid;
		grid-template-columns: 1fr auto;
		color: var(--primario);
		font-family: var(--font-header-h1-menos-family);
		font-size: var(--font-header-h1-menos-size);
		font-weight: var(--font-header-h1-weight);
		padding: 0 0.4rem;
		align-content: center;
		border-bottom: solid 1px var(--on-aplicacion-separador);
	}
	.tarjeta-familia div[help] {
		display: grid;
	}

	.tarjeta-familia div[titulo] svg {
		width: 2rem;
		height: 2rem;
		fill: var(--on-formulario-bajada) !important;
		opacity: 0.5;
	}
	.tarjeta-familia div[cuerpo] {
		font-family: var(--font-header-h1-menos-family);
		font-size: var(--font-header-h1-menos-size);
		font-weight: var(--font-header-h1-menos-weight);
		color: var(--on-formulario-bajada);
		margin: auto;
		font-size: 1rem;
		padding: 0 0.4rem;
		opacity: 0.7;
	}
	.tarjeta-familia button {
		width: 100%;
	}
	.tarjeta-familia button {
		width: 100%;
	}
	.tarjeta-familia button[raised] {
		box-shadow: none !important;
	}
	.tarjeta-familia[dark] {
	}
`;
