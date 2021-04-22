import React, {Component } from 'react';
import HeroSection from '../../Elements/HeroSection/HeroSection';
import videoHome from '../../../Videos/Home/HomeVideo.mp4';
import imageHome from '../../../Imagenes/Home/Home.png'
import login from '../../Modals/Login/Login';
import '../../../App.css';

class Home extends Component{
  render() {
    return (
      <div>
        <HeroSection 
          type = 'image'
          srcVideo={videoHome}
          srcImg = {imageHome}
          tittle='Aplicación'
          tittle2='OLSoftware'
          subtitulo='Prueba práctica Front-end senior'
          footer='OLSoftware - 2021'
          login={login}
        />
      </div>
    );
  }
}


export default Home;
