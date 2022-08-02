export const GET = "[afiliados documentacion] GET";
export const GET_SUCCESS = "[afiliados documentacion] GET success";
export const GET_ERROR = "[afiliados documentacion] GET error";

export const get = (planId, parentescoId, discapacidad) => ({
    type: GET,
    planId: planId,
    parentescoId: parentescoId,
    discapacidad: discapacidad,
});
