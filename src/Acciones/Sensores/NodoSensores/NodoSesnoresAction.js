
/*
import { createAxiosInstance } from '../../../Shared/helper';
import history from '../../../Shared/createHistory';

export const NodosSensoresAction_ConsultarDispositivos = (json) => {

    let data = {
        "microservicio_interes": window.MICROSERVICIO_INTERES,
        "modulo_interes": window.MODULO_ITERES,
        "seleccionar":"",
        "condicion": json ? json : {},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/dispositivos/get'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().post(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    console.log(err.response)
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const NodosSensoresAction_ConsultarMicrosevicios = () => {

    let data = {
        "microservicio_interes":  window.MICROSERVICIO_INTERES,
        "modulo_interes": window.MODULO_ITERES,
        "seleccionar":"DISTINCT NOMBRE_MICROSERVICIO AS value, ALIAS_MICROSERIVICIO AS label",
        "condicion":{},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/dispositivos/microservicios/get'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().post(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const NodosSensoresAction_CrearDispositivos = (data) => {

    data.microservicio_interes =   window.MICROSERVICIO_INTERES;
    data.modulo_interes =  window.MODULO_ITERES;

    const endpoint = '/api/dispositivos'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().post(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const NodosSensoresAction_ActualizarDispositivos = (data) => {

    data.microservicio_interes =   window.MICROSERVICIO_INTERES;
    data.modulo_interes =  window.MODULO_ITERES;

    const endpoint = '/api/dispositivos'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().put(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const NodosSensoresAction_EliminarDispositivos = (data) => {

    data.microservicio_interes =   window.MICROSERVICIO_INTERES;
    data.modulo_interes =  window.MODULO_ITERES;

    const endpoint = '/api/dispositivos/delete'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().post(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const NodosSensoresAction_EstadoContrasenaDispositivo = (data) => {

    data.microservicio_interes =   window.MICROSERVICIO_INTERES;
    data.modulo_interes =  window.MODULO_ITERES;

    const endpoint = '/api/dispositivos/validarEstadoContrasena'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().post(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const NodosSensoresAction_SolicitarCambioContrasena = (data) => {

    data.microservicio_interes =   window.MICROSERVICIO_INTERES;
    data.modulo_interes =  window.MODULO_ITERES;

    const endpoint = '/api/dispositivos/solicitarCambioContrasena'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().post(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const NodosSensoresAction_CambiarContrasenaDispositivo = (data) => {

    data.microservicio_interes =   window.MICROSERVICIO_INTERES;
    data.modulo_interes =  window.MODULO_ITERES;

    const endpoint = '/api/dispositivos/actualizarContrasena'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().post(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const NodosSensoresAction_CambiarTokenDispositivo = (data) => {

    data.microservicio_interes =   window.MICROSERVICIO_INTERES;
    data.modulo_interes =  window.MODULO_ITERES;

    const endpoint = '/api/dispositivos/actualizarTokenDispositivo'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().post(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}
*/

import { createAxiosInstanceSensores } from '../../../Shared/helper';
import history from '../../../Shared/createHistory';

export const NodoSensoresAction_ConsultarNodos = (json) => {

    let data = {
        "seleccionar":"",
        "condicion": json ? json : {},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/nodoSensor/get'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstanceSensores().post(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const NodoSensoresAction_CrearNodo = (data) => {

    const endpoint = '/api/nodoSensor'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstanceSensores().post(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const NodoSensoresAction_ActualizarNodo = (data) => {

    const endpoint = '/api/nodoSensor'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstanceSensores().put(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const NodoSensoresAction_EliminarNodo = (data) => {

    const endpoint = '/api/nodoSensor/delete'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstanceSensores().post(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const NodosSensoresAction_CambiarTokenDispositivo = (data) => {

    const endpoint = '/api/nodoSensor/actualizarTokenNodoSensor'

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstanceSensores().put(endpoint, data)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}
