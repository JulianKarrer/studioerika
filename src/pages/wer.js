import * as React from 'react'
import { graphql } from 'gatsby'
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import Slider from 'infinite-react-carousel';
import useWindowSize from '../hooks/useWindowSize';
import { useIsMobile } from '../hooks/useMobile';
import Layout from '../components/layout';
import { useState } from 'react';
import { useEffect } from 'react';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { Fade } from 'react-reveal';
import { useRef } from 'react';

const teamImgStyle = {
  left: "calc(50vw - 20px)",
  transform: "translateX(-50%)",
  top: 150,
}

const headerTextStyle = {
  fontFamily: "SuisseWorks, serif",
  textDecoration: "none",
  fontSize: "7vmin",
  textAlign: "center",
  letterSpacing: "-0.005em",
  marginTop: 150,
}

const headerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: 100,
  marginBottom: 100,
  marginLeft: "10%",
  marginRight: "10%",
}

const accentFont = {
  fontFamily: "ZIGZAG, -apple-system, Roboto, sans-serif, serif",
  letterSpacing: "0.014em",
}

const mailtoStyle = {
  textDecoration: "none",
  color: "#141414"
}

const portraitContainer = {
  width: "min(90%, 600px)",
  textAlign: "left",
  marginLeft: "50%",
  transform: "translateX(-50%)",
  marginBottom: "100px",
}
const portraitContainerMobile = {
  textAlign: "left",
  marginBottom: "100px",
}

const smallHeader = {
  fontSize: "9pt",
  marginTop: 50,
  marginBottom: "-15px",
  fontFamily: "SuisseIntlBook, -apple-system, Roboto, sans-serif, serif"
}
const infoContainer = {
  background: "#141414",
  color: "#f5f4f0",
  display: "flex",
  flexDirection: "column",
  margin: "-20px",
  padding: "20px",
  paddingBottom: "40px",
  marginBottom: "20px",
  lineHeight: 1.4,
  letterSpacing: "1px",
}

const roundButton = {
  position:"absolute",
  color: "#f5f4f0",
  background: "#000000",
  zIndex: "2",
  transform: "translate3d(-50%, -50%, 0px)",
  border: "0px solid #f5f4f0",
  borderRadius: "50%",
  height: "80px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80px",
  cursor: "url('/maus.cur') 12 12, auto",
  fontFamily: "SuisseIntlBook, Sans-serif",
  userSelect: "none",
}

const Portrait = ({name, email, imagedata, description, isMobile}) => {
  const image = getImage(imagedata)
  return(
  <div style={isMobile?portraitContainerMobile:portraitContainer}>
    <div style={{pointerEvents: "none", userSelect: "none"}}>
      <GatsbyImage image={image} alt={name} />
      <p style={{maxWidth: isMobile?"100%":"80%"}}><span style={{...accentFont, fontSize: "21.3333px"}}>{name + " "}</span>{description}</p>
    </div>
    {email&&<a href={"mailto:"+email} style={{...mailtoStyle, userSelect: "none"}}>{"— "+email}</a>}
  </div>)
}

const PortraitContainer = ({children, isMobile}) => {
  let size = useWindowSize()
  const [sliderVisible, setSliderVisible] = useState(false);
  useEffect(()=>{setSliderVisible(true)},[])
  const sliderRef = useRef(null)
  const sliderSettings = {
    arrows: false,
    arrowsBlock: false,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: 380*size.width/1400,
  }

  return <>
    {isMobile&&
    <div style={{position: "relative", overflow: "hidden"}}>
      <div style={{marginBottom: "150px", width: isMobile?"100%":"125%", position: "relative", left: isMobile?"0":"-12.5%"}}>
        {children}
      </div>
    </div>}
    {!isMobile&&
      <div style={{marginBottom: "50px", position: "relative", width: "100vw", left: "-20px"}}>
        <button style={{...roundButton, top:"50%", left: "50px"}} 
          onClick={()=>{if(sliderRef&&sliderRef.current){sliderRef.current.slickPrev()}}}>←</button>
        <button style={{...roundButton, top:"50%", right: "-20px"}} 
          onClick={()=>{if(sliderRef&&sliderRef.current){sliderRef.current.slickNext()}}}>→</button>
        {sliderVisible&& <Slider {...sliderSettings} style={{width:"100vw"}} ref={sliderRef}>
          {children}
        </Slider>}
      </div>
    }
  </>
}


const Wer = ({data}) => {
  const isMobile = useIsMobile();
  return (<Layout title="Team">
    <GatsbySeo
        title="Wer?"
        description="Das Team von Studio Erika stellt sich vor."
      />
     <StaticImage
      src="../images/erika_team.jpg"
      alt="Das Team von Studio Erika"
      layout="fixed"
      placeholder="BLURRED"
      width={300}
      height={450}
      style={teamImgStyle}
    />
    <div style={headerStyle}>
      <p style={headerTextStyle}><span style={accentFont}>STUDIO ERIKA</span> ist ein detailverliebtes Designbüro, welches in den Bereichen Szenografie, Grafik, Corporate Design und Webdesign denkt und arbeitet. Charakteristisch für das Studio ist die Balance zwischen Professionalität und spielerisch-emotionaler Gestaltung, bei der Individualität stets den Kern der Arbeit bildet.</p>
    </div>
    <PortraitContainer isMobile={isMobile}>
        {data.allMarkdownRemark.nodes.map((node,i)=>{
          return <Portrait 
            key={i}
            name={node.frontmatter.title}
            email={node.frontmatter.mitarbeiteremail}
            imagedata={node.frontmatter.mitarbeiterimage}
            description={node.frontmatter.mitarbeiterdescription}
            isMobile={isMobile}
          />
        })}
    </PortraitContainer>

    <div style={infoContainer}>
      <Fade>
        <div style={{display:"flex", flexDirection:"column"}}>
          <>
            <span style={smallHeader}>Arbeite mit uns</span>
            <p>
              <br/>
              Pflichtpraktikum (4-6 Monate)<br/><br/>
              Wir suchen halbjährlich eine*n Praktikant*in aus dem Bereich Grafik- oder Kommunikationsdesign für ein Pflichtpraktikum im Studium. Das bezahlte Praktikum findet in Präsenz in unserem Studio in Kempten im Allgäu statt. Sende uns doch gerne dein Portfolio und deinen frühestmöglichen Startzeitpunkt an
              <a href='mailto:hallo@studioerika.de' style={{color: "#f5f4f0"}}> hallo@studioerika.de</a>

              <br/><br/><br/>
              Initiativbewerbung<br/>
              <br/>
            Gerne kannst du uns auch einfach so dein Portfolio schicken. Vielleicht passt es gerade? In jedem Fall haben wir dich dann auf dem Schirm! Sende uns doch gerne dein Portfolio an
              <a href='mailto:hallo@studioerika.de' style={{color: "#f5f4f0"}}> hallo@studioerika.de</a>
            </p>
          </>
        </div>
      </Fade>
    </div>

  </Layout>)
}

export const query = graphql`
query MitarbeiterQuery {
  allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/(mitarbeiter)/"}}
    sort: {frontmatter: {order: ASC}}
  ) {
    nodes {
      frontmatter {
        mitarbeiterdescription
        mitarbeiteremail
        title
        mitarbeiterimage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  }
}
`

export default Wer
