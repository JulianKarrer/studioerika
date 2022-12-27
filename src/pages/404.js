import * as React from "react"
import Layout from "../components/layout"
import gif from "../images/404.gif"
import { GatsbySeo } from "gatsby-plugin-next-seo"

const bigHeaderStyles = {
  fontSize: "9vmin",
  fontFamily: "ZIGZAG, -apple-system, Roboto, sans-serif, serif",
  lineHeight: "1",
  marginBottom: "50px"
}

const ContainerStyle = {
  position:"absolute", 
  top:"50%", 
  left:"50%", 
  width:"80%", 
  transform:"translate3d(-50%, -50%, 0)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

const NotFoundPage = () => {
  return (
    <Layout>
      <GatsbySeo
        title="Error 404"
        description="Seite nicht gefunden"
        noindex={true}
        nofollow={true}
      />
      <div style={ContainerStyle}>
        <h1 style={bigHeaderStyles}>Error 404<br/>diese Seite existiert nicht</h1>
        <img alt="Error 404" src={gif} style={{float: "right", maxWidth:"100%", width:"300px"}}/>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
