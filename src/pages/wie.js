import React from "react"
import Layout from "../components/layout"
import "../components/invertcursor.css"
import Wie600 from "../videos/wie-600.mp4"

const mainContainerStyle = {
  background: "#141414",
  minHeight: "calc(100vh - 280px)",
  margin: "-20px",
  marginBottom: "50px",
  padding: "150px 20px 20vh 20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}


const videoStyles = {
  borderRadius: "14px",
  maxWidth: "100%",
  maxHeight: "calc(100vh - 300px)",
}

const Wie = ()=>{
  return <Layout title="Prozess">
    <div style={mainContainerStyle}>
      <video controls={false} muted loop playsInline autoPlay style={videoStyles}>
        <source src={Wie600} type={"video/mp4"}/>
      </video>
    </div>
  </Layout>
}

export default Wie