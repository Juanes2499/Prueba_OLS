import React, {Component} from 'react'
import { Schema } from 'rsuite';
import '../global.css'

//global
import {configTable} from '../global';

//Action
import {
    UsuariosAction_ConsultarUsuarios, 
    UsuariosAction_actualizarUsuarios, 
    UsuariosAction_FiltrarUsuarios, 
    UsuariosAction_CrearUsuarios, 
    UsuariosAction_EliminarUsuarios
} from '../../../../Acciones/Usuarios/UsuariosAction';

//Elementos
import {DataTableColAction} from '../../../Elements/DataTable/DataTable';
import Filter from '../../../Elements/Filter/Filter';
import {Notify} from '../../../Elements/Notify/Notify';
import {Confirmation} from '../../../Elements/Confirmation/Confirmation';

//Modals
import ShowEditDataForm from '../../../Modals/showEditDataForm/ShowEditDataForm';

//Configuration filter 
const configFilter ={
    cellHeight:70,
    cols:3,
    styleIconSummary:{
        color:'white'
    },
    styleLabelSummary: {
        color: 'rgb(255,255,255)',
        fontFamily: "Roboto",
        fontWeight: 'bold',
        fontSize: '150%',
    },
    styleAccordionSummary: {
        backgroundColor:'rgba(17, 0, 94, 0.808)', 
        borderRadius:'5px'
    }
}

//Schema modal Form
const { StringType } = Schema.Types;

const modelSchemaModal = Schema.Model({
    email: StringType()
        .isEmail('Por favor ingresar un dirección de correo valido')
        .isRequired('Este campo es requerido'),
    password: StringType().isRequired('Este campo es requerido'),
});

const modelSchemaModalNewUsuario = Schema.Model({
    NOMBRES: StringType().isRequired('Este campo es requerido'),
    APELLIDOS: StringType().isRequired('Este campo es requerido'),
    TIPO_DOC_ID: StringType().isRequired('Este campo es requerido'),
    NUMERO_DOC_ID: StringType().isRequired('Este campo es requerido'),
    EMAIL: StringType()
        .isEmail('Por favor ingresar un dirección de correo valido')
        .isRequired('Este campo es requerido'),
});


class Usuarios extends Component {

    state = {
        dataUsuario: [],
        activateModal: false,
        activateModalNewUser: false,
        dataSeleccionado: {},
        dataActualizada: false,
        showConfirmacion: false,
        tituloConfirmacion:'', 
        cuerpoConfirmacion:'',
        handleAceptarConfirmacion:()=>{

        },        
        FormModal : [
            {
                name: "ID_USUARIO",
                label: "ID Usuario",
                type: "text",
                dataEntryType:'input',
                readOnly: true,
                valueState: '',
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[0].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            },
            {
                name: "NOMBRES",
                label: "Nombres",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[1].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            },
            {
                name: "APELLIDOS",
                label: "Apellidos",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[2].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            },
            {
                name: "TIPO_DOC_ID",
                label: "Tipo Documento",
                type: "text",
                dataEntryType:'input',
                readOnly: true,
                valueState: '',
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[3].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            },
            {
                name: "NUMERO_DOC_ID",
                label: "Número Documento",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[4].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            },
            {
                name: "EMAIL",
                label: "Email",
                type: "email",
                dataEntryType:'input',
                readOnly: true,
                valueState: '',
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[5].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            },
            {
                name: "ACTIVO",
                label: "Usuario Activo",
                type: "toggle",
                dataEntryType:'toggle',
                readOnly: false,
                valueState: false,
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[6].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            }
        ],
        formFilter:[
            {
                name: "ID_USUARIO",
                label: "ID Usuario",
                type: "text",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[0].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[0].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "NOMBRES",
                label: "Nombres",
                type: "text",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[1].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[1].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "APELLIDOS",
                label: "Apellidos",
                type: "text",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[2].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[2].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "TIPO_DOC_ID",
                label: "Tipo Documento",
                type: "text",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[3].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[3].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "NUMERO_DOC_ID",
                label: "Número Documento",
                type: "text",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[4].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[4].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "EMAIL",
                label: "Email",
                type: "email",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[5].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[5].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "FECHA_CREACION",
                label: "Fecha Creación",
                type: "date",
                dataEntryType:'datePicker',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[6].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[6].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "HORA_CREACION",
                label: "Hora Creación",
                type: "time",
                dataEntryType:'timepicker',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[7].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[7].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "FECHA_ACTUALIZACION",
                label: "Fecha Actualización",
                type: "date",
                dataEntryType:'datePicker',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[8].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[8].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "HORA_ACTUALIZACION_FILTER",
                label: "Hora Actualización",
                type: "time",
                dataEntryType:'timepicker',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[9].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[9].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            }
        ],
        newUserModal:[
            {
                name: "NOMBRES",
                label: "Nombres",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[0].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            },
            {
                name: "APELLIDOS",
                label: "Apellidos",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[1].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            },
            {
                name: "TIPO_DOC_ID",
                label: "Tipo Documento",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[2].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            },
            {
                name: "NUMERO_DOC_ID",
                label: "Número Documento",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[3].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            },
            {
                name: "EMAIL",
                label: "Email",
                type: "email",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[4].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            },
            {
                name: "ACTIVO",
                label: "Usuario Activo",
                type: "toggle",
                dataEntryType:'toggle',
                readOnly: false,
                valueState: false,
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[5].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            }
        ]
    };

    columnasDataTable = [
        {
            key: "ID_USUARIO",
            text: "ID Usuario",
            width: 300,
            align: "left",
            fixed: true,
            resizable: true,
            sortable: true
        },
        {
            key: "NOMBRES",
            text: "Nombres",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "APELLIDOS",
            text: "Apellidos",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "TIPO_DOC_ID",
            text: "Tipo Documento",
            width: 150,
            align: "center",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "NUMERO_DOC_ID",
            text: "Número Documento",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "EMAIL",
            text: "Email",
            width: 300,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "FECHA_CREACION",
            text: "Fecha Creación",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "HORA_CREACION",
            text: "Hora Creación",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "FECHA_ACTUALIZACION",
            text: "Fecha Actualización",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "HORA_ACTUALIZACION",
            text: "Hora Actualización",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
    ]

    bottonsActionsTable = {
        dataKey: 'ID_USUARIO',
        actions: [
            {
                appearance: "subtle",
                nameIcon: 'fas fa-trash-alt',
                onClick: (data, dataKey) => {
                    let dataJson = {};
                    dataJson['id_usuario'] = data.ID_USUARIO;
                    this.setState({
                        showConfirmacion: true,
                        tituloConfirmacion: 'Eliminar usuario',
                        cuerpoConfirmacion: `La operación no es reversible una vez confirmada ¿Desea eliminar el usaurio: ${data.NOMBRES} ${data.APELLIDOS} con ID USUARIO: ${data.ID_USUARIO} ?`,
                        handleAceptarConfirmacion: () => {
                            UsuariosAction_EliminarUsuarios(dataJson).then(() => {
                                Notify('success','Usuario eliminado',`El usuario: ${data.NOMBRES} ${data.APELLIDOS} con ID USUARIO: ${data.ID_USUARIO} ha sido eliminado existosamente`)
                                this.setState({dataActualizada: true})
                                this.setState({showConfirmacion: false})
                            }).catch(() => {
                                Notify('error','Usuario no eliminado',`El usuario: ${data.NOMBRES} ${data.APELLIDOS} con ID USUARIO: ${data.ID_USUARIO} no ha podido ser eliminado, comunicarse con el área de TI`)
                            })
                        }
                    }) 
                },
            },
            {
                appearance: "subtle",
                nameIcon: 'fas fa-edit',
                onClick: (data, dataKey) => {
                    this.setState({activateModal: true})
                    this.setState({dataSeleccionado: data})

                    let newFormModal = this.state.FormModal;
                    newFormModal[0].valueState = data.ID_USUARIO
                    newFormModal[1].valueState = data.NOMBRES
                    newFormModal[2].valueState = data.APELLIDOS
                    newFormModal[3].valueState = data.TIPO_DOC_ID
                    newFormModal[4].valueState = data.NUMERO_DOC_ID
                    newFormModal[5].valueState = data.EMAIL
                    newFormModal[6].valueState = data.ACTIVO

                    this.setState({FormModal: newFormModal});
                },
            }
        ]
    }

    bottonsFooterModal = [
        {
            labelButton: "Actualizar",
            color: "yellow",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-user-edit',
            onClick: () => {
                
                let dataJson = {};
                
                let updateFormModal = this.state.FormModal;
                dataJson['id_usuario'] = updateFormModal[0].valueState;
                dataJson['nombres'] = updateFormModal[1].valueState;
                dataJson['apellidos'] = updateFormModal[2].valueState;
                dataJson['tipo_doc_id'] = updateFormModal[3].valueState;
                dataJson['numero_doc_id'] = updateFormModal[4].valueState;
                dataJson['email'] = updateFormModal[5].valueState;
                dataJson['activo'] = updateFormModal[6].valueState;
                dataJson['password'] = null;

                let nullFields = [];

                updateFormModal.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }
                    
                })
                
                if(nullFields.length > 0){
                    Notify('warning','Problema actualizando usuario',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    UsuariosAction_actualizarUsuarios(dataJson).then(() => {
                        Notify('success','Usuario creado',`El usuario: ${updateFormModal[1].valueState} ${updateFormModal[2].valueState} con correo electrónico: ${updateFormModal[5].valueState} ha sido actualizado existosamente`)
                        this.setState({dataActualizada: true})
                        updateFormModal[0].valueState = '';
                        updateFormModal[1].valueState = '';
                        updateFormModal[2].valueState = '';
                        updateFormModal[3].valueState = '';
                        updateFormModal[4].valueState = '';
                        updateFormModal[5].valueState = '';
                        updateFormModal[6].valueState = '';
                        this.setState({FormModal: updateFormModal});
                        this.closeModal();
                    }).catch(() => {
                        Notify('error','Usuario no creado',`El usuario: ${updateFormModal[1].valueState} ${updateFormModal[2].valueState} con correo electrónico: ${updateFormModal[5].valueState} no ha podido ser actualizado correctamente, comunicarse con el área de TI`)
                    })
                }
            },
        }
    ]

    bottonsFooterFilter = [
        {
            labelButton: "Limpiar campos",
            color: "blue",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-eraser',
            onClick: () => {

                let newFormFilter = this.state.formFilter;
                
                newFormFilter.forEach(x => {
                    x.valueState = '';
                })

                this.setState({formFilter: newFormFilter});   
                
                UsuariosAction_ConsultarUsuarios()
                    .then(result => {
                        this.setState({dataUsuario: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    }).catch((err) => {
                        Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
                    })
            },
        },
        {
            labelButton: "Consultar",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-search',
            onClick: () => {
        
                let dataJsonObject = {}
                
                let newFormFilter = this.state.formFilter;
                
                let i = 0;
                newFormFilter.forEach(x => {
                    if(x.valueState !== ''){
                        dataJsonObject[`${x.name}`] = {
                            conector_logico: i === 0 ? '' : x.operador.filter(i => i.includes('_'))[0].replace("_",""),
                            operador: x.operador.filter(i => !i.includes('_'))[0],
                            valor_condicion: x.valueState
                        }
                        i += 1;
                    }
                })
            
                UsuariosAction_FiltrarUsuarios(dataJsonObject).then(result => {
                    this.setState({dataUsuario: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                }).catch((err) => {
                    Notify('warning','No existen conincidencias',`Con las condiciones establecidas en los parámetros no se encontraron datos.`)
                })
            }
        },
    ]

    bottonsHeaderFilter = [
        {
            labelButton: "",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-plus',
            onClick: () => {
                this.setState({activateModalNewUser: true})
            }
        },
    ]

    bottonsFooterModalNewUser = [
        {
            labelButton: "Crear Usuario",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-plus',
            onClick: () => {
                
                let dataJson = {};
                
                let newUserModalNewUser = this.state.newUserModal;
                dataJson['nombres'] = newUserModalNewUser[0].valueState;
                dataJson['apellidos'] = newUserModalNewUser[1].valueState;
                dataJson['tipo_doc_id'] = newUserModalNewUser[2].valueState;
                dataJson['numero_doc_id'] = newUserModalNewUser[3].valueState;
                dataJson['email'] = newUserModalNewUser[4].valueState;
                dataJson['activo'] = newUserModalNewUser[5].valueState;

                let nullFields = [];

                newUserModalNewUser.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }
                    
                })
                
                if(nullFields.length > 0){
                    Notify('warning','Problema creando usuario',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    UsuariosAction_CrearUsuarios(dataJson).then(() => {
                        Notify('success','Usuario creado',`El usuario: ${newUserModalNewUser[0].valueState} ${newUserModalNewUser[1].valueState} con correo electrónico: ${newUserModalNewUser[4].valueState} ha sido creado existosamente`)
                        this.setState({dataActualizada: true})
                        newUserModalNewUser[0].valueState = '';
                        newUserModalNewUser[1].valueState = '';
                        newUserModalNewUser[2].valueState = '';
                        newUserModalNewUser[3].valueState = '';
                        newUserModalNewUser[4].valueState = '';
                        newUserModalNewUser[5].valueState = '';
                        newUserModalNewUser[6].valueState = '';
                        this.setState({newUserModal: newUserModalNewUser});
                    }).catch(() => {
                        
                        Notify('error','Usuario no creado',`El usuario: ${newUserModalNewUser[0].valueState} ${newUserModalNewUser[1].valueState} con correo electrónico: ${newUserModalNewUser[4].valueState} no ha podido ser creado correctamente, comunicarse con el área de TI`)
                    })
                }
            },
        }
    ]


    dataSeleccionado = (data) => {
        this.setState({activateModal: true})
        this.setState({dataSeleccionado: data})

        let newFormModal = this.state.FormModal;
        newFormModal[0].valueState = data.ID_USUARIO
        newFormModal[1].valueState = data.NOMBRES
        newFormModal[2].valueState = data.APELLIDOS
        newFormModal[3].valueState = data.TIPO_DOC_ID
        newFormModal[4].valueState = data.NUMERO_DOC_ID
        newFormModal[5].valueState = data.EMAIL
        newFormModal[6].valueState = data.ACTIVO
        this.setState({FormModal: newFormModal});
    }

    closeModal = () => {
        this.setState({activateModal: false})
    }

    closeModalNewUser = () => {
        this.setState({activateModalNewUser: false})
    }
    
    componentDidMount = () => {
        UsuariosAction_ConsultarUsuarios()
            .then(result => {
                this.setState({dataUsuario: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
        }).catch((err) => {
            Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
        })
    }

    componentDidUpdate = () => {
        if(this.state.dataActualizada === true){
            UsuariosAction_ConsultarUsuarios()
                .then(result => {
                    this.setState({dataUsuario: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    this.setState({dataActualizada: false})    
                }).catch((err) => {
                    Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
                })
        }
    }

    render() {
        return (
            <div>
                <div className='container-global'>
                    <Filter
                        key={2}
                        titleHeader='Usuarios'
                        bottonsHeader={this.bottonsHeaderFilter}
                        formFilter={this.state.formFilter}
                        configuration={configFilter}
                        actions={this.bottonsFooterFilter}
                    />
                    <br/>
                    <DataTableColAction 
                        key={this.state.dataUsuario.id} 
                        configuration={configTable} 
                        data={this.state.dataUsuario} 
                        columns={this.columnasDataTable} 
                        handleOnRowClick={this.dataSeleccionado}
                        buttonActions={this.bottonsActionsTable}
                    />
                </div>
                <ShowEditDataForm
                    key={3}
                    layaout = "vertical"
                    isActivate={this.state.activateModal}
                    tittleModal={'Editar Usuario'}
                    handleClose={this.closeModal}
                    modelSchema={modelSchemaModal}
                    fields={this.state.FormModal}
                    bottonFooter={this.bottonsFooterModal}
                />
                <ShowEditDataForm
                    key={4}
                    layaout = "vertical"
                    isActivate={this.state.activateModalNewUser}
                    tittleModal={'Nuevo Usuario'}
                    handleClose={this.closeModalNewUser}
                    modelSchema={modelSchemaModalNewUsuario}
                    fields={this.state.newUserModal}
                    bottonFooter={this.bottonsFooterModalNewUser}
                />
                <Confirmation 
                    show={this.state.showConfirmacion}
                    titulo={this.state.tituloConfirmacion} 
                    cuerpo={this.state.cuerpoConfirmacion}  
                    handleClose={() => this.setState({showConfirmacion:false}) }
                    handleAceptar={this.state.handleAceptarConfirmacion}
                />
            </div>
        )
    }
}

export default Usuarios
