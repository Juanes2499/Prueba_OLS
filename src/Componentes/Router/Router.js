import React, { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect, } from "react-router-dom";
import {masterPage} from '../../Shared/masterPage';

import Home from '../Containers/Home/Home';
import Usuarios from '../Containers/Administrador/Usuarios/Usuarios';
class Router extends Component {
  //El metodo de redireccionamiento. <Redirect from="/" to="/home" />
  render () {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/Home" component={Home}/>
            <Route exact path="/Administrator/Authentication/Usuarios" component={masterPage(Usuarios)}/>
            <Redirect to ="/Home"/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}
export default Router;
