import React from "react"
import Layout from "../components/layout"
import "../components/invertcursor.css"
import Wie600 from "../videos/wie-600.mp4"
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
  maxWidth: "100%",
  maxHeight: "70vh",
  margin: "20px"
}

const containedObject = {
  maxWidth: "100%",
  maxHeight: "100%",
  height: "70vh",
}

const Wie = ()=>{
  return <Layout title="Prozess">
    <GatsbySeo
        title="Wie?"
        description="Unser kreativer Schaffensprozess visualisiert."
      />
    <div style={mainContainerStyle}>
      <div style={innerContainer}>
        <video controls={false} muted loop playsInline autoPlay style={containedObject}>
          <source src={Wie600} type={"video/mp4"}/>
        </video>
      </div>
    </div>
  </Layout>
}

export default Wie