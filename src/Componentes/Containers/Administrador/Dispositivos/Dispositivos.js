import React, { Component } from 'react'
import { Schema } from 'rsuite';
import '../global.css'

//global
import {configTable} from '../global';

//Elementos
import { DataTable } from '../../../Elements/DataTable/DataTable';
import Filter from '../../../Elements/Filter/Filter';
import { Notify } from '../../../Elements/Notify/Notify';
import { Confirmation } from '../../../Elements/Confirmation/Confirmation';
import { ShowInformation } from '../../../Modals/ShowInformation/ShowInformation';

//Modals
import ShowEditDataForm from '../../../Modals/showEditDataForm/ShowEditDataForm';

//Actions
import { 
    DispositivosAction_ConsultarDispositivos,
    DispositivosAction_ConsultarMicrosevicios,
    DispositivosAction_CrearDispositivos,
    DispositivosAction_ActualizarDispositivos,
    DispositivosAction_EliminarDispositivos,
    DispositivosAction_EstadoContrasenaDispositivo,
    DispositivosAction_CambiarContrasenaDispositivo,
    DispositivosAction_SolicitarCambioContrasena,
    DispositivosAction_CambiarTokenDispositivo
} from '../../../../Acciones/Dispositivos/DispositivosAction';

//Schemas
const { StringType } = Schema.Types;
const schemaModalModulo = Schema.Model({
    NOMBRE_MODULO: StringType().isRequired('Este campo es requerido'),
    DETALLES: StringType().isRequired('Este campo es requerido'),
    URL_MODULO: StringType().isRequired('Este campo es requerido'),
    ALIAS_MODULO: StringType().isRequired('Este campo es requerido'),
    URL_ALIAS_MODULO: StringType().isRequired('Este campo es requerido'),
    ORDEN: StringType().isRequired('Este campo es requerido'),
    ICON_MODULO: StringType().isRequired('Este campo es requerido'),
});

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

export class Dispositivos extends Component {
    //Estados
    state = {
        //Estado para actulizar cuando se realice una acción
        dataActualizada: false,
        //Estados para cargar la data
        dataModulo: [],
        //Estados para el componente showDataEditForm
        showDataEditForm_show: false,
        showDataEditForm_title: '',
        showDataEditForm_schema: null,
        showDataEditForm_fields: [],
        showDataEditForm_bottonFooter:[],
        //Estado para el componente de confirmación
        showConfirmacion: false,
        tituloConfirmacion:'', 
        cuerpoConfirmacion:'',
        handleAceptarConfirmacion:()=>{},
        //Estado para el componente modal para mostrar información
        showInformacion: false,
        tituloInformacion:'', 
        cuerpoInformacion:'',
        buttonFooterInformacion: [],
        //Form para el filtro
        formFilter:[
            {
                name: "ID_DISPOSITIVO",
                label: "ID Dispositivo",
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
                name: "MARCA",
                label: "Marca",
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
                name: "REFERENCIA",
                label: "Referencia",
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
                name: "LATITUD",
                label: "Latitud",
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
                name: "LONGITUD",
                label: "Longitud",
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
                name: "NOMBRE_MICROSERVICIO",
                label: "Nombre Microservicio",
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
                name: "FECHA_CREACION",
                label: "Fecha Creación",
                type: "date",
                dataEntryType:'datepicker',
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
                dataEntryType:'datepicker',
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
                name: "HORA_ACTUALIZACION",
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
            },
        ],
        //Form para nuevo microservicio
        formNew:[
            {
                name: "MARCA",
                label: "Marca",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formNew;
                    form[0].valueState = data;
                    this.setState({formNew: form});
                },
            },
            {
                name: "REFERENCIA",
                label: "Referencia",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formNew;
                    form[1].valueState = data;
                    this.setState({formNew: form});
                },
            },
            {
                name: "LATITUD",
                label: "Latitud",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formNew;
                    form[2].valueState = data;
                    this.setState({formNew: form});
                },
            },
            {
                name: "LONGITUD",
                label: "Longitud",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formNew;
                    form[3].valueState = data;
                    this.setState({formNew: form});
                },
            },
            {
                name: "NOMBRE_MICROSERVICIO",
                label: "Alias Microservicio",
                type: "text",
                dataEntryType:'selectPicker',
                readOnly: false,
                valueState: '',
                dataPicker: [],
                placeHolderPicker:'Seleccionar',
                hadlerValueState: (data) => {
                    let newModal = this.state.formNew;
                    newModal[4].valueState = data;
                    this.setState({formNew: newModal});
                },
            },
            {
                name: "EMAIL_RESPONSABLE",
                label: "Email Responsable",
                type: "email",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formNew;
                    form[5].valueState = data;
                    this.setState({formNew: form});
                },
            }
        ],
        //Form para actualizar un registro
        formUpdate:[
            {
                name: "ID_DISPOSITIVO",
                label: "ID Dispositivo",
                type: "text",
                dataEntryType:'input',
                readOnly: true,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formUpdate;
                    form[0].valueState = data;
                    this.setState({formUpdate: form});
                },
            },
            {
                name: "MARCA",
                label: "Marca",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formUpdate;
                    form[1].valueState = data;
                    this.setState({formUpdate: form});
                },
            },
            {
                name: "REFERENCIA",
                label: "Referencia",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formUpdate;
                    form[2].valueState = data;
                    this.setState({formUpdate: form});
                },
            },
            {
                name: "LATITUD",
                label: "Latitud",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formUpdate;
                    form[3].valueState = data;
                    this.setState({formUpdate: form});
                },
            },
            {
                name: "LONGITUD",
                label: "Longitud",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formUpdate;
                    form[4].valueState = data;
                    this.setState({formUpdate: form});
                },
            },
            {
                name: "NOMBRE_MICROSERVICIO",
                label: "Alias Microservicio",
                type: "text",
                dataEntryType:'selectpicker',
                readOnly: false,
                valueState: '',
                dataPicker: [],
                placeHolderPicker:'Seleccionar',
                hadlerValueState: (data) => {
                    let form = this.state.formUpdate;
                    form[5].valueState = data;
                    this.setState({formUpdate: form});
                },
            },
            {
                name: "EMAIL_RESPONSABLE",
                label: "Email Responsable",
                type: "email",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formUpdate;
                    form[6].valueState = data;
                    this.setState({formUpdate: form});
                },
            },
            {
                name: "DISPOSITIVO_ACTIVO",
                label: "Dispositivo Activo",
                type: "toggle",
                dataEntryType:'toggle',
                readOnly: false,
                valueState: false,
                hadlerValueState: (data) => {
                    let form = this.state.formUpdate;
                    form[7].valueState = data;
                    this.setState({newUserModal: form});
                },
            }
        ],
        //Form para actualizar la contraseña
        formPassword:[
            {
                name: "ID_DISPOSITIVO",
                label: "ID Dispositivo",
                type: "text",
                dataEntryType:'input',
                readOnly: true,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formPassword;
                    form[0].valueState = data;
                    this.setState({formPassword: form});
                },
            },
            {
                name: "EMAIL_RESPONSABLE",
                label: "Email Responsable",
                type: "text",
                dataEntryType:'input',
                readOnly: true,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formPassword;
                    form[1].valueState = data;
                    this.setState({formPassword: form});
                },
            },
            {
                name: "NOMBRE_MICROSERVICIO",
                label: "Nombre Microservicio",
                type: "text",
                dataEntryType:'input',
                readOnly: true,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formPassword;
                    form[2].valueState = data;
                    this.setState({formPassword: form});
                },
            },
            {
                name: "OLD_PASSWORD",
                label: "Contraseña Anterior",
                type: "password",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formPassword;
                    form[3].valueState = data;
                    this.setState({formPassword: form});
                },
            },
            {
                name: "PASSWORD_AUTH",
                label: "Contraseña Nueva",
                type: "password",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formPassword;
                    form[4].valueState = data;
                    this.setState({formPassword: form});
                },
            },
            {
                name: "PASSWORD_AUTH_CONF",
                label: "Confirmación Contraseña Nueva",
                type: "password",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let form = this.state.formPassword;
                    form[5].valueState = data;
                    this.setState({formPassword: form});
                },
            },
        ]
    }

    //Arreglo de la configuración de la columnas de la tabla
    columnsDataTabe = [
        {
            key: "ID_DISPOSITIVO",
            text: "ID Dispositivo",
            width: 300,
            align: "left",
            fixed: true,
            resizable: true,
        },
        {
            key: "TOKEN",
            text: "Token",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "MARCA",
            text: "Marca",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "REFERENCIA",
            text: "Referencia",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "LATITUD",
            text: "Latitud",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "LONGITUD",
            text: "Longitud",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "ID_MICROSERVICIO",
            text: "ID Microservicio",
            width: 300,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "NOMBRE_MICROSERVICIO",
            text: "Nombre Microservicio",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "EMAIL_RESPONSABLE",
            text: "Email Responsable",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "DISPOSITIVO_ACTIVO",
            text: "Dispositivo Activo",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "FECHA_CREACION",
            text: "Fecha Creación",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "HORA_CREACION",
            text: "Hora Creación",
            width: 150,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "FECHA_ACTUALIZACION",
            text: "Fecha Actualización",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "HORA_ACTUALIZACION",
            text: "Hora Actualización",
            width: 150,
            align: "left",
            fixed: false,
            resizable: true,
        },
        // {
        //     key: "PASSWORD_ACTIVA",
        //     text: "Password Activa",
        //     width: 200,
        //     align: "left",
        //     fixed: false,
        //     resizable: true,
        // },
        // {
        //     key: "FECHA_ACTUALIZACION_PASSWORD",
        //     text: "Fecha Actulización Password",
        //     width: 300,
        //     align: "left",
        //     fixed: false,
        //     resizable: true,
        // },
        // {
        //     key: "HORA_ACTUALIZACION_PASSWORD",
        //     text: "Hora Actualización Password",
        //     width: 150,
        //     align: "left",
        //     fixed: false,
        //     resizable: true,
        // },
    ]

    //Arreglo de las acciones de los botones de la tabla
    bottonsActionsTable = {
        dataKey: 'ID_DISPOSITIVO',
        actions: [
            {
                appearance: "subtle",
                nameIcon: 'fas fa-trash-alt',
                onClick: (data, dataKey) => {
                    let dataJson = {};
                    dataJson['id_dispositivo'] = data.ID_DISPOSITIVO;
                    this.setState({
                        showConfirmacion: true,
                        tituloConfirmacion: 'Eliminar Dispositivo',
                        cuerpoConfirmacion: `La operación no es reversible una vez confirmada ¿Desea eliminar el Dispositivo: ${data.MARCA} - ${data.REFERENCIA} con ID: ${data.ID_DISPOSITIVO} ?`,
                        handleAceptarConfirmacion: () => {
                            DispositivosAction_EliminarDispositivos(dataJson).then(() => {
                                Notify('success','Módulo eliminado',`El Dispositivo: ${data.MARCA} - ${data.REFERENCIA} con ID: ${data.ID_DISPOSITIVO} ha sido eliminado existosamente`)
                                this.setState({dataActualizada: true})
                                this.setState({showConfirmacion: false})
                            }).catch(() => {
                                Notify('error','Dispositivo no eliminado',`El Dispositivo: ${data.MARCA} - ${data.REFERENCIA} con ID: ${data.ID_DISPOSITIVO} no ha podido ser eliminado, comunicarse con el área de TI`)
                            })
                        }
                    }) 
                },
            },
            {
                appearance: "subtle",
                nameIcon: 'fas fa-edit',
                onClick: (data, dataKey) => {

                    let updateForm = this.state.formUpdate;
                    updateForm[0].valueState = data.ID_DISPOSITIVO
                    updateForm[1].valueState = data.MARCA
                    updateForm[2].valueState = data.REFERENCIA
                    updateForm[3].valueState = data.LATITUD
                    updateForm[4].valueState = data.LONGITUD
                    updateForm[5].valueState = data.NOMBRE_MICROSERVICIO
                    updateForm[6].valueState = data.EMAIL_RESPONSABLE
                    updateForm[7].valueState = data.DISPOSITIVO_ACTIVO
                    this.setState({formUpdate: updateForm});

                    this.setState({
                        showDataEditForm_show: true,
                        showDataEditForm_title: 'Editar Módulo',
                        showDataEditForm_schema: schemaModalModulo,
                        showDataEditForm_fields: this.state.formUpdate,
                        showDataEditForm_bottonFooter: this.bottonsFooterModalUpdateModulo
                    })

                },
            },
            {
                appearance: "subtle",
                nameIcon: 'fas fa-key',
                onClick: (data, dataKey) => {

                    let passForm = this.state.formPassword;
                    passForm[0].valueState = data.ID_DISPOSITIVO
                    passForm[1].valueState = data.EMAIL_RESPONSABLE
                    passForm[2].valueState = data.NOMBRE_MICROSERVICIO

                    this.setState({formPassword: passForm});

                    let dataJson = {
                        id_dispositivo: data.ID_DISPOSITIVO,
                        email_responsable: data.EMAIL_RESPONSABLE
                    }

                    DispositivosAction_EstadoContrasenaDispositivo(dataJson)
                        .then((result) => {
                            if(result.invalidPassword === true){
                                Notify('warning','Estado contraseña dispositivo',`La contraseña del dispositivo esta desactivada. Si solicitó cambio de contraseña, revise su correo y escriba la contraseña que fue enviada para restablecer la contraseña del dispositivo. Si no ha llegado nada a su correo por favor comuniquese con el administrador de la plataforma.`)
                            }else if(result.invalidPassword === false){
                                Notify('warning','Estado contraseña dispositivo',`La contraseña del dispositivo esta activada. Si no recuerda la contraseña del dispositivo, por favor de clic en Cambiar Contraseña.`)
                            }
                        })

                    this.setState({
                        showDataEditForm_show: true,
                        showDataEditForm_title: 'Cambiar contraseña',
                        showDataEditForm_schema: schemaModalModulo,
                        showDataEditForm_fields: this.state.formPassword,
                        showDataEditForm_bottonFooter: this.bottonsFooterModalUpdatePassword
                    })

                },
            },
            {
                appearance: "subtle",
                nameIcon: 'fas fa-passport',
                onClick: (data, dataKey) => {

                    let dataJson = {};

                    dataJson['id_dispositivo'] = data.ID_DISPOSITIVO;
                    dataJson['email_responsable'] = data.EMAIL_RESPONSABLE;
                    dataJson['nombre_microservicio'] = data.NOMBRE_MICROSERVICIO;
                    dataJson['token'] = data.TOKEN;
                    dataJson['marca'] = data.MARCA;
                    dataJson['referencia'] = data.REFERENCIA;
                    dataJson['latitud'] = data.LATITUD;
                    dataJson['longitud'] = data.LONGITUD;

                    const el = document.createElement('textarea');
                    el.value = data.TOKEN;
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand('copy');
                    document.body.removeChild(el);
                    
                    this.setState({
                        showInformacion: true,
                        tituloInformacion: 'Token Dispositivo',
                        cuerpoInformacion: `El Token del dispositivo con ID: ${data.ID_DISPOSITIVO} ha sido copiado en el portapapeles. Si desea puede solicitar el cambio de token.`,
                        buttonFooterInformacion:[
                            {
                                labelButton: "Cambiar Token",
                                color: "red",
                                appearance: "subtle",
                                icon: true,
                                nameIcon: 'fas fa-exchange-alt',
                                onClick: () => {
                                    DispositivosAction_CambiarTokenDispositivo(dataJson).then(() => {
                                        Notify('success','Token actualizada',`El token para el dispositivo con ID: ${data.ID_DISPOSITIVO} ha sido actualizado exitosamente y ha sido envíado al correo del responsable.`)
                                        this.setState({dataActualizada: true})
                                        this.setState({showInformacion: false});
                                    }).catch((err) => {
                                        Notify('error','Token no actualizada',`${err.response.data.return}`)
                                    })
                                },
                            },
                        ]
                    }) 
                },
            }
        ]
    }

    //Arreglo de los botones de las acciones del header del filtro
    bottonsHeaderFilter = [
        // {
        //     labelButton: "",
        //     color: "green",
        //     appearance: "subtle",
        //     icon: true,
        //     nameIcon: 'fas fa-plus',
        //     onClick: () => {
        //         this.setState({
        //             showDataEditForm_show: true,
        //             showDataEditForm_title: 'Nuevo Dispositivo',
        //             showDataEditForm_schema: schemaModalModulo,
        //             showDataEditForm_fields: this.state.formNew,
        //             showDataEditForm_bottonFooter: this.bottonsFooterModalNewModulo
        //         })
        //     }
        // },
    ]

    //Arreglo de los botones de las acciones del footer del filtro
    bottonsFooterFilter = [
        {
            labelButton: "Limpiar campos",
            color: "blue",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-eraser',
            onClick: () => {

                let formFilter = this.state.formFilter;
                
                formFilter.forEach(x => {
                    x.valueState = '';
                })

                this.setState({formFilter: formFilter});    
                
                DispositivosAction_ConsultarDispositivos()
                    .then(result => {
                        this.setState({dataModulo: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
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
                
                let formFilter = this.state.formFilter;
                
                let i = 0;
                formFilter.forEach(x => {
                    if(x.valueState !== ''){
                        dataJsonObject[`${x.name}`] = {
                            conector_logico: i === 0 ? '' : x.operador.filter(i => i.includes('_'))[0].replace("_",""),
                            operador: x.operador.filter(i => !i.includes('_'))[0],
                            valor_condicion: x.valueState
                        }
                        i += 1;
                    }
                })
            
                DispositivosAction_ConsultarDispositivos(dataJsonObject)
                    .then(result => {
                        this.setState({dataModulo: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    }).catch((err) => {
                        Notify('warning','No existen conincidencias',`Con las condiciones establecidas en los parámetros no se encontraron datos.`)
                    })
            }
        },
    ]

    //Arreglo de los botones de las acciones del footer para nuevo registrp
    bottonsFooterModalNewModulo = [
        {
            labelButton: "Crear Dispositivo",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-plus',
            onClick: () => {
                
                let dataJson = {};
                
                let newReg = this.state.formNew;

                let nullFields = [];

                newReg.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }else{
                        dataJson[`${x.name.toLowerCase()}`] = x.valueState
                    }
                })
                
                if(nullFields.length > 0){
                    Notify('warning','Problema creando Dispositivo',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    DispositivosAction_CrearDispositivos(dataJson).then(() => {
                        Notify('success','Dispositivo creado',`El Dispositivo: ${newReg[0].valueState} - ${newReg[1].valueState} ha sido creado existosamente`)
                        this.setState({dataActualizada: true})
                        newReg.forEach(x => {
                            x.valueState = ''
                        })
                        this.setState({formNew: newReg});
                    }).catch((err) => {
                        Notify('error','Dispositivo no creado',`${err.response.data.return}`)
                    })
                }
            },
        }
    ]

    //Arreglo de los botones de las acciones del footer para actualizar el registro
    bottonsFooterModalUpdateModulo = [
        {
            labelButton: "Actualizar",
            color: "yellow",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-edit',
            onClick: () => {
                
                let dataJson = {};
                
                let updateReg = this.state.formUpdate;

                let nullFields = [];

                updateReg.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }else{
                        dataJson[`${x.name.toLowerCase()}`] = x.valueState
                    }
                })
            
                if(nullFields.length > 0){
                    Notify('warning','Problema actualizando Dispositivo',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    DispositivosAction_ActualizarDispositivos(dataJson).then(() => {
                        Notify('success','Dispositivo actualizado',`El Dispositivo: ${updateReg[1].valueState} - ${updateReg[2].valueState} con ID: ${updateReg[0].valueState} ha sido actualizado existosamente`)
                        this.setState({dataActualizada: true})
                        updateReg.forEach(x => {
                            x.valueState = ''
                        })
                        this.setState({showDataEditForm_show: false});
                    }).catch((err) => {
                        Notify('error','Dispositivo no actualizado',`${err.response.data.return}`)
                    })
                }
            },
        }
    ]

    //Arreglo de los botones de las acciones del footer para la actualización de contraseña
    bottonsFooterModalUpdatePassword = [
        {
            labelButton: "Actualizar",
            color: "yellow",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-exchange-alt',
            onClick: () => {
                
                let dataJson = {};
                
                let updatePass = this.state.formPassword;

                let nullFields = [];

                updatePass.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }else{
                        dataJson[`${x.name.toLowerCase()}`] = x.valueState
                    }
                })
            
                if(nullFields.length > 0){
                    Notify('warning','Problema actualizando contraseña',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{

                    if (updatePass[4].valueState != updatePass[5].valueState){
                        Notify('warning','Problema actualizando contraseña',`La Contraseña Nueva con la Confirmación de la Contraseña Nueva no coinciden.`)
                    }else{
                        DispositivosAction_CambiarContrasenaDispositivo(dataJson).then(() => {
                            Notify('success','Contraseña actualizada',`La contraseña para el dispositivo con ID: ${updatePass[0].valueState} ha sido actualizada existosamente`)
                            this.setState({dataActualizada: true})
                            updatePass.forEach(x => {
                                x.valueState = ''
                            })
                            this.setState({showDataEditForm_show: false});
                        }).catch((err) => {
                            Notify('error','Contraseña no actualizada',`${err.response.data.return}`)
                        })
                    }   
                }
            },
        },
        {
            labelButton: "Solicitar Contraseña",
            color: "yellow",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-key',
            onClick: () => {
                
                let dataJson = {};
                
                let updatePass = this.state.formPassword;

                updatePass.forEach(x => {
                    dataJson[`${x.name.toLowerCase()}`] = x.valueState
                })
            
                DispositivosAction_SolicitarCambioContrasena(dataJson).then(() => {
                    Notify('success','Contraseña solicitada enviada',`La contraseña para el dispositivo con ID: ${updatePass[0].valueState} ha enviada al correo del responsable: ${updatePass[1].valueState}`)
                    this.setState({dataActualizada: true})
                    updatePass.forEach(x => {
                        x.valueState = ''
                    })
                    this.setState({showDataEditForm_show: false});
                }).catch((err) => {
                    Notify('error','Contraseña solicitada no enviada',`${err.response.data.return}`)
                })  

            },
        },
    ]

    componentDidMount = () => {
        DispositivosAction_ConsultarDispositivos()
            .then((response) => {
                this.setState({dataModulo: response.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
            }).catch((err) => {
                Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
            })

        // DispositivosAction_ConsultarMicrosevicios()
        //     .then((response) => {
        //         let newFrom = this.state.formNew;
        //         newFrom[4].dataPicker = response.data.map((a, indice) => ({ ...a, id: indice + 1 }))
        //         this.setState({formNew: newFrom})
        //         let updateForm = this.state.formUpdate;
        //         updateForm[5].dataPicker = response.data.map((a, indice) => ({ ...a, id: indice + 1 }))
        //         this.setState({formUpdate: updateForm})
        //     }).catch((err) => {
        //         Notify('error','Error consultado Microservicios',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
        //     })
    }

    componentDidUpdate = () => {
        if(this.state.dataActualizada){
            DispositivosAction_ConsultarDispositivos()
                .then((response) => {
                    this.setState({dataModulo: response.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    this.setState({dataActualizada:false})
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
                            titleHeader='Dispositivos'
                            bottonsHeader={this.bottonsHeaderFilter}
                            formFilter={this.state.formFilter}
                            configuration={configFilter}
                            actions={this.bottonsFooterFilter}
                        />
                        <br/>
                        <DataTable 
                            key={this.state.dataModulo.id} 
                            configuration={configTable} 
                            data={this.state.dataModulo} 
                            columns={this.columnsDataTabe} 
                            buttonActions={this.bottonsActionsTable}
                        />
                    </div>
                    <ShowEditDataForm
                        key={3}
                        layaout = "vertical"
                        isActivate={this.state.showDataEditForm_show}
                        tittleModal={this.state.showDataEditForm_title}
                        handleClose={() => this.setState({showDataEditForm_show: false})}
                        modelSchema={this.state.showDataEditForm_schema}
                        fields={this.state.showDataEditForm_fields}
                        bottonFooter={this.state.showDataEditForm_bottonFooter}
                    />
                    <Confirmation 
                        show={this.state.showConfirmacion}
                        titulo={this.state.tituloConfirmacion} 
                        cuerpo={this.state.cuerpoConfirmacion}  
                        handleClose={() => this.setState({showConfirmacion: false}) }
                        handleAceptar={this.state.handleAceptarConfirmacion}
                    />
                    <ShowInformation
                        show={this.state.showInformacion}
                        titulo={this.state.tituloInformacion} 
                        cuerpo={this.state.cuerpoInformacion}  
                        handleClose={() => this.setState({showInformacion: false}) }
                        footer={this.state.buttonFooterInformacion}
                    />
            </div>
        )
    }
}

export default Dispositivos
