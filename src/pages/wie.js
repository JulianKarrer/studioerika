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
  background: "#f5f4f0",
  color: "#141414",
  left: "30%",
  top: "0px",
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
            style={roundButton}>
          {muted?"Ton aus":"Ton an"}
        </button>

        <video controls={false} muted={muted} loop playsInline autoPlay style={containedObject}>
          <source src={Wie600} type={"video/mp4"}/>
        </video>
      </div>
    </div>
  </Layout>
}

export default Wie