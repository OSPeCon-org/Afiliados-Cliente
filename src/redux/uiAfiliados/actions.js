/** @format */

export const ALTA_DE_TITULAR = "[uiAfiliados] alta de titular";
export const ALTA_DE_FAMILIAR = "[uiAfiliados] alta de familiar";
export const VER_AFILIADO = "[uiAfiliados] ver afiliado";

export const altaDeTitular = () => ({
    type: ALTA_DE_TITULAR,
});
export const altaDeFamiliar = (titularId) => ({
    type: ALTA_DE_FAMILIAR,
    titularId: titularId,
});
export const verAfiliado = (afiliado) => ({
    type: VER_AFILIADO,
    afiliado: afiliado,
});
