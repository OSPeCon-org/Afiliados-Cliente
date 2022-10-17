export const GET = "[afiliado Domicilios] GET";
export const SUCCESS = "[afiliado Domicilios] Success";

export const GET_BY_AFILIADO_ID = "[afiliado Domicilios] GET by afiliado id";
export const GET_BY_AFILIADO_ID_SUCCESS = "[afiliado Domicilios] GET by afiliado id Success";
export const GET_BY_AFILIADO_ID_ERROR = "[afiliado Domicilios] GET by afiliado id Error";

export const ADD = "[afiliado Domicilios] ADD";
export const ADD_SUCCESS = "[afiliado Domicilios] ADD success";
export const ADD_ERROR = "[afiliado Domicilios] ADD error";

export const SET_CURRENT = "[afiliado Domicilios] set current afiliado";

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
