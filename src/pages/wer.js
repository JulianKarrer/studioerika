import * as React from 'react'
import { graphql } from 'gatsby'
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import Slider from 'infinite-react-carousel';

const teamImgStyle = {
  left: "50vw",
  transform: "translateX(-50%)",
  top: 100,
}

const headerTextStyle = {
  fontFamily: "SuisseWorks, serif",
  textDecoration: "none",
  fontSize: "7vmin",
  textAlign: "center",
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
  <div style={{width: "min(80%, 500px)", textAlign: "left", transform: "translateX(20%)"}}>
    <div style={{pointerEvents: "none", userSelect: "none"}}>
      <GatsbyImage image={image} alt={name} />
      <p style={{maxWidth: "80%"}}><span style={{...accentFont, fontSize: "12pt"}}>{name + " "}</span>{description}</p>
    </div>
    <a href={"mailto:"+email} style={{...mailtoStyle, userSelect: "none"}}>{"— "+email}</a>
  </div>)
}



const Wer = ({data}) => {
  console.log(data)
  const sliderSettings = {
    arrows: false,
    arrowsBlock: false,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: 400,
    virtualList: true
  }

  return (<>
    <div>
     <StaticImage
      src="../images/erika_team.jpg"
      alt="Das Team von Studio Erika"
      layout="fixed"
      placeholder="BLURRED"
      width={200}
      height={300}
      style={teamImgStyle}
    />
    </div>
    <div style={headerStyle}>
      <p style={headerTextStyle}><span style={accentFont}>STUDIO ERIKA</span> ist ein interdisziplinäres Designbüro, welches in den Bereichen Szenografie, Grafik, Corporate Design, online und offline, denkt und arbeitet. Erika hält die Balance zwischen angemessener Ernsthaftigkeit und spielerisch-emotionaler Gestaltung.</p>
    </div>
    <div style={{marginBottom: "150px"}}>
      <Slider {...sliderSettings} style={{width:"100vw"}}>
          {data.allMarkdownRemark.nodes.map((node)=>{
            return <Portrait 
              name={node.frontmatter.title}
              email={node.frontmatter.mitarbeiteremail}
              imagedata={node.frontmatter.mitarbeiterimage}
              description={node.frontmatter.mitarbeiterdescription}
            />
          })}
      </Slider>
    </div>
    </>)
}

export const query = graphql`
query MitarbeiterQuery {
  allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(mitarbeiter)/"}}) {
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
