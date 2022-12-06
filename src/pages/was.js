import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from '../components/layout'
import "../components/invertcursor.css"
import "../components/was.css"
import { useState } from 'react'
import { useIsMobile } from '../hooks/useMobile'

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
      textDecorationLine: name === selection ? "underline" : "none" ,
    }} 
    onClick={()=>{setter(name)}}>
      {name}
    </button>
}

const SelectionMenu = ({selectionSetter, selection, isMobile}) => {
  return <div style={selectionMenuContainer}>
    {["Alle", "Raum", "Grafik", "Marke", "Editorial", "Online", "Illustration", "Spiel"].map((name,i) => {
      return <Selection name={name} setter={selectionSetter} selection={selection} key={i+999} isMobile={isMobile}/>
    })}
  </div>
}

const GridContainerStyle = {
  display:"flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
}

const GridEntryDesktopStyle = {
  width: "calc(33% - 15px)",
  marginBottom: "30px",
}

const GridEntryMobileStyle = {
  minWidth: "100%",
  marginBottom: "30px",
}

const GridTitleStyle = {
  fontSize: "30pt",
  fontFamily: "ZIGZAG, non-serif",
  zIndex: "1",
  width: "100%",
  textAlign: "center",
}

const GridSubtitleStyle = {
  fontSize: "12pt",
  fontFamily: "SuisseWorks, serif",
  zIndex: "1",
  textAlign: "center",
  width: "100%",
}

const GridEntryStyle = {
  position: "relative",
}

const TitlesContainerStyle = {
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
}

const mobileSubtitleStyle = {
  fontSize: "30pt",
  fontFamily: "ZIGZAG, non-serif",
  color: "#f5f4f0",
  marginBottom: "40px",
  marginTop: "-20px"
}

const GridElement = ({node, isMobile}) => {
  return <>
    <div style={{...(isMobile?GridEntryMobileStyle:GridEntryDesktopStyle), ...GridEntryStyle}} >
      <GatsbyImage image={getImage(node.thumbnail.childImageSharp)} alt={node.title} />
      {!isMobile&&
        <div style={TitlesContainerStyle} className='showonHover'>
          <span style={GridTitleStyle}>{node.title}</span>
          <span style={GridSubtitleStyle}>{node.category}</span>
        </div>
      }
    </div>
    {isMobile&&
      <span style={mobileSubtitleStyle}>{node.title}</span>
    }
  </>
}

const Grid = ({category, nodes, isMobile}) => {
  return <>
    <div style={GridContainerStyle}> 
      {nodes.filter(
        node => node.node.frontmatter.category === category || category === "Alle"
      ).map((node,i)=><>
        <GridElement node={node.node.frontmatter} key={i} isMobile={isMobile} />
        <GridElement node={node.node.frontmatter} key={i} isMobile={isMobile} />
        <GridElement node={node.node.frontmatter} key={i} isMobile={isMobile} />
        <GridElement node={node.node.frontmatter} key={i} isMobile={isMobile} />  
        <GridElement node={node.node.frontmatter} key={i} isMobile={isMobile} />
      </>
      )}
    </div>
  </>
}


const Was = ({data}) => {
  const isMobile = useIsMobile();
  const [category, setCategory] = useState("Alle")
  return <Layout title="Unfug">
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
        frontmatter {
          category
          title
          thumbnail {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
}
`
export default Was
