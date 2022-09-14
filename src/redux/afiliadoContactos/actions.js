export const GET = "[afiliado Contactos] GET";
export const SUCCESS = "[afiliado Contactos] Success";

export const ADD = "[afiliado Contactos] ADD";
export const ADD_SUCCESS = "[afiliado Contactos] ADD success";
export const ADD_ERROR = "[afiliado Contactos] ADD error";

export const get = () => ({
    type: GET,
});

export const success = () => ({
    type: SUCCESS,
});

export const add = (item) => ({
    type: ADD,
    item: item,
});