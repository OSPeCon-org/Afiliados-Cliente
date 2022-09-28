export const GET_GRUPO_FAMILIAR = "[afiliados] GET grupo familiar";
export const GET_GRUPO_FAMILIAR_SUCCESS = "[afiliados] GET grupo familiar Success";
export const GET_GRUPO_FAMILIAR_ERROR = "[afiliados] GET grupo familiar Error";


export const getGrupoFamiliar = (cuil) => ({
    type: GET_GRUPO_FAMILIAR,
    cuil: cuil,
});

