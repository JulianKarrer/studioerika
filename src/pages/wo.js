import * as React from 'react'
import { StaticImage } from "gatsby-plugin-image"
import Slider from 'infinite-react-carousel';
import Layout from '../components/layout';
import { useState, useEffect } from 'react';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { useIsMobile } from '../hooks/useMobile';

const mainContainerStyle = {
  minHeight: "100vh",
  margin: "-20px",
  marginBottom:"40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
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


// const roundButton = {
//   position:"absolute",
//   color: "#f5f4f0",
//   background: "#141414",
//   left: "70%",
//   bottom: "-80px",
//   transform: "translate3d(-50%, -50%, 0px)",
//   border: "2px solid #f5f4f0",
//   borderRadius: "50%",
//   height: "80px",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   width: "80px",
//   cursor: "url('/maus.cur') 12 12, auto",
//   fontFamily: "SuisseIntlBook, Sans-serif",
//   zIndex: 2,
// }

const smallTextContainerStyle = {
  fontFamily: "SuisseIntlBook",
  textAlign: "center",
  fontSize: "10pt",
  marginTop: "20vh",
  marginBottom: "50px"
}

const linkStyle={
  textDecoration:"none", color: "#141414",
  fontFamily: "ZIGZAG"
}

const largeTextContainer = {
  fontFamily: "SuisseWorks, serif",
  marginBottom: "100px",
  fontSize: "7vmin",
  textAlign: "center"
}

const bothTextsContainer = {
  height: "90vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}

const Wo = () => {
  const [sliderVisible, setSliderVisible] = useState(false);
  const isMobile = useIsMobile();
  useEffect(()=>{setSliderVisible(true)},[])
  return (<Layout title="Allgäu">
    <GatsbySeo
        title="Wo?"
        description="Nehmen Sie mit uns Kontakt auf oder kommen Sie vorbei"
      />
          
    <div style={mainContainerStyle}>
      <div style={bothTextsContainer}>
        <div style={smallTextContainerStyle}>
          <span>Neugierig? Verwundert? Inspiriert?<br/>
          Wir reden unverbindlich über dein Projekt.</span>
        </div>
        <div style={largeTextContainer}>
          <span>Komm gerne bei uns in der <br/>
          <a href="https://www.google.com/maps/place/Studio+Erika+%E2%80%93+Grafik+und+Unfug/@47.7250247,10.3180975,17.58z/data=!4m13!1m7!3m6!1s0x479c7911df652fd3:0xebe7db517241cd3d!2sMehlstra%C3%9Fe+1,+018953+Kempten+(Allg%C3%A4u)!3b1!8m2!3d47.7249499!4d10.3186744!3m4!1s0x479c7967c63fcd95:0x22f947ddc60c7484!8m2!3d47.7250321!4d10.3186925" style={linkStyle} target="_blank" rel="noopener noreferrer" >
            Mehlstraße 1
          </a> vorbei,<br/>
          ruf uns unter {isMobile?<br/>:<></>} <a style={{...linkStyle}} href="tel:004983159188639"> 0831 591 886 39 </a> an<br/>
          oder schreibe uns eine <a style={linkStyle} href="mailto:hallo@studioerika.de">Mail</a>.</span>
        </div>
      </div>
      <div style={innerContainer}>
        {/* <button 
          onClick={() => window.open("mailto:hallo@studioerika.de", '_blank', 'noreferrer')} 
            style={roundButton}>
          {"Schreib uns"}
        </button> */}
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