export const GET_DOCUMENTACION_AFILIADO_BY_ID = "[afiliados documentacion] GET afiliado by id ";
export const GET_DOCUMENTACION_AFILIADO_BY_ID_SUCCESS = "[afiliados documentacion] GET afiliado by id success";
export const GET_DOCUMENTACION_AFILIADO_BY_ID_ERROR = "[afiliados documentacion] GET afiliado by id error";

export const GET_DOCUMENTACION_BY_ID = "[afiliados documentacion] GET by id ";
export const GET_DOCUMENTACION_BY_ID_SUCCESS = "[afiliados documentacion] GET by id success";
export const GET_DOCUMENTACION_BY_ID_ERROR = "[afiliados documentacion] GET by id error";

export const ADD_DOCUMENTACION = "[afiliados documentacion] ADD";
export const ADD_DOCUMENTACION_SUCCESS = "[afiliados documentacion] ADD documentacion success";
export const ADD_DOCUMENTACION_ERROR = "[afiliados documentacion] ADD documentacion error";

export const CURRENT_DETALLE_DOCUMENTACION = "[afiliados documentacion] Current detalle documentacion";

export const getDocumentaciongetByAfiliadoId = (afiliadoId) => ({
    type: GET_DOCUMENTACION_AFILIADO_BY_ID,
    afiliadoId: afiliadoId,
});

export const getDocumentacionById = (id) => ({
    type: GET_DOCUMENTACION_AFILIADO_BY_ID,
    id: id,
});

export const add = (item) => ({
    type: ADD_DOCUMENTACION,
    item: item,
});

export const currentDetalleDocumentacionId = (detalleDocumentacionId) => ({
    type: CURRENT_DETALLE_DOCUMENTACION,
    detalleDocumentacionId: detalleDocumentacionId,
});
