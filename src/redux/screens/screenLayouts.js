/** @format */

import { ALL_BODY, HEADER_BODY_FOOT, BODY_FOOT, HEADER_BODY, SLIDER_HEADER_BODY } from "./layouts";

export const screenLayuts = {
    splash: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY,
    },
    main: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    afiliadoMostrar: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    afiliadoDatos: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    afiliadoDireccion: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    afiliadoContacto: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    afiliadoDocumentacion: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    afiliadoAltaFin: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    afiliadoPorCuil: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    afiliadoAccept: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    pruebaDaniel: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    pruebaFlor: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    pruebaCristian: { HEADER_BODY, medium: HEADER_BODY, large: HEADER_BODY },
    formDocumentacion: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
};

export const getLayout = (state) => {
    if (!state.screen.layouts[state.ui.media.size]) throw "no hay un layout definido en el state para media-size:" + state.ui.media.size;
    let layout = state.screen.layouts[state.ui.media.size];
    if (state.screen.layouts[state.ui.media.size][state.ui.media.orientation]) {
        layout = state.screen.layouts[state.ui.media.size][state.ui.media.orientation];
    }
    return layout;
};

export const isInLayout = (state, area) => {
    return getLayout(state).areas.find((a) => a == area);
};
