export const GET = "[afiliados documentacion] GET";
export const GET_SUCCESS = "[afiliados documentacion] GET success";
export const GET_ERROR = "[afiliados documentacion] GET error";

export const ADD_DOCUMENTACION = "[afiliados documentacion] ADD";
export const ADD_DOCUMENTACION_SUCCES = "[afiliados documentacion] ADD documentacion success";
export const ADD_DOCUMENTACION_ERROR = "[afiliados documentacion] ADD documentacion error";

export const get = (planId, parentescoId, discapacidad) => ({
    type: GET,
    planId: planId,
    parentescoId: parentescoId,
    discapacidad: discapacidad,
});

export const add = (item) => ({
    type: ADD,
    item: item,
});
