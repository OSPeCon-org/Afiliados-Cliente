export const GET_GRUPO_FAMILIAR = "[afiliados] GET grupo familiar";
export const GET_GRUPO_FAMILIAR_SUCCESS = "[afiliados] GET grupo familiar Success";
export const GET_GRUPO_FAMILIAR_ERROR = "[afiliados] GET grupo familiar Error";

export const AFILIADO_BY_CUIL = "[afiliados] By cuil";
export const AFILIADO_BY_CUIL_SUCCESS = "[afiliados] By cuil Success";
export const AFILIADO_BY_CUIL_ERROR = "[afiliados] By cuil Error";

export const SET_CURRENT = "[afiliados] set current afiliado";

export const getGrupoFamiliar = (titularId) => ({
    type: GET_GRUPO_FAMILIAR,
    titularId: titularId,
});

export const afiliadosByCuil = (cuil) => ({
    type: AFILIADO_BY_CUIL,
    cuil: cuil,
});

export const setCurrent = (item) => ({
    type: SET_CURRENT,
    item: item,
});
