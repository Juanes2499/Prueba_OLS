import React, {Component} from 'react'
import { Schema, Grid, Row, Col  } from 'rsuite';
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
                name: "ID",
                label: "ID",
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
                name: "NUMERO_DOC_ID",
                label: "Identificación (C.C)",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newFormModal = this.state.FormModal;
                    newFormModal[3].valueState = data;
                    this.setState({FormModal: newFormModal});
                },
            },
            {
                name: "ROL",
                label: "Rol asociado",
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
                name: "TELEFONO",
                label: "Teléfono",
                type: "number",
                dataEntryType:'input',
                readOnly: false,
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
            },
        ],
        formFilter:[
            {
                name: "NOMBRES",
                label: "Nombres",
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
                name: "APELLIDOS",
                label: "Apellidos",
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
                name: "NUMERO_DOC_ID",
                label: "Identidicación (C.C)",
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
                name: "ROL",
                label: "Rol asociado",
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
                name: "ESTADO",
                label: "Estado",
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
                name: "TELEFONO",
                label: "Teléfono",
                type: "text",
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
                name: "EMAIL",
                label: "Email",
                type: "email",
                dataEntryType:'input',
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
                name: "NUMERO_DOC_ID",
                label: "Identificación (C.C)",
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
                name: "ROL",
                label: "Rol asociado",
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
                name: "TELEFONO",
                label: "Teléfono",
                type: "text",
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
                name: "EMAIL",
                label: "Correo electrónico",
                type: "email",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[5].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            },
            {
                name: "PASSWORD",
                label: "Contraseña",
                type: "email",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let UserModal = this.state.newUserModal;
                    UserModal[6].valueState = data;
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
                    UserModal[7].valueState = data;
                    this.setState({newUserModal: UserModal});
                },
            }
        ]
    };

    columnasDataTable = [
        {
            key: "NOMBRES",
            text: "Nombres",
            width: 190,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "APELLIDOS",
            text: "Apellidos",
            width: 190,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "NUMERO_DOC_ID",
            text: "Identificación (C.C)",
            width: 150,
            align: "center",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "ROL",
            text: "Rol asociado",
            width: 150,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "ACTIVO",
            text: "Estado",
            width: 100,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "TELEFONO",
            text: "Teléfono",
            width: 150,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "EMAIL",
            text: "Correo electrónico",
            width: 190,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        }
    ]

    bottonsActionsTable = {
        dataKey: 'ID',
        actions: [
            {
                appearance: "subtle",
                nameIcon: 'fas fa-trash-alt',
                onClick: (data, dataKey) => {
                    let dataJson = {};
                    dataJson['ID'] = data.ID;
                    this.setState({
                        showConfirmacion: true,
                        tituloConfirmacion: 'Eliminar usuario',
                        cuerpoConfirmacion: `La operación no es reversible una vez confirmada ¿Desea eliminar el/la usaurio: ${data.NOMBRES} ${data.APELLIDOS}?`,
                        handleAceptarConfirmacion: () => {
                            UsuariosAction_EliminarUsuarios(dataJson)
                            .then(() => {
                                Notify('success','Usuario eliminado',`El/la usuario: ${data.NOMBRES} ${data.APELLIDOS} ha sido eliminado existosamente`)
                                this.setState({dataActualizada: true})
                                this.setState({showConfirmacion: false})
                            }).catch(() => {
                                Notify('error','Usuario no eliminado',`El/la usuario: ${data.NOMBRES} ${data.APELLIDOS} no ha podido ser eliminado, comunicarse con el área de TI`)
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

                    console.log(data)

                    let newFormModal = this.state.FormModal;
                    newFormModal[0].valueState = data.ID
                    newFormModal[1].valueState = data.NOMBRES
                    newFormModal[2].valueState = data.APELLIDOS
                    newFormModal[3].valueState = data.NUMERO_DOC_ID
                    newFormModal[4].valueState = data.ROL
                    newFormModal[5].valueState = data.TELEFONO
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
                
                let updateUsuario = this.state.FormModal;

                let nullFields = [];

                updateUsuario.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }else{
                        dataJson[`${x.name.toUpperCase()}`] = x.valueState
                    }
                })

                console.log(dataJson)
            
                if(nullFields.length > 0){
                    Notify('warning','Problema actualizando usuario',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    UsuariosAction_actualizarUsuarios(dataJson).then(() => {
                        Notify('success','Usuario actualizado',`El Usuario ${updateUsuario[0].valueState} ${updateUsuario[1].valueState} sido actualizado existosamente`)
                        this.setState({dataActualizada: true})
                        updateUsuario.forEach(x => {
                            x.valueState = ''
                        })
                        this.setState({activateModal: false});
                    }).catch((err) => {
                        Notify('error','Usuario no actualizado',`Ha ocurrido un error actualizado el usuario`)
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
            label: "Crear",
            style:{width:100, backgroundColor:'#1d43ad'},
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
                dataJson['NOMBRES'] = newUserModalNewUser[0].valueState;
                dataJson['APELLIDOS'] = newUserModalNewUser[1].valueState;
                dataJson['NUMERO_DOC_ID'] = newUserModalNewUser[2].valueState;
                dataJson['ROL'] = newUserModalNewUser[4].valueState;
                dataJson['TELEFONO'] = newUserModalNewUser[4].valueState;
                dataJson['EMAIL'] = newUserModalNewUser[5].valueState;
                dataJson['PASSWORD'] = newUserModalNewUser[6].valueState;
                dataJson['ACTIVO'] = newUserModalNewUser[7].valueState;

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

    closeModal = () => {
        this.setState({activateModal: false})
    }

    closeModalNewUser = () => {
        this.setState({activateModalNewUser: false})
    }
    
    componentDidMount = () => {
        UsuariosAction_ConsultarUsuarios()
            .then(result => {
                this.setState({dataUsuario: result})
        }).catch((err) => {
            Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
        })
    }

    componentDidUpdate = () => {
        if(this.state.dataActualizada === true){
            UsuariosAction_ConsultarUsuarios()
                .then(result => {
                    this.setState({dataUsuario: result})
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
                    <Row>
                        <Col className="rs-col-lg-18 rs-col-md-18 rs-col-xs-24 fixed">
                            <div className="">
                                <DataTableColAction 
                                    key={this.state.dataUsuario.id} 
                                    configuration={configTable} 
                                    nameTable='Usuarios existentes'
                                    iconTable='fas fa-users fa-2x'
                                    data={this.state.dataUsuario} 
                                    columns={this.columnasDataTable} 
                                    handleOnRowClick={this.dataSeleccionado}
                                    buttonsHeader={this.bottonsHeaderFilter}
                                    buttonActions={this.bottonsActionsTable}
                                />
                            </div>
                        </Col>

                        <Col>
                            <div className="rs-col-lg-6 rs-col-md-6 rs-col-xs-6 fixed">
                                <Filter
                                    key={2}
                                    titleHeader='Filtrar busqueda'
                                    iconFilter='fas fa-search fa-2x'
                                    bottonsHeader={this.bottonsHeaderFilter}
                                    formFilter={this.state.formFilter}
                                    configuration={configFilter}
                                    actions={this.bottonsFooterFilter}
                                />
                            </div>
                        </Col>
                    </Row>
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
                    tittleModal={'Agregar nuevo usuario'}
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
