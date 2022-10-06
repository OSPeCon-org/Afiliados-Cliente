export const GET = "[afiliado Domicilios] GET";
export const SUCCESS = "[afiliado Domicilios] Success";

export const ADD = "[afiliado Domicilios] ADD";
export const ADD_SUCCESS = "[afiliado Domicilios] ADD success";
export const ADD_ERROR = "[afiliado Domicilios] ADD error";

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
