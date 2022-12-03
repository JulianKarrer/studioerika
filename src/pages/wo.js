import * as React from 'react'
import { StaticImage } from "gatsby-plugin-image"
import Slider from 'infinite-react-carousel';
import Layout from '../components/layout';

const locationImageStyle = {}

const textContainerStyle = {
  marginBottom: "150px", 
  marginTop: "200px", 
  maxWidth: "400px", 
  textAlign: "center",
  left: "calc(50vw - 20px)",
  position: "relative",
  transform: "translateX(-50%)",
}

const linkStyle = {
  color: "#141414",
  textDecoration: "none",
}

const carouselSettings = {
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: false,
  arrows: false,
}

const imageSettings = {
  layout:"fullWidth",
  placeholder:"BLURRED",
  style:{locationImageStyle},
}

const Wo = () => {
  return (<Layout title="Allgäu">
    <div style={textContainerStyle}>
      <p>Schreib uns per Mail an <a href="mailto:hallo@studioerika.de" style={linkStyle}>hallo@studioerika.de</a><br/>
        Ruf uns an unter der <a href="tel:004983159188639" style={linkStyle}>0831 591 886 39</a><br/>
        Trinke einen Kaffee mit uns in der Mehlstraße 1,<br/>
        in 87435 Kempten im Allgäu.
      </p>
    </div>
    <div style={{marginBottom: "50px"}}>
      <Slider {...carouselSettings}>
        <StaticImage
          src="../images/wo/besprechungsraum.jpg"
          alt="Unser Besprechungsraum"
          {...imageSettings}
        />
        <StaticImage
          src="../images/wo/bueroaussen.jpg"
          alt="Außenansicht des Büros"
          {...imageSettings}
        />
        <StaticImage
          src="../images/wo/detail.jpg"
          alt="Innendeko"
          {...imageSettings}
        />
        <StaticImage
          src="../images/wo/fensterlaeden.jpg"
          alt="Bemalte Fensterläden"
          {...imageSettings}
        />
        <StaticImage
          src="../images/wo/kueche.jpg"
          alt="Unsere Büroküche - optimal zum Kaffee trinken"
          {...imageSettings}
        />
      </Slider>
    </div>
  </Layout>)
}

export default Wo