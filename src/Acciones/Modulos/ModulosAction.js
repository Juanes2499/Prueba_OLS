import { createAxiosInstance } from '../../Shared/helper';
import history from '../../Shared/createHistory';

export const ModulosAction_ConsultarModulos = (json) => {

    let data = {
        "seleccionar":"",
        "condicion": json ? json : {},
        "agrupar":"",
        "ordenar":""
    }

    const endpoint = '/api/modulos/get'

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

export const ModulosAction_CrearModulo = (data) => {

    const endpoint = '/api/modulos'

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

export const ModulosAction_ActualizarModulo = (data) => {

    const endpoint = '/api/modulos'

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

export const ModulosAction_EliminarModulo = (data) => {

    const endpoint = '/api/modulos/delete'

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