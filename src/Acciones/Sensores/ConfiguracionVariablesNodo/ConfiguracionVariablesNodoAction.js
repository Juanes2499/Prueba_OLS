import { createAxiosInstanceSensores } from '../../../Shared/helper';
import history from '../../../Shared/createHistory';

export const ConfiguracionVariablesNodoAction_ConsultarConfiguracion = (json) => {

    let data = {
        "seleccionar":"",
        "condicion": json ? json : {},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/configuracionVariablesNodoSensor/get'

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

export const ConfiguracionVariablesNodoAction_ConsultarVariables = () => {

    let data = {
        "seleccionar":"DISTINCT NOMBRE_VARIABLE AS value, NOMBRE_VARIABLE AS label",
        "condicion":{},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/configuracionVariablesNodoSensor/variablesNodoSensor/get'

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

export const ConfiguracionVariablesNodoAction_CrearConfiguracion = (data) => {

    const endpoint = '/api/configuracionVariablesNodoSensor'

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

export const ConfiguracionVariablesNodoAction_EliminarConfiguracion = (data) => {

    const endpoint = '/api/configuracionVariablesNodoSensor/delete'

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