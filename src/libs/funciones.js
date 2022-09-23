export const mailInvalid = (email) => {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? false: true;
};

export const invalidCUITCUIL = (cuit) => {		
      
      let acumulado = 0;
      let digitos = cuit.replace(/-/g,'');
        digitos = digitos.split('');
      let digito = parseInt(digitos.pop());
    
      for (let i = 0; i < digitos.length; i++) {
        acumulado += digitos[9 - i] * (2 + (i % 6));
      }
    
      let verif = 11 - (acumulado % 11);
      if (verif === 11) {
        verif = 0;
      } else if (verif === 10) {
        verif = 9;
      }   
    
      return !(digito === verif);        
};

export const invalidDni = (value) => {
    var dni = /[0-9]/;
    if(value.length == 6 || value.length == 7 || value.length == 8){
    return dni.test(value) ? false : true;
    }
    return true
};

export const nameInvalido = (value) => {
    var name = /[a-zA-Z ñÑ]/;
    return name.test(value) ? false : true;
};

export const onlyLetter = (value) => {
  var name = /[a-zA-ZñÑ]/;
  return name.test(value) ? false : true;
};

export const onlyNumber = (value) => {
  var name = /[0-9]/;
  return name.test(value) ? false : true;
};

export const invalidFecha = (value) => {
    var fecha = new Date().toISOString();

    if(value >= fecha || value == ""){
    return true
    }
    return false
}

export const opcionInvalida = (value) => {
    if (!value == 1 || !value == 2) return true;
};

export const isEmpty = (value) => {
    if (value == "") return true;
    if (value == 0) return true;
};