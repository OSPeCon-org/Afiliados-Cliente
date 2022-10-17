export const GET = "[afiliado Datos] GET";
export const SUCCESS = "[afiliado Datos] Success";
export const GET_ERROR = "[afiliado Datos] GET Error";

export const GET_BY_ID = "[afiliado Datos] GET";
export const GET_BY_ID_SUCCESS = "[afiliado Datos] GET Success";
export const GET_BY_ID_ERROR = "[afiliado Datos] GET Error";

export const ACTUALIZAR = "[afiliado Datos] Actualizar";
export const ACTUALIZAR_SUCCESS = "[afiliado Datos] Actualizar success";
export const ACTUALIZAR_ERROR = "[afiliado Datos] Actualizar error";

export const SET_CURRENT = "[afiliado Datos] set current afiliado";

export const get = () => ({
    type: GET,
});

export const success = () => ({
    type: SUCCESS,
});

export const getById = (id) => ({
    type: GET_BY_ID,
    id: id,
});

export const actualizar = (item) => ({
    type: ACTUALIZAR,
    item: item,
});

export const setCurrent = (item) => ({
    type: SET_CURRENT,
    item: item,
});
