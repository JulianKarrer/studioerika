import React from "react"
import { Link } from "gatsby"
import { useIsMobile } from "../hooks/useMobile"

const containerStyle = {
  mixBlendMode: "difference", 
  color: "white", 
  zIndex: "10",
  position: "relative",
}

const linkStyle = {
  fontFamily: "SuisseWorks, serif",
  textDecoration: "none",
  fontSize: "20px",
  color: "white",
  paddingRight: "10px",
}

const headerTopLeftStyle = {
  fontSize: "20px",
  fontFamily: "ZIGZAG, -apple-system, Roboto, sans-serif, serif",
  textDecoration: "uppercase",
  position: "fixed",
  textDecorationLine: "none",
  color: "white",
  top: 20,
  left: 20,
}

const divStyle = {
  position: "fixed",
  top: 20,
  right: 20,
}

const divStyleMobile = {
  paddingBottom: 0,
  position: "fixed",
  top: 70,
  left: 20,
}

const divStyleMobileMainPage = {
  paddingBottom: 0,
  position: "fixed",
  top: 20,
  left: 20,
}

export default function Header({title}) {
  const isMobile = useIsMobile();
  return <div style={containerStyle}>
    <div style={isMobile?(window.location.pathname !== "/"?divStyleMobile:divStyleMobileMainPage):divStyle}>
      <Link style={linkStyle} to="/">Was</Link>
      <Link style={linkStyle} to="/wer">Wer</Link>
      <Link style={linkStyle} to="/">Wie</Link>
      <Link style={linkStyle} to="/">Wo</Link>
    </div>
    {window.location.pathname !== "/"&&
  <Link style={headerTopLeftStyle} to="/">Studio Erika<br/>Grafik und {title}</Link>}
  </div>
}