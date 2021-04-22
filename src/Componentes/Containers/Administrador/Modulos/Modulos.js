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
    ModulosAction_ConsultarModulos,
    ModulosAction_CrearModulo,
    ModulosAction_ActualizarModulo,
    ModulosAction_EliminarModulo
} from '../../../../Acciones/Modulos/ModulosAction';

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

export class Modulos extends Component {
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
        //Form para el filtro
        formFilter:[
            {
                name: "ID_MODULO",
                label: "ID Módulo",
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
                name: "NOMBRE_MODULO",
                label: "Nombre Módulo",
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
                name: "URL_MODULO",
                label: "URL Módulo",
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
                name: "ALIAS_MODULO",
                label: "Alias Módulo",
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
                name: "URL_ALIAS_MODULO",
                label: "URL Alias Módulo",
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
        formNewModulo:[
            {
                name: "NOMBRE_MODULO",
                label: "Nombre Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let moduloModal = this.state.formNewModulo;
                    moduloModal[0].valueState = data;
                    this.setState({formNewModulo: moduloModal});
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
                    let moduloModal = this.state.formNewModulo;
                    moduloModal[1].valueState = data;
                    this.setState({formNewModulo: moduloModal});
                },
            },
            {
                name: "URL_MODULO",
                label: "URL Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let moduloModal = this.state.formNewModulo;
                    moduloModal[2].valueState = data;
                    this.setState({formNewModulo: moduloModal});
                },
            },
            {
                name: "ALIAS_MODULO",
                label: "Alias Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let moduloModal = this.state.formNewModulo;
                    moduloModal[3].valueState = data;
                    this.setState({formNewModulo: moduloModal});
                },
            },
            {
                name: "URL_ALIAS_MODULO",
                label: "URL Alias Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let moduloModal = this.state.formNewModulo;
                    moduloModal[4].valueState = data;
                    this.setState({formNewModulo: moduloModal});
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
                    let moduloModal = this.state.formNewModulo;
                    moduloModal[5].valueState = data;
                    this.setState({formNewModulo: moduloModal});
                },
            },
            {
                name: "ICON_MODULO",
                label: "Icono Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let moduloModal = this.state.formNewModulo;
                    moduloModal[6].valueState = data;
                    this.setState({formNewModulo: moduloModal});
                },
            },
        ],
        //Form para actualizar un registro
        formUpdateModulo:[
            {
                name: "ID_MODULO",
                label: "ID Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: true,
                valueState: '',
                hadlerValueState: (data) => {
                    let moduloModal = this.state.formUpdateModulo;
                    moduloModal[0].valueState = data;
                    this.setState({formUpdateModulo: moduloModal});
                },
            },
            {
                name: "NOMBRE_MODULO",
                label: "Nombre Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let moduloModal = this.state.formUpdateModulo;
                    moduloModal[1].valueState = data;
                    this.setState({formUpdateModulo: moduloModal});
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
                    let moduloModal = this.state.formUpdateModulo;
                    moduloModal[2].valueState = data;
                    this.setState({formUpdateModulo: moduloModal});
                },
            },
            {
                name: "URL_MODULO",
                label: "URL Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let moduloModal = this.state.formUpdateModulo;
                    moduloModal[3].valueState = data;
                    this.setState({formUpdateModulo: moduloModal});
                },
            },
            {
                name: "ALIAS_MODULO",
                label: "Alias Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let moduloModal = this.state.formUpdateModulo;
                    moduloModal[4].valueState = data;
                    this.setState({formUpdateModulo: moduloModal});
                },
            },
            {
                name: "URL_ALIAS_MODULO",
                label: "URL Alias Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let moduloModal = this.state.formUpdateModulo;
                    moduloModal[5].valueState = data;
                    this.setState({formUpdateModulo: moduloModal});
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
                    let moduloModal = this.state.formUpdateModulo;
                    moduloModal[6].valueState = data;
                    this.setState({formUpdateModulo: moduloModal});
                },
            },
            {
                name: "ICON_MODULO",
                label: "Icono Módulo",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let moduloModal = this.state.formUpdateModulo;
                    moduloModal[7].valueState = data;
                    this.setState({formUpdateModulo: moduloModal});
                },
            },
        ]
    }

    //Arreglo de la configuración de la columnas de la tabla
    columnsDataTabe = [
        {
            key: "ID_MODULO",
            text: "ID Módulo",
            width: 300,
            align: "left",
            fixed: true,
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
            key: "DETALLES",
            text: "Detalles",
            width: 300,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "URL_MODULO",
            text: "URL Módulo",
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
            key: "URL_ALIAS_MODULO",
            text: "URL Alias Módulo",
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
            key: "ICON_MODULO",
            text: "Icono Módulo",
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
        dataKey: 'ID_MODULO',
        actions: [
            {
                appearance: "subtle",
                nameIcon: 'fas fa-trash-alt',
                onClick: (data, dataKey) => {
                    let dataJson = {};
                    dataJson['id_modulo'] = data.ID_MODULO;
                    this.setState({
                        showConfirmacion: true,
                        tituloConfirmacion: 'Eliminar módulo',
                        cuerpoConfirmacion: `La operación no es reversible una vez confirmada ¿Desea eliminar el módulo: ${data.NOMBRE_MODULO}?`,
                        handleAceptarConfirmacion: () => {
                            ModulosAction_EliminarModulo(dataJson).then(() => {
                                Notify('success','Módulo eliminado',`El módulo: ${data.NOMBRE_MODULO} ha sido eliminado existosamente`)
                                this.setState({dataActualizada: true})
                                this.setState({showConfirmacion: false})
                            }).catch(() => {
                                Notify('error','Módulo no eliminado',`El módulo: ${data.NOMBRE_MODULO} no ha podido ser eliminado, comunicarse con el área de TI`)
                            })
                        }
                    }) 
                },
            },
            {
                appearance: "subtle",
                nameIcon: 'fas fa-edit',
                onClick: (data, dataKey) => {

                    let updateForm = this.state.formUpdateModulo;
                    updateForm[0].valueState = data.ID_MODULO
                    updateForm[1].valueState = data.NOMBRE_MODULO
                    updateForm[2].valueState = data.DETALLES
                    updateForm[3].valueState = data.URL_MODULO
                    updateForm[4].valueState = data.ALIAS_MODULO
                    updateForm[5].valueState = data.URL_ALIAS_MODULO
                    updateForm[6].valueState = data.ORDEN
                    updateForm[7].valueState = data.ICON_MODULO
                    this.setState({formUpdateModulo: updateForm});

                    this.setState({
                        showDataEditForm_show: true,
                        showDataEditForm_title: 'Editar Módulo',
                        showDataEditForm_schema: schemaModalModulo,
                        showDataEditForm_fields: this.state.formUpdateModulo,
                        showDataEditForm_bottonFooter: this.bottonsFooterModalUpdateModulo
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
                    showDataEditForm_title: 'Nuevo Módulo',
                    showDataEditForm_schema: schemaModalModulo,
                    showDataEditForm_fields: this.state.formNewModulo,
                    showDataEditForm_bottonFooter: this.bottonsFooterModalNewModulo
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
                
                ModulosAction_ConsultarModulos()
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
            
                ModulosAction_ConsultarModulos(dataJsonObject)
                    .then(result => {
                        this.setState({dataModulo: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    }).catch((err) => {
                        Notify('warning','No existen conincidencias',`Con las condiciones establecidas en los parámetros no se encontraron datos.`)
                    })
            }
        },
    ]

    //Arreglo de los botones de las acciones del footer para nuevo microservicio
    bottonsFooterModalNewModulo = [
        {
            labelButton: "Crear Módulo",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-plus',
            onClick: () => {
                
                let dataJson = {};
                
                let newModulo = this.state.formNewModulo;

                let nullFields = [];

                newModulo.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }else{
                        dataJson[`${x.name.toLowerCase()}`] = x.valueState
                    }
                })
                
                if(nullFields.length > 0){
                    Notify('warning','Problema creando módulo',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    ModulosAction_CrearModulo(dataJson).then(() => {
                        Notify('success','Módulo creado',`El módulo: ${newModulo[0].valueState} ha sido creado existosamente`)
                        this.setState({dataActualizada: true})
                        newModulo.forEach(x => {
                            x.valueState = ''
                        })
                        this.setState({formNewModulo: newModulo});
                    }).catch((err) => {
                        Notify('error','Módulo no creado',`${err.response.data.return}`)
                    })
                }
            },
        }
    ]

    //Arreglo de los botones de las acciones del footer para actualizar microservicio
    bottonsFooterModalUpdateModulo = [
        {
            labelButton: "Actualizar",
            color: "yellow",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-edit',
            onClick: () => {
                
                let dataJson = {};
                
                let updateModulo = this.state.formUpdateModulo;

                let nullFields = [];

                updateModulo.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }else{
                        dataJson[`${x.name.toLowerCase()}`] = x.valueState
                    }
                })

                console.log(dataJson)
            
                if(nullFields.length > 0){
                    Notify('warning','Problema actualizando módulo',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    ModulosAction_ActualizarModulo(dataJson).then(() => {
                        Notify('success','Módulo actualizado',`El módulo: ${updateModulo[1].valueState} ha sido actualizado existosamente`)
                        this.setState({dataActualizada: true})
                        updateModulo.forEach(x => {
                            x.valueState = ''
                        })
                        this.setState({showDataEditForm_show: false});
                    }).catch((err) => {
                        Notify('error','Módulo no actualizado',`${err.response.data.return}`)
                    })
                }
            },
        }
    ]

    componentDidMount = () => {
        ModulosAction_ConsultarModulos()
            .then((response) => {
                this.setState({dataModulo: response.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
            }).catch((err) => {
                Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
            })
    }

    componentDidUpdate = () => {
        if(this.state.dataActualizada){
            ModulosAction_ConsultarModulos()
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
                            titleHeader='Módulos'
                            bottonsHeader={this.bottonsHeaderFilter}
                            formFilter={this.state.formFilter}
                            configuration={configFilter}
                            actions={this.bottonsFooterFilter}
                        />
                        <br/>
                        <DataTableColAction 
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
                        handleClose={() => this.setState({showConfirmacion:false}) }
                        handleAceptar={this.state.handleAceptarConfirmacion}
                    />
            </div>
        )
    }
}

export default Modulos
