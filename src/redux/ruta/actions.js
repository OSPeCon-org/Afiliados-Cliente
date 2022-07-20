export const CAMBIO_OPCION_RUTA = "[ruta opciones] Cambio opcion de ruta";

export const cambioOpcioRuta = (opcion) => ({
    type: CAMBIO_OPCION_RUTA,
    opcion: opcion,
});
