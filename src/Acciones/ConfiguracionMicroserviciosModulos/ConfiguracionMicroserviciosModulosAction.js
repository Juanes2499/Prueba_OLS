import { createAxiosInstance } from '../../Shared/helper';
import history from '../../Shared/createHistory';

export const ConfiguracionMicroserviciosModulosAction_ConsultarConfiguracion = (json) => {

    let data = {
        "seleccionar":"",
        "condicion": json ? json : {},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/configuracion_microservicio_modulos/get'

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

export const ConfiguracionMicroserviciosModulosAction_ConsultarMicrosevicios = () => {

    let data = {
        "seleccionar":"DISTINCT NOMBRE_MICROSERVICIO AS value, ALIAS_MICROSERIVICIO AS label",
        "condicion":{},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/configuracion_microservicio_modulos/microservicios/get'

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

export const ConfiguracionMicroserviciosModulosAction_ConsultarModulos = () => {

    let data = {
        "seleccionar":"DISTINCT NOMBRE_MODULO AS value, ALIAS_MODULO AS label",
        "condicion":{},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/configuracion_microservicio_modulos/modulos/get'

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

export const ConfiguracionMicroserviciosModulosAction_CrearConfiguracion = (data) => {

    const endpoint = '/api/configuracion_microservicio_modulos'

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

export const ConfiguracionMicroserviciosModulosAction_EliminarConfiguracion = (data) => {

    const endpoint = '/api/configuracion_microservicio_modulos/delete'

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