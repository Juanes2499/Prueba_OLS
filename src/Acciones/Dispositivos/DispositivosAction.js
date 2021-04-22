import { createAxiosInstance } from '../../Shared/helper';
import history from '../../Shared/createHistory';

export const DispositivosAction_ConsultarDispositivos = (json) => {

    let data = {
        "microservicio_interes":"GLOBAL",
        "modulo_interes":"GLOBAL",
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
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const DispositivosAction_ConsultarMicrosevicios = () => {

    let data = {
        "microservicio_interes":"GLOBAL",
        "modulo_interes":"GLOBAL",
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
                    console.log(err.response)
                    return reject(err)
                })
        }catch{
            history.push('/Home');
        }
    })
}

export const DispositivosAction_CrearDispositivos = (data) => {

    data.microservicio_interes = "GLOBAL";
    data.modulo_interes = "GLOBAL";

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

export const DispositivosAction_ActualizarDispositivos = (data) => {

    data.microservicio_interes = "GLOBAL";
    data.modulo_interes = "GLOBAL";

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

export const DispositivosAction_EliminarDispositivos = (data) => {

    data.microservicio_interes = "GLOBAL";
    data.modulo_interes = "GLOBAL";

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

export const DispositivosAction_EstadoContrasenaDispositivo = (data) => {

    data.microservicio_interes = "GLOBAL";
    data.modulo_interes = "GLOBAL";

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

export const DispositivosAction_SolicitarCambioContrasena = (data) => {

    data.microservicio_interes = "GLOBAL";
    data.modulo_interes = "GLOBAL";

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

export const DispositivosAction_CambiarContrasenaDispositivo = (data) => {

    data.microservicio_interes = "GLOBAL";
    data.modulo_interes = "GLOBAL";

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

export const DispositivosAction_CambiarTokenDispositivo = (data) => {

    data.microservicio_interes = "GLOBAL";
    data.modulo_interes = "GLOBAL";

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