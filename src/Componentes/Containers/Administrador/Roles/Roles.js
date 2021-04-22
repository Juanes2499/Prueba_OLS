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
    RolesAction_ConsultarRoles,
    RolesAction_CrearRol,
    RolesAction_EliminarRol
} from '../../../../Acciones/Roles/RolesAction';

//Schemas
const { StringType } = Schema.Types;
const schemaModalRol = Schema.Model({
    NOMBRE_ROL: StringType().isRequired('Este campo es requerido'),
    DETALLES: StringType().isRequired('Este campo es requerido'),
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

export class Roles extends Component {
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
                name: "ID_ROL",
                label: "ID Rol",
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
                name: "NOMBRE_ROL",
                label: "Nombre Rol",
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
        ],
        //Form para nuevo microservicio
        formNewRol:[
            {
                name: "NOMBRE_ROL",
                label: "Nombre Rol",
                type: "text",
                dataEntryType:'input',
                readOnly: false,
                valueState: '',
                hadlerValueState: (data) => {
                    let rolModal = this.state.formNewRol;
                    rolModal[0].valueState = data;
                    this.setState({formNewRol: rolModal});
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
                    let rolModal = this.state.formNewRol;
                    rolModal[1].valueState = data;
                    this.setState({formNewRol: rolModal});
                },
            },
        ],
    }

    //Arreglo de la configuración de la columnas de la tabla
    columnsDataTabe = [
        {
            key: "ID_ROL",
            text: "ID Rol",
            width: 300,
            align: "left",
            fixed: true,
            resizable: true,
        },
        {
            key: "NOMBRE_ROL",
            text: "Nombre Rol",
            width: 200,
            align: "left",
            fixed: false,
            resizable: true,
        },
        {
            key: "DETALLES",
            text: "Detalles",
            width: 750,
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
        dataKey: 'ID_ROL',
        actions: [
            {
                appearance: "subtle",
                nameIcon: 'fas fa-trash-alt',
                onClick: (data, dataKey) => {
                    let dataJson = {};
                    dataJson['id_rol'] = data.ID_ROL;
                    this.setState({
                        showConfirmacion: true,
                        tituloConfirmacion: 'Eliminar Rol',
                        cuerpoConfirmacion: `La operación no es reversible una vez confirmada ¿Desea eliminar el rol: ${data.NOMBRE_ROL}?`,
                        handleAceptarConfirmacion: () => {
                            RolesAction_EliminarRol(dataJson).then(() => {
                                Notify('success','Rol eliminado',`El rol: ${data.NOMBRE_ROL} ha sido eliminado existosamente`)
                                this.setState({dataActualizada: true})
                                this.setState({showConfirmacion: false})
                            }).catch(() => {
                                Notify('error','Rol no eliminado',`El rol: ${data.NOMBRE_ROL} no ha podido ser eliminado, comunicarse con el área de TI`)
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
                    showDataEditForm_title: 'Nuevo Rol',
                    showDataEditForm_schema: schemaModalRol,
                    showDataEditForm_fields: this.state.formNewRol,
                    showDataEditForm_bottonFooter: this.bottonsFooterModalNewRol
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
                
                RolesAction_ConsultarRoles()
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
            
                RolesAction_ConsultarRoles(dataJsonObject)
                    .then(result => {
                        this.setState({dataModulo: result.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
                    }).catch((err) => {
                        Notify('warning','No existen conincidencias',`Con las condiciones establecidas en los parámetros no se encontraron datos.`)
                    })
            }
        },
    ]

    //Arreglo de los botones de las acciones del footer para nuevo rol
    bottonsFooterModalNewRol = [
        {
            labelButton: "Crear Rol",
            color: "green",
            appearance: "subtle",
            icon: true,
            nameIcon: 'fas fa-plus',
            onClick: () => {
                
                let dataJson = {};
                
                let newRol = this.state.formNewRol;

                let nullFields = [];

                newRol.forEach(x => {
                    if (x.valueState === ''){
                        nullFields.push(x.label)
                    }else{
                        dataJson[`${x.name.toLowerCase()}`] = x.valueState
                    }
                })
                
                if(nullFields.length > 0){
                    Notify('warning','Problema creando rol',`Los siguientes campos estan vacios: ${nullFields.toString().replace(/,/g,", ")}`)
                }else{
                    RolesAction_CrearRol(dataJson).then(() => {
                        Notify('success','Rol creado',`El rol: ${newRol[0].valueState} ha sido creado existosamente`)
                        this.setState({dataActualizada: true})
                        newRol.forEach(x => {
                            x.valueState = ''
                        })
                        this.setState({formNewRol: newRol});
                    }).catch((err) => {
                        Notify('error','Rol no creado',`${err.response.data.return}`)
                    })
                }
            },
        }
    ]

    componentDidMount = () => {
        RolesAction_ConsultarRoles()
            .then((response) => {
                this.setState({dataModulo: response.data.map((a, indice) => ({ ...a, id: indice + 1 }))})
            }).catch((err) => {
                Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
            })
    }

    componentDidUpdate = () => {
        if(this.state.dataActualizada){
            RolesAction_ConsultarRoles()
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
                        titleHeader='Roles'
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

export default Roles
