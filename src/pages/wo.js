import * as React from 'react'
import { StaticImage } from "gatsby-plugin-image"
import Slider from 'infinite-react-carousel';
import Layout from '../components/layout';
import { useState, useEffect } from 'react';
import { GatsbySeo } from 'gatsby-plugin-next-seo';

const mainContainerStyle = {
  minHeight: "100vh",
  margin: "-20px",
  marginBottom:"40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const innerContainer = {
  position: "relative",
  maxWidth: "100%",
  maxHeight: "70vh",
  width: "min(calc(100vw - 40px), calc(70vh * 1.4))",
  margin: "20px",
}

const containedObject = {
  maxWidth: "100%",
  maxHeight: "100%",
}

const carouselSettings = {
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: false,
  arrows: false,
  // adaptiveHeight: true,
}

const imageSettings = {
  objectFit: "contain",
  placeholder:"BLURRED",
}


const roundButton = {
  position:"absolute",
  color: "#f5f4f0",
  background: "#141414",
  left: "70%",
  bottom: "-80px",
  transform: "translate3d(-50%, -50%, 0px)",
  border: "2px solid #f5f4f0",
  borderRadius: "50%",
  height: "80px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80px",
  cursor: "url('/maus.cur') 12 12, auto",
  fontFamily: "SuisseIntlBook, Sans-serif",
  zIndex: 2,
}

const Wo = () => {
  const [sliderVisible, setSliderVisible] = useState(false);
  useEffect(()=>{setSliderVisible(true)},[])
  return (<Layout title="Allgäu">
    <GatsbySeo
        title="Wo?"
        description="Nehmen Sie mit uns Kontakt auf oder kommen Sie vorbei"
      />
          
    <div style={mainContainerStyle}>
      <div style={innerContainer}>
        <button 
          onClick={() => window.open("mailto:hallo@studioerika.de", '_blank', 'noreferrer')} 
            style={roundButton}>
          {"Schreib uns"}
        </button>
        {/* <div style={containedObject}> */}
          {sliderVisible&&<Slider {...carouselSettings}>
            <StaticImage
                  src="../images/wo/studioerika_einblick_1.png"
                  alt="Innenansicht des Büros"
                  {...imageSettings}
                  style={containedObject}
              />
            <StaticImage
                  src="../images/wo/studioerika_einblick_2.png"
                  alt="Außenansicht des Büros"
                  {...imageSettings}
                  style={containedObject}
              />
            <StaticImage
                  src="../images/wo/studioerika_einblick_3.png"
                  alt="Innenansicht des Büros"
                  {...imageSettings}
                  style={containedObject}
              />
            <StaticImage
                  src="../images/wo/studioerika_einblick_4.png"
                  alt="Besprechungsraum des Büros"
                  {...imageSettings}
                  style={containedObject}
              />
            <StaticImage
                  src="../images/wo/studioerika_einblick_5.png"
                  alt="Innenansicht des Büros"
                  {...imageSettings}
                  style={containedObject}
              />
            <StaticImage
                  src="../images/wo/studioerika_einblick_6.png"
                  alt="Innenansicht des Büros"
                  {...imageSettings}
                  style={containedObject}
              />
            <StaticImage
                  src="../images/wo/studioerika_einblick_7.png"
                  alt="Innenansicht des Büros"
                  {...imageSettings}
                  style={containedObject}
              />
            <StaticImage
                  src="../images/wo/studioerika_einblick_8.png"
                  alt="Außenansicht des Büros"
                  {...imageSettings}
                  style={containedObject}
              />
          </Slider>}
      </div>
    </div>
  </Layout>)
}

export default Wo