export const GET = "[afiliado Contactos] GET";
export const SUCCESS = "[afiliado Contactos] Success";

export const GET_BY_AFILIADO_ID = "[afiliado Contactos] GET by afiliado id";
export const GET_BY_AFILIADO_ID_SUCCESS = "[afiliado Contactos] GET by afiliado id Success";
export const GET_BY_AFILIADO_ID_ERROR = "[afiliado Contactos] GET by afiliado id Error";

export const ADD = "[afiliado Contactos] ADD";
export const ADD_SUCCESS = "[afiliado Contactos] ADD success";
export const ADD_ERROR = "[afiliado Contactos] ADD error";

export const SET_CURRENT = "[afiliado Contactos] set current afiliado";

export const get = () => ({
    type: GET,
});

export const getByAfiliadoId = (id) => ({
    type: GET_BY_AFILIADO_ID,
    id: id,
});

export const success = () => ({
    type: SUCCESS,
});

export const add = (item) => ({
    type: ADD,
    item: item,
});

export const setCurrent = (item) => ({
    type: SET_CURRENT,
    item: item,
});
