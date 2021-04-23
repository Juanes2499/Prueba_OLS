import { createAxiosInstance } from '../../Shared/helper';
import {store} from '../../firebaseconfig';
import { get } from 'lodash';

export const UsuariosAction_ConsultarUsuarios = () => {

    return new Promise((resolve, reject) => {

    store.collection('usuarios').get()
        .then((doc) => {
            const arrayData = doc.docs.map(i => ({ID: i.id,...i.data()}))
            return resolve(arrayData)
        })
        .catch((err) => {
            console.log(err);
            return reject(false)
        })
    })
}

export const UsuariosAction_actualizarUsuarios = (data) => {
    
    let json = data

    return new Promise((resolve, reject) => {
        store.collection('usuarios').doc(json.ID).update(json)
            .then(() => resolve(true))
            .catch((err) => {
                console.log(err);
                return reject(err)
            })
    })
}


export const UsuariosAction_FiltrarUsuarios = (data) => {

    
    let dataUsuarios = {
        "seleccionar":"",
        "condicion": data,
        "agrupar":"",
        "ordenar":""
    }
    
    const endpoint = '/api/usuarios/get'
    
    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().post(endpoint, dataUsuarios)
                .then(Response => {
                    return resolve(Response.data)
                }).catch(err => {
                    return reject(err)
                })
        }catch{
           
        }
    })
}

export const UsuariosAction_CrearUsuarios = (data) => {

    let json = data

    return new Promise((resolve, reject) => {

    store.collection('usuarios').add(json)
        .then(() => resolve(true))
        .catch((err) => {
            console.log(err);
            return reject(err)
        })
    })

}

export const UsuariosAction_EliminarUsuarios = (data) => {

    let json = data

    console.log(data)

    return new Promise((resolve, reject) => {

    store.collection('usuarios').doc(json.ID).delete()
        .then(() => resolve(true))
        .catch((err) => {
            console.log(err);
            return reject(err)
        })
    })
}