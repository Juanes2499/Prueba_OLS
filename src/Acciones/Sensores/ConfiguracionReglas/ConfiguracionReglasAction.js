import { createAxiosInstanceSensores } from '../../../Shared/helper';
import history from '../../../Shared/createHistory';

export const ConfiguracionReglasActionAction_ConsultarRegla = (json) => {

    let data = {
        "seleccionar":"",
        "condicion": json ? json : {},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/reglasNodoSensor/get'

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

export const ConfiguracionReglasAction_ConsultarVariables = () => {

    let data = {
        "seleccionar":"DISTINCT NOMBRE_VARIABLE AS value, NOMBRE_VARIABLE AS label",
        "condicion":{},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/reglasNodoSensor/variablesNodoSensor/get'

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

export const ConfiguracionReglasActionAction_CrearRegla = (data) => {

    const endpoint = '/api/reglasNodoSensor'

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

export const ConfiguracionReglasActionAction_ActualizarRegla = (data) => {

    const endpoint = '/api/reglasNodoSensor'

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

export const ConfiguracionReglasActionAction_EliminarRegla = (data) => {

    const endpoint = '/api/reglasNodoSensor/delete'

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