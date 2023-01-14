import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from '../components/layout'
import "../components/invertcursor.css"
import "../components/was.css"
import { useState } from 'react'
import { useIsMobile } from '../hooks/useMobile'
import Fade from 'react-reveal/Fade';
import { GatsbySeo } from 'gatsby-plugin-next-seo'

const mainContainerStyle={
  background: "#141414",
  minHeight: "70vh",
  margin: "-20px",
  marginBottom: "50px",
  padding: "30vh 20px 20px 20px",
}

const selectionMenuContainer = {
  textAlign: "center",
  display: "flex",
  maxWidth: "100%",
  flexWrap: "wrap",
  justifyContent: "center",
  marginBottom: "100px",
}

const selectionMenuItem = {
  textDecoration: "none",
  margin: "10px",
  cursor: "url('/maus.cur') 12 12, auto", 
  background: "none",
  border: "none",
  padding: "0",
  fontSize: "16pt",
  color: "#f5f4f0",
  fontFamily: "SuisseWorks, serif",
}

const selectionMenuMobileItem = {
  textDecoration: "none",
  margin: "5px",
  cursor: "url('/maus.cur') 12 12, auto", 
  background: "none",
  border: "none",
  padding: "0",
  fontSize: "12pt",
  letterSpacing: "0.44px",
  color: "#f5f4f0",
  fontFamily: "SuisseWorks, serif",
}

const Selection = ({name, setter, selection, isMobile})=>{
  return <button
    style={{
      ...(isMobile?selectionMenuMobileItem:selectionMenuItem),
    }} 
    className={name === selection ? "underlined" : ""}
    onClick={()=>{setter(name)}}>
      <Fade cascade>{name}</Fade>
    </button>
}

const SelectionMenu = ({selectionSetter, selection, isMobile}) => {
  return <div style={selectionMenuContainer}>
    {["Alle", "Raum", "Grafik", "Marke", "Online", "Spiel"].map((name,i) => {
      return <Selection name={name} setter={selectionSetter} selection={selection} key={i+999} isMobile={isMobile}/>
    })}
  </div>
}

const GridContainerStyle = {
  display:"grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridGap: "20px",
  marginBottom: "100px",
}

const GridContainerMobileStyle = {
  marginBottom: "100px",
  display:"flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
}

const GridTitleStyle = {
  fontSize: "30pt",
  fontFamily: "ZIGZAG, non-serif",
  zIndex: "1",
  width: "100%",
  textAlign: "center",
  wordWrap: "anywhere",
}

export const GridEntryStyle = {
  position: "relative",
}

const GridBigEntryStyle = {
  position: "relative",
  gridColumnStart: "2 span",
  gridRowStart: "2 span",
}

export const TitlesContainerStyle = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top:"0",
  left:"0",
  width:"100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  transition: "linear 100ms opacity",
  zIndex: "2",
}

const mobileSubtitleStyle = {
  fontSize: "30pt",
  fontFamily: "ZIGZAG, non-serif",
  color: "#f5f4f0",
  marginBottom: "40px",
  marginTop: "-20px",
  wordWrap: "anywhere",
}

export const GridElement = ({node, isMobile, slug}) => {
  const [hovered, setHovered] = useState(false)
  return <>
      {node.thumbnail&&<div style={{...(node.bigthumbnail?GridBigEntryStyle:GridEntryStyle), marginBottom:isMobile?"50px":"0"}} 
        onPointerOver={()=>{setHovered(true)}}
        onPointerOut={()=>{setHovered(false)}}>
        <Link to={slug}>
          {!isMobile&&
            <div style={{...TitlesContainerStyle, opacity: hovered?1:0}}>
              <span style={{...GridTitleStyle, color: node.thumbhovercolour}}>{node.title}</span>
            </div>
          }
          {node.thumbnail.childImageSharp&&
            <GatsbyImage image={getImage(node.thumbnail.childImageSharp)} alt={node.title} 
              /*account for aspect ratio in big thumb*/ style={{paddingBottom: node.bigthumbnail?"9px":0}}/>
          }{!node.thumbnail.childImageSharp&&
            <img style={{width: "100%"}} src={node.thumbnail.publicURL} alt={node.title} />
          }
        </Link>
      {isMobile&&
        <span style={mobileSubtitleStyle}>{node.title}</span>
      }
      </div>}
  </>
}

const Grid = ({category, nodes, isMobile}) => {
  return <>
    <div style={isMobile?GridContainerMobileStyle:GridContainerStyle}> 
      {nodes.filter(
        node => node.node.frontmatter.category === category || category === "Alle"
      ).map((node,i)=><GridElement node={node.node.frontmatter} slug={node.node.fields.slug} key={i} isMobile={isMobile} minigrid={false}/>)}
    </div>
  </>
}


const Was = ({data}) => {
  const isMobile = useIsMobile();
  const [category, setCategory] = useState("Alle")
  return <Layout title="Unfug">
    <GatsbySeo
        title="Was?"
        description="Eine Übersicht über Studio Erikas Werke und Projekte"
      />
    <div style={mainContainerStyle}>
      <SelectionMenu selectionSetter={setCategory} selection={category} isMobile={isMobile}/>
      <Grid category={category} nodes={data.allMarkdownRemark.edges} isMobile={isMobile}/>
    </div>
  </Layout>
}

export const query = graphql`
query WasQuery {
  allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/(projekte)/"}}
    sort: {frontmatter: {order: DESC}}
  ) {
    edges {
      node {
        fields{
          slug
        }
        frontmatter {
          category
          title
          thumbnail {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            publicURL
          }
          thumbhovercolour
          bigthumbnail
        }
      }
    }
  }
}
`
export default Was
