export const GET = "[afiliado Datos] GET";
export const SUCCESS = "[afiliado Datos] Success";

export const ADD = "[afiliado Datos] ADD";
export const ADD_SUCCESS = "[afiliado Datos] ADD success";
export const ADD_ERROR = "[afiliado Datos] ADD error";


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




