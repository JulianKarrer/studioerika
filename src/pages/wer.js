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
        {sliderVisible&& <Slider {...sliderSettings} style={{width:"100vw"}}>
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
      width={200}
      height={300}
      style={teamImgStyle}
    />
    <div style={headerStyle}>
      <p style={headerTextStyle}><span style={accentFont}>STUDIO ERIKA</span> ist ein interdisziplinäres Designbüro, welches in den Bereichen Szenografie, Grafik, Corporate Design, online und offline, denkt und arbeitet. Erika hält die Balance zwischen angemessener Ernsthaftigkeit und spielerisch-emotionaler Gestaltung.</p>
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
