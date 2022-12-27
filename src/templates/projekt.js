import * as React from "react"
import Layout from "../components/layout"
import "../components/invertcursor.css"
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import Fade from 'react-reveal/Fade';
import { Link } from "gatsby-link"
import Image from "../components/Image"

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

export default function Projekt(props){
  const {title, erikamacht, grafikund, header, werwaswieso, client, content} = props.pageContext;
  const [collapsed, setCollapsed] = useState(true);
  const [height, setHeight] = useState(0);
  const infoRef = useRef(null);
  useEffect(()=>{
    if (infoRef && infoRef.current){
      setHeight(collapsed?0:infoRef.current.scrollHeight)
    }
  }, [collapsed])
  return (
    <Layout title={grafikund}>
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
            console.log(n.type)
            if (n.type==="coverimageobject") {
                return (
                <div style={{marginBottom: "20px"}} key={i}>
                  <Image image={n.coverimage.childImageSharp} alt={n.alttext} url={n.coverimage.publicURL}/>
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
            } else {
              return <></>
            }
          })}
        </div>

        <Link to="/was">
          <RoundButton content="zurück" collapsed={true} setCollapsed={()=>{}} />
        </Link>
        <div style={{marginBottom: "100px"}}></div>

      </div>
    </Layout>
  )
}