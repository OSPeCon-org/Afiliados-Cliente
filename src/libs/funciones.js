export const validaMail = (email) => {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
};

export const isEmpty = (value) => {
    if (value == "") return true;
    if (value == 0) return true;
};

export const cuilInvalido = (value) => {
    if (value == "") return true;
};

export const opcionInvalida = (value) => {
    if (!value == 1 || !value == 2) return true;
};

export const dniInvalido = (value) => {
    if (value.length == "") return true;
};
