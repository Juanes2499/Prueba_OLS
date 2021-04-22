import React, { Component } from 'react'
import { Schema } from 'rsuite';
import "../../global.css"

//global
import {configTable} from '../../global';

//Elementos
import { DataTableColAction } from '../../../../Elements/DataTable/DataTable';
import Filter from '../../../../Elements/Filter/Filter';
import { Notify } from '../../../../Elements/Notify/Notify';
import { Confirmation } from '../../../../Elements/Confirmation/Confirmation';

//Modals
import ShowEditDataForm from '../../../../Modals/showEditDataForm/ShowEditDataForm';

//Actions
import { 
    ConfiguracionVariablesNodoAction_ConsultarConfiguracion,
    ConfiguracionVariablesNodoAction_ConsultarVariables,
    ConfiguracionVariablesNodoAction_CrearConfiguracion,
    ConfiguracionVariablesNodoAction_EliminarConfiguracion
} from '../../../../../Acciones/Sensores/ConfiguracionVariablesNodo/ConfiguracionVariablesNodoAction';

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

export class ConfiguracionVariablesNodo extends Component {
    //Estados
    state = {
        //Estado para actulizar cuando se realice una acción
        dataActualizada: false,
        //Estados para cargar la data
        data: [],
        //Estado para cargar la data del mapa
        dataMap: [],
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
                name: "ID_CONFIGURACION",
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
                name: "ID_NODO_SENSOR",
                label: "ID Nodo Sensor",
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
                name: "NOMBRE_VARIABLE",
                label: "Nombre Variable",
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
                name: "TIPO_DATO",
                label: "Tipo de Dato",
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
                name: "UNIDAD_MEDIDA",
                label: "Unidad de Medida",
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
                name: "FECHA_CREACION_CONFIGURACION",
                label: "Fecha Creación",
                type: "date",
                dataEntryType:'datepicker',
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
                name: "HORA_CREACION_CONFIGURACION",
                label: "Hora Creación",
                type: "time",
                dataEntryType:'timepicker',
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
        //Form para nuevo registros
        formNew:[
            {
                name: "ID_NODO_SENSOR",
                label: "ID Nodo Sensor",
                type: "text",
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
                name: "NOMBRE_VARIABLE",
                label: "Nombre Variable",
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
        ],
    }

    //Arreglo de la configuración de la columnas de la tabla
    columnsDataTabe = [
        {
            key: "ID_CONFIGURACION",
            text: "ID Configuración",
            width: 300,
            align: "left",
            fixed: true,
            resizable: true,
        },
        {
            key: "ID_NODO_SENSOR",
            text: "ID Nodo Sensor",
            width: 300,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "ID_VARIABLE",
            text: "ID Variable",
            width: 300,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "NOMBRE_VARIABLE",
            text: "Nombre Variable",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "TIPO_DATO_VARIABLE",
            text: "Tipo Variable",
            width: 150,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "UNIDAD_MEDIDA_VARIABLE",
            text: "Unidad Medida Variable",
            width: 150,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "FECHA_CREACION_CONFIGURACION",
            text: "Fecha Creación",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "HORA_CREACION_CONFIGURACION",
            text: "Hora Creación",
            width: 150,
            align: "left",
            fixed: false,
            resizable: true,
        },
    ]

    //Arreglo de las acciones de los botones de la tabla
    bottonsActionsTable = {
        dataKey: 'ID_CONFIGURACION',
        actions: [
            {
                appearance: "subtle",
                nameIcon: 'fas fa-trash-alt',
                onClick: (data, dataKey) => {
                    let dataJson = {};
                    dataJson['id_configuracion'] = data.ID_CONFIGURACION;
                    this.setState({
                        showConfirmacion: true,
                        tituloConfirmacion: 'Eliminar Configuracion Variable Nodo',
                        cuerpoConfirmacion: `La operación no es reversible una vez confirmada ¿Desea eliminar la Configuracion Variable Nodo con ID: ${data.ID_CONFIGURACION}?`,
                        handleAceptarConfirmacion: () => {
                            ConfiguracionVariablesNodoAction_EliminarConfiguracion(dataJson).then(() => {
                                Notify('success','Configuracion Variable Nodo eliminada',`La Configuracion Variable Nodo:  ${data.ID_CONFIGURACION} entre Nodo Sensor: ${data.ID_NODO_SENSOR} y la Variable: ${data.NOMBRE_VARIABLE} ha sido eliminada existosamente`)
                                this.setState({dataActualizada: true})
                                this.setState({showConfirmacion: false})
                            }).catch(() => {
                                Notify('error','Configuracion Variable Nodo no eliminada',`La Configuracion Variable Nodo:  ${data.ID_CONFIGURACION} entre Nodo Sensor: ${data.ID_NODO_SENSOR} y la Variable: ${data.NOMBRE_VARIABLE} no ha podido ser eliminada, comunicarse con el área de TI`)
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
                    showDataEditForm_title: 'Nueva Variable',
                    showDataEditForm_schema: schemaModalModulo,
                    showDataEditForm_fields: this.state.formNew,
                    showDataEditForm_bottonFooter: this.bottonsFooterModalNewRegister
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
                
                ConfiguracionVariablesNodoAction_ConsultarConfiguracion()
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
            
                ConfiguracionVariablesNodoAction_ConsultarConfiguracion(dataJsonObject)
                    .then(result => {
                        this.setState({data: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    }).catch((err) => {
                        Notify('warning','No existen conincidencias',`Con las condiciones establecidas en los parámetros no se encontraron datos.`)
                    })
            }
        },
    ]

    //Arreglo de los botones de las acciones del footer para nuevo registro
    bottonsFooterModalNewRegister = [
        {
            labelButton: "Crear Variable",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-plus',
            onClick: () => {
                
                let dataJson = {};
                
                let newRegister = this.state.formNew;

                let nullFields = [];

                newRegister.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }else{
                        dataJson[`${x.name.toLowerCase()}`] = x.valueState
                    }
                })
                
                if(nullFields.length > 0){
                    Notify('warning','Problema creando la Configuracion Variable Nodo',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    ConfiguracionVariablesNodoAction_CrearConfiguracion(dataJson).then(() => {
                        Notify('success','Configuracion Variable Nodo creada',`La Configuracion Nodo Sensor: ${newRegister[0].valueState} con la Variable: ${newRegister[1].valueState} ha sido creada existosamente`)
                        this.setState({dataActualizada: true})
                        newRegister.forEach(x => {
                            x.valueState = ''
                        })
                        this.setState({formNew: newRegister});
                    }).catch((err) => {
                        Notify('error','Configuracion Variable Nodo no creado',`${err.response.data.return}`)
                    })
                }
            },
        }
    ]


    componentDidMount = () => {
        ConfiguracionVariablesNodoAction_ConsultarConfiguracion()
            .then((response) => {
                this.setState({data: response.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
            }).catch((err) => {
                Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
            })

        ConfiguracionVariablesNodoAction_ConsultarVariables()
            .then((response) => {
                let newFrom = this.state.formNew;
                newFrom[1].dataPicker = response.data.map((a, indice) => ({ ...a, id: indice + 1 }))
                this.setState({formNew: newFrom})
            }).catch((err) => {
                Notify('error','Error consultado Variable',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
            })
    }

    componentDidUpdate = () => {
        if(this.state.dataActualizada){
            ConfiguracionVariablesNodoAction_ConsultarConfiguracion()
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
                        titleHeader='Configuración Variables Nodo Sensores'
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
                    <br/>
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

export default ConfiguracionVariablesNodo
