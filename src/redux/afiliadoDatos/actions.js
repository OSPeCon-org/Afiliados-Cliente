export const GET = "[afiliado Datos] GET";
export const SUCCESS = "[afiliado Datos] Success";
export const GET_ERROR = "[afiliado Datos] GET Error";

export const GET_BY_ID = "[afiliado Datos] GET";
export const GET_BY_ID_SUCCESS = "[afiliado Datos] GET Success";
export const GET_BY_ID_ERROR = "[afiliado Datos] GET Error";

export const ADD = "[afiliado Datos] ADD";
export const ADD_SUCCESS = "[afiliado Datos] ADD success";
export const ADD_ERROR = "[afiliado Datos] ADD error";


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

export const add = (item) => ({
    type: ADD,
    item: item,
});




