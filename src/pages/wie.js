import React, { useState } from "react"
import Layout from "../components/layout"
import "../components/invertcursor.css"
import Wie600 from "../videos/wie-720.mp4"
import { GatsbySeo } from "gatsby-plugin-next-seo"

const mainContainerStyle = {
  background: "#141414",
  minHeight: "calc(100vh)",
  margin: "-20px",
  marginBottom:"40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
}

const roundButton = {
  position:"absolute",
  transition: "color 700ms ease-in-out 0s",
  left: "30%",
  bottom: "-80px",
  transform: "translate3d(-50%, -50%, 0px)",
  border: "2px solid #000000",
  borderRadius: "50%",
  height: "80px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80px",
  cursor: "url('/maus.cur') 12 12, auto",
  fontFamily: "SuisseIntlBook, Sans-serif",
  zIndex: 2,
}

const Wie = ()=>{
  const [muted, setMuted] = useState(true)

  return <Layout title="Prozess">
    <GatsbySeo
        title="Wie?"
        description="Unser kreativer Schaffensprozess visualisiert."
      />
    <div style={mainContainerStyle}>
      <div style={innerContainer}>
        <button 
          onClick={() => setMuted(!muted)} 
            style={{...roundButton, color:muted?"#141414":"#f5f4f0", background:muted?"#f5f4f0":"#141414"}}>
          {muted?"Ton an":"Ton aus"}
        </button>

        <video controls={false} muted={muted} loop playsInline autoPlay style={containedObject}>
          <source src={Wie600} type={"video/mp4"}/>
        </video>
      </div>
    </div>
  </Layout>
}

export default Wie