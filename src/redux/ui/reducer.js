/** @format */

import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    SHOW_ERROR,
    HIDE_ERROR,
    SET_MEDIA,
    SET_MEDIA_ORIENTATION,
    SELECTION,
    STEP,
    SHOW_ALERT,
    SHOW_CONFIRM,
    CLEAR_AFILIADO_LOADED,
    ADD_AFILIADO_LOADED,
    REST_AFILIADO_LOADED,
    AFILIADO_DIRECCION_MOSTRAR,
} from "./actions";

const initialState = {
    spinner: {
        loading: 0,
    },
    error: {
        message: "",
        timestamp: null,
    },
    media: {
        size: "large",
        orientation: "landscape",
        timeStamp: null,
    },
    menu: {
        timeStamp: null,
        option: "",
    },

    alert: {
        timeStamp: null,
        titulo: null,
        mensaje: null,
    },
    confirm: {
        timeStamp: null,
        titulo: null,
        mensaje: null,
        onOk: null,
        onCancel: null,
    },
    loginOk: false,
    steps: {
        step: 1,
    },
    afiliadoLoaded: 0,
    afiliadoLoadedTimeStamp: null,
    afiliadoDireccionMostrarTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case SHOW_SPINNER:
            newState.spinner.loading += 1;
            break;
        case HIDE_SPINNER:
            newState.spinner.loading -= 1;
            break;
        case SHOW_ERROR:
            newState.error.timeStamp = new Date().getTime();
            newState.error.messages = action.message;
            break;
        case HIDE_ERROR:
            newState.error.timeStamp = new Date().getTime();
            newState.error.messages = null;
            break;
        case SET_MEDIA:
            newState.media.size = action.size;
            newState.media.timeStamp = new Date().getTime();
            break;
        case SET_MEDIA_ORIENTATION:
            newState.media.orientation = action.orientation;
            newState.media.timeStamp = new Date().getTime();
            break;
        case SELECTION:
            newState.menu.timeStamp = new Date().getTime();
            newState.menu.option = action.option;
            break;
        case SHOW_ALERT:
            newState.alert.timeStamp = new Date().getTime();
            newState.alert.titulo = action.titulo;
            newState.alert.mensaje = action.mensaje;
            break;
        case SHOW_CONFIRM:
            newState.confirm.timeStamp = new Date().getTime();
            newState.confirm.titulo = action.titulo;
            newState.confirm.mensaje = action.mensaje;
            newState.confirm.onOk = action.onOk;
            newState.confirm.onCancel = action.onCancel;
            break;
        case STEP:
            newState.steps.step = action.step;
            break;
        case CLEAR_AFILIADO_LOADED:
            newState.afiliadoLoaded = 0;
            break;
        case ADD_AFILIADO_LOADED:
            newState.afiliadoLoaded += 1;
            break;
        case REST_AFILIADO_LOADED:
            newState.afiliadoLoaded -= 1;
            if (newState.afiliadoLoaded == 0) newState.afiliadoLoadedTimeStamp = new Date().getTime();
            break;
        case AFILIADO_DIRECCION_MOSTRAR:
            newState.afiliadoDireccionMostrarTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
