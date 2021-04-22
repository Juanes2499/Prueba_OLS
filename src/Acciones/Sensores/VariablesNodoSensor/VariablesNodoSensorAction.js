import { createAxiosInstanceSensores } from '../../../Shared/helper';
import history from '../../../Shared/createHistory';

export const VariablesNodoSensoresAction_ConsultarVariables = (json) => {

    let data = {
        "seleccionar":"",
        "condicion": json ? json : {},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/variablesNodoSensor/get'

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

export const VariablesNodoSensoresAction_CrearVariables = (data) => {

    const endpoint = '/api/variablesNodoSensor'

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

export const VariablesNodoSensoresAction_ActualizarVariables = (data) => {

    const endpoint = '/api/variablesNodoSensor'

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

export const VariablesNodoSensoresAction_EliminarVariables = (data) => {

    const endpoint = '/api/variablesNodoSensor/delete'

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