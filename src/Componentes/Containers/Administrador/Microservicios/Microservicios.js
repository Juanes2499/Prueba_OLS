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
    MicroserviciosAction_ConsultarMicroservicios, 
    MicroserviciosAction_CrearMicroservicios, 
    MicroserviciosAction_ActualizarMicroservicios, 
    MicroserviciosAction_EliminarMicroservicios
} from '../../../../Acciones/Microservicios/MicroserviciosAction';

//Schemas
const { StringType } = Schema.Types;
const schemaModalMicroservicio = Schema.Model({
    NOMBRE_MICROSERVICIO: StringType().isRequired('Este campo es requerido'),
    DETALLES: StringType().isRequired('Este campo es requerido'),
    URL_MICROSERVICIO: StringType().isRequired('Este campo es requerido'),
    ALIAS_MICROSERIVICIO: StringType().isRequired('Este campo es requerido'),
    URL_ALIAS_MICROSERVICIO: StringType().isRequired('Este campo es requerido'),
    ORDEN: StringType().isRequired('Este campo es requerido'),
    ICON_MICROSERVICIO: StringType().isRequired('Este campo es requerido'),
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
export class Microservicios extends Component {

    //Estados
    state = {
        //Estado para actulizar cuando se realice una acción
        dataActualizada: false,
        //Estados para cargar la data
        dataMicroservicios: [],
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
                name: "ID_MICROSERVICIO",
                label: "ID Microservicio",
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
                name: "NOMBRE_MICROSERVICIO",
                label: "Nombre Microservicio",
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
                name: "URL_MICROSERVICIO",
                label: "URL Microservicio",
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
                name: "ALIAS_MICROSERIVICIO",
                label: "Alias Microservicio",
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
                name: "URL_ALIAS_MICROSERVICIO",
                label: "URL Alias Microservicio",
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
                name: "FECHA_CREACION",
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
                name: "HORA_CREACION",
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
            {
                name: "FECHA_ACTUALIZACION",
                label: "Fecha Actualización",
                type: "date",
                dataEntryType:'datepicker',
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
                name: "HORA_ACTUALIZACION",
                label: "Hora Actualización",
                type: "time",
                dataEntryType:'timepicker',
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
        ],
        //Form para nuevo microservicio
        formNewMicroservice:[
            {
                name: "NOMBRE_MICROSERVICIO",
                label: "Nombre Microservicio",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formNewMicroservice;
                    microserviceModal[0].valueState = data;
                    this.setState({formNewMicroservice: microserviceModal});
                },
            },
            {
                name: "DETALLES",
                label: "Detalles",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formNewMicroservice;
                    microserviceModal[1].valueState = data;
                    this.setState({formNewMicroservice: microserviceModal});
                },
            },
            {
                name: "URL_MICROSERVICIO",
                label: "URL Microservicio",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formNewMicroservice;
                    microserviceModal[2].valueState = data;
                    this.setState({formNewMicroservice: microserviceModal});
                },
            },
            {
                name: "ALIAS_MICROSERIVICIO",
                label: "Alias Microservicio",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formNewMicroservice;
                    microserviceModal[3].valueState = data;
                    this.setState({formNewMicroservice: microserviceModal});
                },
            },
            {
                name: "URL_ALIAS_MICROSERVICIO",
                label: "URL Alias Microservicio",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formNewMicroservice;
                    microserviceModal[4].valueState = data;
                    this.setState({formNewMicroservice: microserviceModal});
                },
            },
            {
                name: "ORDEN",
                label: "Orden",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formNewMicroservice;
                    microserviceModal[5].valueState = data;
                    this.setState({formNewMicroservice: microserviceModal});
                },
            },
            {
                name: "ICON_MICROSERVICIO",
                label: "Icono Microservicio",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formNewMicroservice;
                    microserviceModal[6].valueState = data;
                    this.setState({formNewMicroservice: microserviceModal});
                },
            },
        ],
        //Form para actualizar un registro
        formUpdateMicroservice:[
            {
                name: "ID_MICROSERVICIO",
                label: "ID Microservicio",
                type: "text",
                dataEntryType:'input',
                readOnly: true,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formUpdateMicroservice;
                    microserviceModal[0].valueState = data;
                    this.setState({formUpdateMicroservice: microserviceModal});
                },
            },
            {
                name: "NOMBRE_MICROSERVICIO",
                label: "Nombre Microservicio",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formUpdateMicroservice;
                    microserviceModal[1].valueState = data;
                    this.setState({formUpdateMicroservice: microserviceModal});
                },
            },
            {
                name: "DETALLES",
                label: "Detalles",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formUpdateMicroservice;
                    microserviceModal[2].valueState = data;
                    this.setState({formUpdateMicroservice: microserviceModal});
                },
            },
            {
                name: "URL_MICROSERVICIO",
                label: "URL Microservicio",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formUpdateMicroservice;
                    microserviceModal[3].valueState = data;
                    this.setState({formUpdateMicroservice: microserviceModal});
                },
            },
            {
                name: "ALIAS_MICROSERVICIO",
                label: "Alias Microservicio",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formUpdateMicroservice;
                    microserviceModal[4].valueState = data;
                    this.setState({formUpdateMicroservice: microserviceModal});
                },
            },
            {
                name: "URL_ALIAS_MICROSERVICIO",
                label: "URL Alias Microservicio",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formUpdateMicroservice;
                    microserviceModal[5].valueState = data;
                    this.setState({formUpdateMicroservice: microserviceModal});
                },
            },
            {
                name: "ORDEN",
                label: "Orden",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formUpdateMicroservice;
                    microserviceModal[6].valueState = data;
                    this.setState({formUpdateMicroservice: microserviceModal});
                },
            },
            {
                name: "ICON_MICROSERVICIO",
                label: "Icono Microservicio",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let microserviceModal = this.state.formUpdateMicroservice;
                    microserviceModal[7].valueState = data;
                    this.setState({formUpdateMicroservice: microserviceModal});
                },
            },
        ]
    }

    //Arreglo de la configuración de la columnas de la tabla
    columnsDataTabe = [
        {
            key: "ID_MICROSERVICIO",
            text: "ID Microservicio",
            width: 300,
            align: "left",
            fixed: true,
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
            key: "DETALLES",
            text: "Detalles",
            width: 300,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "URL_MICROSERVICIO",
            text: "URL Microservicio",
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
            key: "URL_ALIAS_MICROSERVICIO",
            text: "URL Alias Microservicio",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "ORDEN",
            text: "Orden",
            width: 100,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "ICON_MICROSERVICIO",
            text: "Icono Microservicio",
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
    ]

    //Arreglo de las acciones de los botones de la tabla
    bottonsActionsTable = {
        dataKey: 'ID_MICROSERVICIO',
        actions: [
            {
                appearance: "subtle",
                nameIcon: 'fas fa-trash-alt',
                onClick: (data, dataKey) => {
                    let dataJson = {};
                    dataJson['id_microservicio'] = data.ID_MICROSERVICIO;
                    this.setState({
                        showConfirmacion: true,
                        tituloConfirmacion: 'Eliminar microservicio',
                        cuerpoConfirmacion: `La operación no es reversible una vez confirmada ¿Desea eliminar el microservicio: ${data.NOMBRE_MICROSERVICIO}?`,
                        handleAceptarConfirmacion: () => {
                            MicroserviciosAction_EliminarMicroservicios(dataJson).then(() => {
                                Notify('success','Microservicio eliminado',`El microservicio: ${data.NOMBRE_MICROSERVICIO} ha sido eliminado existosamente`)
                                this.setState({dataActualizada: true})
                                this.setState({showConfirmacion: false})
                            }).catch(() => {
                                Notify('error','Microservicio no eliminado',`El microservicio: ${data.NOMBRE_MICROSERVICIO} no ha podido ser eliminado, comunicarse con el área de TI`)
                            })
                        }
                    }) 
                },
            },
            {
                appearance: "subtle",
                nameIcon: 'fas fa-edit',
                onClick: (data, dataKey) => {

                    let updateForm = this.state.formUpdateMicroservice;
                    updateForm[0].valueState = data.ID_MICROSERVICIO
                    updateForm[1].valueState = data.NOMBRE_MICROSERVICIO
                    updateForm[2].valueState = data.DETALLES
                    updateForm[3].valueState = data.URL_MICROSERVICIO
                    updateForm[4].valueState = data.ALIAS_MICROSERIVICIO
                    updateForm[5].valueState = data.URL_ALIAS_MICROSERVICIO
                    updateForm[6].valueState = data.ORDEN
                    updateForm[7].valueState = data.ICON_MICROSERVICIO
                    this.setState({formUpdateMicroservice: updateForm});

                    this.setState({
                        showDataEditForm_show: true,
                        showDataEditForm_title: 'Editar Microservicio',
                        showDataEditForm_schema: schemaModalMicroservicio,
                        showDataEditForm_fields: this.state.formUpdateMicroservice,
                        showDataEditForm_bottonFooter: this.bottonsFooterModalUpdateMicroservico
                    })

                },
            }
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
                    showDataEditForm_title: 'Nuevo Microservicio',
                    showDataEditForm_schema: schemaModalMicroservicio,
                    showDataEditForm_fields: this.state.formNewMicroservice,
                    showDataEditForm_bottonFooter: this.bottonsFooterModalNewMicroservico
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
                
                MicroserviciosAction_ConsultarMicroservicios()
                    .then(result => {
                        this.setState({dataMicroservicios: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
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
            
                MicroserviciosAction_ConsultarMicroservicios(dataJsonObject)
                    .then(result => {
                        this.setState({dataMicroservicios: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    }).catch((err) => {
                        Notify('warning','No existen conincidencias',`Con las condiciones establecidas en los parámetros no se encontraron datos.`)
                    })
            }
        },
    ]

    //Arreglo de los botones de las acciones del footer para nuevo microservicio
    bottonsFooterModalNewMicroservico = [
        {
            labelButton: "Crear Microservicio",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-plus',
            onClick: () => {
                
                let dataJson = {};
                
                let newMicroservicio = this.state.formNewMicroservice;
                dataJson['nombre_microservicio'] = newMicroservicio[0].valueState;
                dataJson['detalles'] = newMicroservicio[1].valueState;
                dataJson['url_microservicio'] = newMicroservicio[2].valueState;
                dataJson['alias_microservicio'] = newMicroservicio[3].valueState;
                dataJson['url_alias_microservicio'] = newMicroservicio[4].valueState;
                dataJson['icon_microservicio'] = newMicroservicio[5].valueState;
                dataJson['orden'] = newMicroservicio[5].valueState;

                let nullFields = [];

                newMicroservicio.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }
                    
                })
                
                if(nullFields.length > 0){
                    Notify('warning','Problema creando microservicio',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    MicroserviciosAction_CrearMicroservicios(dataJson).then(() => {
                        Notify('success','Microservicio creado',`El microservicio: ${newMicroservicio[0].valueState} ha sido creado existosamente`)
                        this.setState({dataActualizada: true})
                        newMicroservicio.forEach(x => {
                            x.valueState = ''
                        })
                        this.setState({formNewMicroservice: newMicroservicio});
                    }).catch((err) => {
                        Notify('error','Microservicio no creado',`${err.response.data.return}`)
                    })
                }
            },
        }
    ]

    //Arreglo de los botones de las acciones del footer para actualizar microservicio
    bottonsFooterModalUpdateMicroservico = [
        {
            labelButton: "Actualizar",
            color: "yellow",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-edit',
            onClick: () => {
                
                let dataJson = {};
                
                let updateMicroservicio = this.state.formUpdateMicroservice;

                let nullFields = [];

                updateMicroservicio.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }else{
                        dataJson[`${x.name.toLowerCase()}`] = x.valueState
                    }
                })

                console.log(dataJson)
            
                if(nullFields.length > 0){
                    Notify('warning','Problema actualizando microservicio',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    MicroserviciosAction_ActualizarMicroservicios(dataJson).then(() => {
                        Notify('success','Microservicio actualizado',`El microservicio: ${updateMicroservicio[0].valueState} ha sido actualizado existosamente`)
                        this.setState({dataActualizada: true})
                        updateMicroservicio.forEach(x => {
                            x.valueState = ''
                        })
                        this.setState({showDataEditForm_show: false});
                    }).catch((err) => {
                        Notify('error','Microservicio no actualizado',`${err.response.data.return}`)
                    })
                }
            },
        }
    ]

    componentDidMount = () => {
        MicroserviciosAction_ConsultarMicroservicios()
            .then((response) => {
                this.setState({dataMicroservicios: response.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
            }).catch((err) => {
                Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
            })
    }

    componentDidUpdate = () => {
        if(this.state.dataActualizada){
            MicroserviciosAction_ConsultarMicroservicios()
                .then((response) => {
                    this.setState({dataMicroservicios: response.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
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
                        titleHeader='Microservicios'
                        bottonsHeader={this.bottonsHeaderFilter}
                        formFilter={this.state.formFilter}
                        configuration={configFilter}
                        actions={this.bottonsFooterFilter}
                    />
                    <br/>
                    <DataTableColAction 
                        key={this.state.dataMicroservicios.id} 
                        configuration={configTable} 
                        data={this.state.dataMicroservicios} 
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

export default Microservicios
