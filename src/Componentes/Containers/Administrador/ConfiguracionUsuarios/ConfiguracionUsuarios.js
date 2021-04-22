import React, { Component } from 'react'
import { Schema } from 'rsuite';
import '../global.css'

//global
import {configTable} from '../global';

//Elementos
import { DataTableColAction } from '../../../Elements/DataTable/DataTable';
import Filter from '../../../Elements/Filter/Filter';
import { Notify } from '../../../Elements/Notify/Notify';
import { Confirmation } from '../../../Elements/Confirmation/Confirmation';

//Modals
import ShowEditDataForm from '../../../Modals/showEditDataForm/ShowEditDataForm';

//Actions
import { 
    ConfiguracionUsuarios_ConsultarConfiguracion,
    ConfiguracionUsuarios_ConsultarMicrosevicios,
    ConfiguracionUsuarios_ConsultarModulos,
    ConfiguracionUsuarios_CrearConfigracion,
    ConfiguracionUsuarios_EliminarConfigracion
} from '../../../../Acciones/ConfiguracionUsuarios/ConfiguracionUsuariosAction';


//Schemas
const { StringType } = Schema.Types;
const schemaModalModulo = Schema.Model({
    NOMBRE_MICROSERVICIO: StringType().isRequired('Este campo es requerido'),
    NOMBRE_MODULO: StringType().isRequired('Este campo es requerido'),
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

export class ConfiguracionUsuarios extends Component {
    //Estados
    state = {
        //Estado para actulizar cuando se realice una acción
        dataActualizada: false,
        //Estados para cargar la data
        data: [],
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
        //Form para el filtro
        formFilter:[
            {
                name: "ID_CONFIGURACION_USUARIO",
                label: "ID Configuración",
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
                name: "EMAIL",
                label: "Email",
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
            },////////////////////
            {
                name: "NOMBRE_MICROSERVICIO",
                label: "Nombre Microservicio",
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
                name: "ALIAS_MICROSERIVICIO",
                label: "Alias Microservicio",
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
            },//////////////////////
            {
                name: "NOMBRE_MODULO",
                label: "Nombre Módulo",
                type: "text",
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
            {
                name: "ALIAS_MODULO",
                label: "Alias Módulo",
                type: "text",
                dataEntryType:'input',
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
                name: "FECHA_CREACION",
                label: "Fecha Creación",
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
                name: "HORA_CREACION",
                label: "Hora Creación",
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
                name: "EMAIL",
                label: "Email",
                type: "email",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let newModal = this.state.formNew;
                    newModal[0].valueState = data;
                    this.setState({formNew: newModal});
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
                    let newModal = this.state.formNew;
                    newModal[1].valueState = data;
                    this.setState({formNew: newModal});
                },
            },
            {
                name: "NOMBRE_MODULO",
                label: "Alias Módulo",
                type: "text",
                dataEntryType:'selectpicker',
                readOnly: false,
                valueState: '',
                dataPicker: [],
                placeHolderPicker:'Seleccionar',
                hadlerValueState: (data) => {
                    let newModal = this.state.formNew;
                    newModal[2].valueState = data;
                    this.setState({formNew: newModal});
                },
            },
        ],
    }

    //Arreglo de la configuración de la columnas de la tabla
    columnsDataTabe = [
        {
            key: "ID_CONFIGURACION_USUARIO",
            text: "ID Configuración Usuario",
            width: 300,
            align: "left",
            fixed: true,
            resizable: true,
        },
        {
            key: "ID_USUARIO",
            text: "ID Usuario",
            width: 300,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "NOMBRES",
            text: "Nombres",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "APELLIDOS",
            text: "Apellidos",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "EMAIL",
            text: "Email",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "ID_MICROSERVICIO",
            text: "ID Microservcio",
            width: 200,
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
            key: "ALIAS_MICROSERIVICIO",
            text: "Alias Microservicio",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "ID_MODULO",
            text: "ID Módulo",
            width: 300,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "NOMBRE_MODULO",
            text: "Nombre Módulo",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "ALIAS_MODULO",
            text: "Alias Módulo",
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
    ]

    //Arreglo de las acciones de los botones de la tabla
    bottonsActionsTable = {
        dataKey: 'ID_CONFIGURACION_USUARIO',
        actions: [
            {
                appearance: "subtle",
                nameIcon: 'fas fa-trash-alt',
                onClick: (data, dataKey) => {
                    let dataJson = {};
                    dataJson['id_configuracion_usuario'] = data.ID_CONFIGURACION_USUARIO;
                    this.setState({
                        showConfirmacion: true,
                        tituloConfirmacion: 'Eliminar configuración',
                        cuerpoConfirmacion: `La operación no es reversible una vez confirmada ¿Desea eliminar la configuración entre email: ${data.EMAIL}, microservicio: ${data.ALIAS_MICROSERIVICIO} y módulo: ${data.ALIAS_MODULO}?`,
                        handleAceptarConfirmacion: () => {
                            ConfiguracionUsuarios_EliminarConfigracion(dataJson).then(() => {
                                Notify('success','Configuración eliminada',`La configuración: ${data.ID_CONFIGURACION_USUARIO} ha sido eliminado existosamente`)
                                this.setState({dataActualizada: true})
                                this.setState({showConfirmacion: false})
                            }).catch(() => {
                                Notify('error','Configuración no eliminada',`La configuración entre email: ${data.EMAIL}, microservicio: ${data.ALIAS_MICROSERIVICIO} y módulo: ${data.ALIAS_MODULO} no ha podido ser eliminado, comunicarse con el área de TI`)
                            })
                        }
                    }) 
                },
            },
        ]
    }

    //Arreglo de los botones de las acciones del header del filtro
    bottonsHeaderFilter = [
        {
            labelButton: "",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-plus',
            onClick: () => {
                this.setState({
                    showDataEditForm_show: true,
                    showDataEditForm_title: 'Nueva Configuración',
                    showDataEditForm_schema: schemaModalModulo,
                    showDataEditForm_fields: this.state.formNew,
                    showDataEditForm_bottonFooter: this.bottonsFooterModalNew
                })
            }
        },
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

                let newFormFilter = this.state.formFilter;
                
                newFormFilter.forEach(x => {
                    x.valueState = '';
                })

                this.setState({formFilter: newFormFilter});    
                
                ConfiguracionUsuarios_ConsultarConfiguracion()
                    .then(result => {
                        this.setState({data: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
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
            
                ConfiguracionUsuarios_ConsultarConfiguracion(dataJsonObject)
                    .then(result => {
                        this.setState({data: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    }).catch((err) => {
                        Notify('warning','No existen conincidencias',`Con las condiciones establecidas en los parámetros no se encontraron datos.`)
                    })
            }
        },
    ]

    //Arreglo de los botones de las acciones del footer para nueva configuración
    bottonsFooterModalNew = [
        {
            labelButton: "Crear Configuración",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-plus',
            onClick: () => {
                
                let dataJson = {};
                
                let newConfiguracion = this.state.formNew;

                let nullFields = [];

                newConfiguracion.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }else{
                        dataJson[`${x.name.toLowerCase()}`] = x.valueState
                    }
                })
                
                if(nullFields.length > 0){
                    Notify('warning','Problema creando configuración',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    ConfiguracionUsuarios_CrearConfigracion(dataJson).then(() => {
                        Notify('success','Configuración creada',`La configuración entre email: ${newConfiguracion[0].valueState}, microservicio: ${newConfiguracion[1].valueState} y módulo: ${newConfiguracion[2].valueState}  ha sido creada existosamente`)
                        this.setState({dataActualizada: true})
                        newConfiguracion.forEach(x => {
                            x.valueState = ''
                        })
                        this.setState({formNew: newConfiguracion});
                    }).catch((err) => {
                        Notify('error','Configuración no creada',`${err.response.data.return}`)
                    })
                }
            },
        }
    ]

    componentDidMount = () => {
        ConfiguracionUsuarios_ConsultarConfiguracion()
            .then((response) => {
                this.setState({data: response.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
            }).catch((err) => {
                Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión`)
            })

        ConfiguracionUsuarios_ConsultarMicrosevicios()
            .then((response) => {
                let newFrom = this.state.formNew;
                newFrom[1].dataPicker = response.data.map((a, indice) => ({ ...a, id: indice + 1 }))
                this.setState({formNew: newFrom})
            }).catch((err) => {
                Notify('error','Error consultado Microservicios',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
            })

        ConfiguracionUsuarios_ConsultarModulos()
            .then((response) => {
                let newFrom = this.state.formNew;
                newFrom[2].dataPicker = response.data.map((a, indice) => ({ ...a, id: indice + 1 }))
                this.setState({formNew: newFrom})
            }).catch((err) => {
                Notify('error','Error consultado Módulos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
            })
    }

    componentDidUpdate = () => {
        if(this.state.dataActualizada){
            ConfiguracionUsuarios_ConsultarConfiguracion()
                .then((response) => {
                    this.setState({data: response.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
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
                        titleHeader='Configuración Usuarios'
                        bottonsHeader={this.bottonsHeaderFilter}
                        formFilter={this.state.formFilter}
                        configuration={configFilter}
                        actions={this.bottonsFooterFilter}
                    />
                    <br/>
                    <DataTableColAction 
                        key={this.state.data.id} 
                        configuration={configTable} 
                        data={this.state.data} 
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
                    handleClose={() => this.setState({showConfirmacion:false}) }
                    handleAceptar={this.state.handleAceptarConfirmacion}
                />
            </div>
        )
    }
}

export default ConfiguracionUsuarios
