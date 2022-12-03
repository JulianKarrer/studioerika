import React from "react"
import { Link } from "gatsby"
import { useIsMobile } from "../hooks/useMobile"

const containerStyle = {
  color: "white", 
  zIndex: "10",
  position: "relative",
  mixBlendMode: "exclusion",
}

const linkStyle = {
  fontFamily: "SuisseWorks, serif",
  textDecoration: "none",
  fontSize: "20px",
  color: "white",
  paddingRight: "10px",
}

const linkActiveStyle = {
  textDecorationLine: "underline",
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
    <div style={isMobile?(title !== ""?divStyleMobile:divStyleMobileMainPage):divStyle}>
      <Link style={linkStyle} activeStyle={linkActiveStyle} to="/">Was</Link>
      <Link style={linkStyle} activeStyle={linkActiveStyle} to="/wer">Wer</Link>
      <Link style={linkStyle} activeStyle={linkActiveStyle} to="/wie">Wie</Link>
      <Link style={linkStyle} activeStyle={linkActiveStyle} to="/wo">Wo</Link>
    </div>
    {title !== ""&&
  <Link style={headerTopLeftStyle} to="/">Studio Erika<br/>Grafik und {title}</Link>}
  </div>
}