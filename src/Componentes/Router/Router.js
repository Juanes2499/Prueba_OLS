import React, { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect, } from "react-router-dom";
import {masterPage} from '../../Shared/masterPage';

import Home from '../Containers/Home/Home';
import Administrator from '../Containers/Administrador/Administrator/Administrator';

import Usuarios from '../Containers/Administrador/Usuarios/Usuarios';
import Dispositivos from '../Containers/Administrador/Dispositivos/Dispositivos';
import Microservicios from '../Containers/Administrador/Microservicios/Microservicios';
import Modulos from '../Containers/Administrador/Modulos/Modulos';
import Roles from '../Containers/Administrador/Roles/Roles';
import ConfiguracionMicroserviciosModulos from '../Containers/Administrador/ConfiguracionMicroserviciosModulos/ConfiguracionMicroserviciosModulos';
import ConfiguracionUsuarios from '../Containers/Administrador/ConfiguracionUsuarios/ConfiguracionUsuarios';

import NodoSensores from '../Containers/Administrador/Sensores/NodoSensores/NodoSensores';
import VariablesNodoSensor from '../Containers/Administrador/Sensores/VariablesNodoSensor/VariablesNodoSensor';
import ConfiguracionVariablesNodo from '../Containers/Administrador/Sensores/ConfiguracionVariablesNodo/ConfiguracionVariablesNodo';
import ConfiguracionReglas from '../Containers/Administrador/Sensores/ConfiguracionReglas/ConfiguracionReglas';
import DatosNodoSensor from '../Containers/Administrador/Sensores/DatosNodoSensor/DatosNodoSensor';

class Router extends Component {


  //El metodo de redireccionamiento. <Redirect from="/" to="/home" />

  render () {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/Home" component={Home}/>
            <Route exact path="/Administrator" component={masterPage(Administrator)}/>

            <Route exact path="/Administrator/Authentication/Usuarios" component={masterPage(Usuarios)}/>
            <Route exact path="/Administrator/Authentication/Dispositivos" component={masterPage(Dispositivos)}/>
            <Route exact path="/Administrator/Authentication/Microservicios" component={masterPage(Microservicios)}/>
            <Route exact path="/Administrator/Authentication/Modulos" component={masterPage(Modulos)}/>
            <Route exact path="/Administrator/Authentication/Roles" component={masterPage(Roles)}/>
            <Route exact path="/Administrator/Authentication/ConfiguracionMSM" component={masterPage(ConfiguracionMicroserviciosModulos)}/>
            <Route exact path="/Administrator/Authentication/ConfiguracionUsuarios" component={masterPage(ConfiguracionUsuarios)}/>

            <Route exact path="/Administrator/Sensores/NodoSensores" component={masterPage(NodoSensores)}/>
            <Route exact path="/Administrator/Sensores/VariablesNodoSensor" component={masterPage(VariablesNodoSensor)}/>
            <Route exact path="/Administrator/Sensores/ConfiguracionVNS" component={masterPage(ConfiguracionVariablesNodo)}/>
            <Route exact path="/Administrator/Sensores/ConfiguracionRNS" component={masterPage(ConfiguracionReglas)}/>
            <Route exact path="/Administrator/Sensores/DatosNodoSensor" component={masterPage(DatosNodoSensor)}/>
            <Redirect to ="/Home"/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}
export default Router;
