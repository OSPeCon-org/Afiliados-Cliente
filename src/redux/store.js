/** @format */

import { applyMiddleware, createStore, compose } from "redux";
import { logger } from "redux-logger";
import { rootReducer as reducers } from "./reducers";
import { middleware as autorizacion } from "./autorizacion/middleware";
import { middleware as ui } from "./ui/middleware";
import { middleware as api } from "./api/middleware";
import { middleware as rest } from "./rest/middleware";
import { middleware as route } from "./routing/middleware";

import { middleware as parentescos } from "./parentescos/middleware";
import { middleware as planes } from "./planes/middleware";
import { middleware as tipoDocumento } from "./tipoDocumento/middleware";
import { middleware as estadosCiviles } from "./estadosCiviles/middleware";
import { middleware as nacionalidades } from "./nacionalidades/middleware";
import { middleware as afiliadoDatos } from "./afiliadoDatos/middleware";
import { middleware as afiliadoDocumentacion } from "./afiliadoDocumentacion/middleware";
import { middleware as afiliadosContactos } from "./afiliadoContactos/middleware";
import { middleware as afiliadoDomicilios  } from "./afiliadoDomicilios/middleware";
import { middleware as provincias } from "./provincias/middleware";
import { middleware as localidades } from "./localidades/middleware";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let mdw = [
	api,
	rest,
	...ui,
	...route,
	...autorizacion,
	...afiliadoDatos,	
	...afiliadoDomicilios,
	...afiliadosContactos,
	...afiliadoDocumentacion,	
	...parentescos,
	...planes,
	...tipoDocumento,
	...estadosCiviles,
	...nacionalidades,
	...provincias,
	...localidades,
];

if (process.env.NODE_ENV !== "production") {
	mdw = [...mdw, logger];
}

const initialData = {};

export const store = createStore(reducers, initialData, composeEnhancers(applyMiddleware(...mdw)));
