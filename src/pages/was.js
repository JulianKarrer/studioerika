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
import { useEffect } from 'react'
import {useLocalStorage} from '../hooks/useLocalStorage'

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

const GridEntryStyle = {
  position: "relative",
}

const GridBigEntryStyle = {
  position: "relative",
  gridColumnStart: "2 span",
  gridRowStart: "2 span",
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
  transition: "linear 100ms opacity",
  zIndex: "2",
}

const mobileSubtitleStyle = {
  fontSize: "30pt",
  fontFamily: "ZIGZAG, non-serif",
  color: "#f5f4f0",
  marginBottom: "40px",
  top: "5px",
  position: "relative",
  wordWrap: "anywhere",
}

const GridElement = ({node, isMobile, slug}) => {
  const [hovered, setHovered] = useState(false)
  return <>
      {node.thumbnail&&<div style={{...(node.bigthumbnail?GridBigEntryStyle:GridEntryStyle), 
        marginBottom:isMobile?"20px":"0",
      }} 
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
  const [betterNodes, setBetterNodes] = useState(nodes)

  // when the sequence of big and small nodes is wrong, empty slots can appear in the grid.
  // these scenarios are checked for and avoided
  const isNodesOk = (ns)=>{
    let smallSinceBig = 0
    // check if there are at least two small thumbnails between each big thumbnailed-node
    for(let i = 0; i<ns.length; i++){
      if (!ns[i].node.frontmatter.bigthumbnail){
        smallSinceBig ++;
      }
      else {
        if (smallSinceBig < 2) {return i}
        // also check if any big thumbnail is the third entry in a row
        if (i % 3 === 2) {return i}
        smallSinceBig = 0
      }
    }
    return -1
  }

  useEffect(()=>{
    let ns = Array.from(nodes.filter(
      node => node.node.frontmatter.category === category || category === "Alle"
    ))
    
    // upper bound on shuffle operations to avoid locking in impossible configurations
    let maxShuffles = 10000;
    while(maxShuffles>0){
      const problem = isNodesOk(ns)
      if (problem<0){setBetterNodes(ns); return}
      maxShuffles--;

      let other = problem===ns.length-1?0:problem+1
      while(other<ns.length-1 && ns[other].node.frontmatter.bigthumbnail){other++}

      [ns[problem], ns[other]] = [ns[other], ns[problem]]
      
      // ns = ns.map(value => ({ value, sort: Math.random() }))
      // .sort((a, b) => a.sort - b.sort)
      // .map(({ value }) => value)
    }
  }, [nodes, category])

  return <>
    <div style={isMobile?GridContainerMobileStyle:GridContainerStyle}> 
      {betterNodes.map((node,i)=><GridElement node={node.node.frontmatter} slug={node.node.fields.slug} key={i} isMobile={isMobile} minigrid={false}/>)}
    </div>
  </>
}


const Was = ({data}) => {
  const isMobile = useIsMobile();
  const [category, setCategory] = useLocalStorage("was-category","Alle")
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
