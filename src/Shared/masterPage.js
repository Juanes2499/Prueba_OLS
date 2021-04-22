import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import './masterPage.css';
import { Container, Header, Content, Footer, Sidebar, Navbar, Nav, Dropdown, Icon, Sidenav } from 'rsuite';
import * as FaIcons from 'react-icons/fa';
import styled from "styled-components";
import 'boxicons'

//Elemts
// import Footer from '../Componentes/Elements/Footer/Footer';
import {LoginAction_CerrarSesion} from '../Acciones/Login/LoginAction';

/*===== SHOW NAVBAR  =====*/ 
const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)

    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
            // show navbar
            nav.classList.toggle('show')
            // change icon
            toggle.classList.toggle('bx-x')
            // add padding to body
            bodypd.classList.toggle('body-pd')
            // add padding to header
            headerpd.classList.toggle('body-pd')
        })
    }
}

showNavbar('header-toggle','nav-bar','body-pd','header')

/*===== LINK ACTIVE  =====*/ 
const linkColor = document.querySelectorAll('.nav__link')

function colorLink(){
    if(linkColor){
        linkColor.forEach(l=> l.classList.remove('active'))
        this.classList.add('active')
    }
}
linkColor.forEach(l=> l.addEventListener('click', colorLink))

export const masterPage =  (ComposedComponent) => {      
    
    class global extends Component {
    
        constructor(props) {
            super(props);
            this.state = {
              expand: false,
              navbar: {
                width:'100%'
              }
            };
            this.handleToggle = this.handleToggle.bind(this);
          }

          handleToggle() {
            
            let navbarNew = '';

            if(!this.state.expand){
                navbarNew = {
                    width:'85%'
                }
            }else{
                navbarNew = {
                    width:'100%'
                }
            }
            
            this.setState({
              expand: !this.state.expand,
              navbar: navbarNew,  
            });

          }

          render() {

            const { expand } = this.state;
            
            return (
              <div className="show-fake-browser sidebar-page">
                <Container>
                    <header className="header" id="header">
                        <div className="header__toggle">
                            <i className='bx bx-menu' id="header-toggle"></i>
                        </div>

                        <div className="header__img">
                            {/* <i className='bx bx-menu' id="header-toggle"></i> */}
                            <i className='fas fa-user'/>
                        </div>
                    </header>

                    <div className="l-navbar" id="nav-bar">
                        <nav class="nav">
                            <div>
                                <ul href="#" className="nav__logo">
                                    <i class='bx bx-layer nav__logo-icon'></i>
                                    <span class="nav__logo-name">Bedimcode</span>
                                </ul>

                                <div className="nav__list">
                                    <ul href="#" className="nav__link active">
                                    <i className='bx bx-grid-alt nav__icon' ></i>
                                        <span className="nav__name">Dashboard</span>
                                    </ul>

                                    <ul href="#" className="nav__link">
                                        <i className='bx bx-user nav__icon' ></i>
                                        <span className="nav__name">Users</span>
                                    </ul>
                                    
                                    <ul href="#" className="nav__link">
                                        <i class='bx bx-message-square-detail nav__icon' ></i>
                                        <span className="nav__name">Messages</span>
                                    </ul>

                                    <ul href="#" className="nav__link">
                                        <i class='bx bx-bookmark nav__icon' ></i>
                                        <span className="nav__name">Favorites</span>
                                    </ul>

                                    <ul href="#" className="nav__link">
                                        <i class='bx bx-folder nav__icon' ></i>
                                        <span className="nav__name">Data</span>
                                    </ul>

                                    <ul href="#" className="nav__link">
                                        <i className='bx bx-bar-chart-alt-2 nav__icon' ></i>
                                        <span className="nav__name">Analytics</span>
                                    </ul>
                                </div>
                            </div>

                            <ul href="#" className="nav__link">
                                <i className='bx bx-log-out nav__icon' ></i>
                                <span className="nav__name">Log Out</span>
                            </ul>
                        </nav>
                    </div>
                    <Content>
                        {/* <div className='body-container'> */}
                            <ComposedComponent {...this.props} />
                        {/* </div> */}
                    </Content>
                </Container>
              </div>
            );
          }
    }

    return withRouter(global);
}