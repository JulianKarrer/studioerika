import React from "react"
import { useIsMobile } from "../hooks/useMobile"
import { Link } from "gatsby"

const linkStyle = {
  fontSize: "15px",
  fontFamily: "SuisseWorks, serif",
  textDecoration: "none",
  color: "#141414",
}

const adressStyle = {
  display: "flex",
  flexDirection: "column",
  fontSize: "20px",
  fontFamily: "ZIGZAG, -apple-system, Roboto, sans-serif, serif",
  textDecoration: "none",
  color: "#141414",
}

const leftStyle = {
  position: "absolute",
  bottom: 20,
  display: "flex",
}

const rightStyle = {
  bottom: 20,
  position: "absolute",
  right: 40,
}
const middleStyle = { 
  bottom: 20,
  position: "absolute",
  left: "50vw",
  transform: "translateX(-50%)"
}

const containerMobileStyle = {
  display: "flex",
  position: "absolute",
  bottom: 0,
  flexDirection: "column",
  columnGap: "10px",
}

const rowMobileStyle = {
  marginBottom: 10,
}

export default function Footer() {
  const isMobile = useIsMobile();
  return <div style={{...(isMobile?containerMobileStyle:{})}}>
    <div style={{...adressStyle, ...(isMobile?rowMobileStyle:leftStyle)}}>
      <span>MEHLSTRAßE 1, 87435 KEMPTEN<br/></span>
      <a style={adressStyle} href="tel:004983159188639">TEL 0831 591 886 39</a><br/>
      <a style={adressStyle} href="mailto:hallo@studioerika.de">HALLO@STUDIOERIKA.DE</a></div>
    <a style={{...linkStyle, ...(isMobile?rowMobileStyle:middleStyle)}}
      href="https://www.instagram.com/erikagrafik/" target="_blank" rel="noopener noreferrer" >Instagram</a>
    <div style={(isMobile?rowMobileStyle:rightStyle)}>
      <Link to="/impressum-datenschutz" style={linkStyle}>Impressum + Datenschutz</Link></div>
  </div>
}