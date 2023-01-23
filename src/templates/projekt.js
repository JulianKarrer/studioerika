import * as React from "react"
import Layout from "../components/layout"
import "../components/invertcursor.css"
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import Fade from 'react-reveal/Fade';
import { Link } from "gatsby-link"
import Image from "../components/Image"
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { graphql } from 'gatsby'
import { useIsMobile } from "../hooks/useMobile"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const mainContainerStyle = {
  background: "#141414",
  color: "#f5f4f0",
  margin: "-20px",
  padding: "20px 20px 20px 20px",
  display: "flex",
  flexDirection: "column",
  fontFamily: "SuisseIntlBook",
  fontSize: "16pt",
  marginBottom: "50px",
}

const headerContainerStyle = {
  display: "flex",
  alignItems: "center",
  minHeight: "calc(100vh - 20px)"
}

const headerStyle = {
  width: "100%",
  textAlign: "center",
  fontFamily: "ZIGZAG, non-serif",
  textTransform: "uppercase",
  fontSize: "10vmin",
  lineHeight: "1",
  margin: 0
}

const infoContainer = {
  display: "flex",
  flexDirection: "column",
  maxHeight: 0,
  transition: "max-height 500ms ease-out",
  overflow: "hidden",
  marginBottom: "100px",
  lineHeight: 1.4,
  letterSpacing: "1px",
}

const contentContainer = {
  marginBottom: "100px",
}

const smallHeader = {
  fontSize: "9pt",
  marginTop: 50,
  marginBottom: "-15px",
}

const roundButton = {
  position:"absolute",
  color: "#141414",
  background: "#f5f4f0",
  transition: "color 700ms ease-in-out 0s",
  left: "50vw",
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
}

const infoButton = {
  top: "calc(100vh - 120px)",
}

const RoundButton = ({content, collapsed, setCollapsed, style}) => {
  return <button 
    onClick={() => setCollapsed(!collapsed)} 
      style={{...roundButton, color: collapsed?"#141414":"#f5f4f0", background: collapsed?"#f5f4f0":"#141414", ...style}}>
    {content}
  </button>
}

const GridContainerStyle = {
  display:"grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gridGap: "20px",
  marginBottom: "100px",
}

const GridContainerMobileStyle = {
  display:"grid",
  gridTemplateColumns: "1fr 1fr",
  gridGap: "20px",
  marginBottom: "100px",
}


const mobileGridSubtitleStyle = {
  fontSize: "14pt",
  fontFamily: "ZIGZAG, non-serif",
  color: "#f5f4f0",
  marginBottom: "0px",
  marginTop: "-20px",
  wordWrap: "anywhere",
}
const GridTitleStyle = {
  fontSize: "16pt",
  fontFamily: "ZIGZAG, non-serif",
  zIndex: "1",
  width: "100%",
  textAlign: "center",
  wordWrap: "anywhere",
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
  transition: "linear 100ms opacity",
  zIndex: "2",
}
const GridElement = ({node, isMobile, slug}) => {
  const [hovered, setHovered] = useState(false)
  return <>
      {node.thumbnail&&<div style={GridEntryStyle} 
        onPointerOver={()=>{setHovered(true)}}
        onPointerOut={()=>{setHovered(false)}}>
        <Link to={slug}>
          {!isMobile&&
            <div style={{...TitlesContainerStyle, opacity: hovered?1:0}}>
              <span style={{...GridTitleStyle, color: node.thumbhovercolour}}>{node.title}</span>
            </div>
          }
          {node.thumbnail.childImageSharp&&
            <GatsbyImage image={getImage(node.thumbnail.childImageSharp)} alt={node.title} />
          }{!node.thumbnail.childImageSharp&&
            <img style={{width: "100%"}} src={node.thumbnail.publicURL} alt={node.title} />
          }
        </Link>
      {isMobile&&
        <span style={mobileGridSubtitleStyle}>{node.title}</span>
      }
      </div>}
  </>
}

export default function Projekt(props){
  const {title, category, erikamacht, grafikund, header, werwaswieso, client, content} = props.pageContext;
  const [collapsed, setCollapsed] = useState(true);
  const [height, setHeight] = useState(0);
  const infoRef = useRef(null);
  const isMobile = useIsMobile();
  const recommended = props.data.allMarkdownRemark.edges;
  useEffect(()=>{
    if (infoRef && infoRef.current){
      // console.log(content)
      setHeight(collapsed?0:infoRef.current.scrollHeight)
    }
  }, [collapsed])
  return (
    <Layout title={grafikund}>
    <GatsbySeo
      title={title}
      description={header}
    />
      <div style={mainContainerStyle}>
        {/* header */}
        <div style={headerContainerStyle}>
          <Fade>
            <h1 style={headerStyle}>{header}</h1>
          </Fade>
          <RoundButton content={"Info"} collapsed={collapsed} setCollapsed={setCollapsed} style={infoButton} />
        </div>

        {/* info box */}
        <div style={{...infoContainer, maxHeight: height}} ref={infoRef}>
          <Fade when={!collapsed}>
            <div style={{display:"flex", flexDirection:"column"}}>
              <span>{client}</span>
              {werwaswieso&&<>
                <span style={smallHeader}>Wer? Was? Wieso?</span>
                <p>{werwaswieso}</p>
              </>
              }
              {erikamacht&&<>
                <span style={smallHeader}>Das hat Erika gemacht:</span>
                <p>{erikamacht}</p>
              </>}
            </div>
          </Fade>
        </div>


        {/* content */}
        <div style={contentContainer}>
          {content&&content.map((n,i)=>{
            console.log(n)
            if (n.type==="coverimageobject") {
                return (
                <div style={{marginBottom: "20px"}} key={i}>
                  <Image image={n.coverimage.childImageSharp} alt={n.alttext} url={n.coverimage.publicURL}/>
                </div>)
            } else if (n.type==="portraitimageobject") {
              return (
              <div style={{marginBottom: "20px"}} key={i}>
                <Image image={n.portraitimage.childImageSharp} alt={n.alttext} url={n.portraitimage.publicURL}/>
              </div>)
            } else if (n.type==="doubleimageobject"){
              return(
              <div style={{marginBottom: "20px", display: "flex", justifyContent: "space-between"}} key={i}>
                <Image 
                  image={n.doubleimage1.childrenImageSharp[0]} 
                  alt={n.alttext1} 
                  style={{width: "calc(50% - 10px)"}}
                  url={n.doubleimage1.publicURL} />
                <Image 
                  image={n.doubleimage2.childrenImageSharp[0]} 
                  alt={n.alttext1} 
                  style={{width: "calc(50% - 10px)"}}
                  url={n.doubleimage2.publicURL} />
              </div>)
            } else if (n.type==="youtubelink"){
              return(
              <div style={{marginBottom: "20px", display: "flex", justifyContent: "space-between"}} key={i}>
                <iframe style={{width: "100%", height: "calc(0.5625 * calc(100vw - 40px))",}} src={n.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
              </div>)
            } else if (n.type==="mp4fileobject"){
              return(
              <video controls={false} muted loop playsInline autoPlay style={{width: "100%", marginBottom: "20px",}}>
                <source src={n.mp4file} type={"video/mp4"}/>
              </video>
              )
            } else if (n.type==="image-video"){
              return(
                <div style={{display: "flex", marginBottom: "20px", justifyContent: "space-between", 
                  flexDirection: n.image_video_left?"row":"row-reverse"
                }}>
                  <Image 
                    image={n.image_video_imageobject.image_video_image.childImageSharp} 
                    alt={n.alttext1} 
                    style={{width: "calc(50% - 10px)"}}
                    url={n.image_video_imageobject.image_video_image.publicURL} />
                  <video controls={false} muted loop playsInline autoPlay style={{width: "calc(50% - 10px)"}}>
                    <source src={"/"+n.image_video_mp4fileobject.image_video_mp4file.relativePath} type={"video/mp4"}/>
                  </video>
                </div>
              )
            } else if (n.type==="video-video"){
              return(
              <div style={{display: "flex", marginBottom: "20px", justifyContent: "space-between" }}>
                <video controls={false} muted loop playsInline autoPlay style={{width: "calc(50% - 10px)"}}>
                  <source src={"/"+n.video_video_1.mp4filevv1.relativePath} type={"video/mp4"}/>
                </video>
                <video controls={false} muted loop playsInline autoPlay style={{width: "calc(50% - 10px)"}}>
                  <source src={"/"+n.video_video_2.mp4filevv2.relativePath} type={"video/mp4"}/>
                </video>
              </div>
              )
            } else {
              return <></>
            }
          })}
        </div>

        {/* recommended further content*/}
        <div style={{...infoContainer, maxHeight: "", marginBottom: "20px"}}>
          <Fade>
            <div style={{display:"flex", flexDirection:"column"}}>
              <span style={{fontFamily: "ZIGZAG"}}>{"Ähnliche Projekte"}</span>
            </div>
          </Fade>
        </div>
        <div style={isMobile?GridContainerMobileStyle:GridContainerStyle}> 
          {recommended.filter(
            node => (node.node.frontmatter.category === category || category === "Alle") && node.node.frontmatter.title !== title
          ).slice(0,8)
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
          .map((node,i)=>{
            node.node.frontmatter.bightumbnail = false
            return <GridElement node={node.node.frontmatter} slug={node.node.fields.slug} key={i} isMobile={isMobile} minigrid={true}/>
          })}
        </div>

        <Link to="/was">
          <RoundButton content="zur Übersicht" collapsed={true} setCollapsed={()=>{}} />
        </Link>
        <div style={{marginBottom: "100px"}}></div>

      </div>
    </Layout>
  )
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