import * as React from 'react'
import { graphql } from 'gatsby'
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import Slider from 'infinite-react-carousel';
import useWindowSize from '../hooks/useWindowSize';
import { useIsMobile } from '../hooks/useMobile';
import Layout from '../components/layout';

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
}

const mailtoStyle = {
  textDecoration: "none",
  color: "#141414"
}


const Portrait = ({name, email, imagedata, description}) => {
  const image = getImage(imagedata)
  return(
  <div style={{width: "min(80%, 600px)", textAlign: "left", marginLeft: "50%", transform: "translateX(-50%)", marginBottom: "100px"}}>
    <div style={{pointerEvents: "none", userSelect: "none"}}>
      <GatsbyImage image={image} alt={name} />
      <p style={{maxWidth: "80%"}}><span style={{...accentFont, fontSize: "12pt"}}>{name + " "}</span>{description}</p>
    </div>
    {email&&<a href={"mailto:"+email} style={{...mailtoStyle, userSelect: "none"}}>{"— "+email}</a>}
  </div>)
}

const PortraitContainer = ({children}) => {
  const isMobile = useIsMobile();
  let size = useWindowSize()
  const sliderSettings = {
    arrows: false,
    arrowsBlock: false,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: 320*size.width/1400,
  }

  return <>
    {isMobile&&
    <div style={{position: "relative", overflow: "hidden"}}>
      <div style={{marginBottom: "150px", width: "125%", position: "relative", left: "-12.5%"}}>
        {children}
      </div>
    </div>}
    {!isMobile&&
      <div style={{marginBottom: "50px", position: "relative", width: "100vw", left: "-20px"}}>
        <Slider {...sliderSettings} style={{width:"100vw"}}>
          {children}
        </Slider>
      </div>
    }
  </>
}


const Wer = ({data}) => {
  return (<Layout title="Team">
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
    <PortraitContainer>
        {data.allMarkdownRemark.nodes.map((node)=>{
          return <Portrait 
            name={node.frontmatter.title}
            email={node.frontmatter.mitarbeiteremail}
            imagedata={node.frontmatter.mitarbeiterimage}
            description={node.frontmatter.mitarbeiterdescription}
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
