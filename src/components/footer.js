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
      <span>
        <a href="https://www.google.com/maps/place/Studio+Erika+%E2%80%93+Grafik+und+Unfug/@47.7250247,10.3180975,17.58z/data=!4m13!1m7!3m6!1s0x479c7911df652fd3:0xebe7db517241cd3d!2sMehlstra%C3%9Fe+1,+018953+Kempten+(Allg%C3%A4u)!3b1!8m2!3d47.7249499!4d10.3186744!3m4!1s0x479c7967c63fcd95:0x22f947ddc60c7484!8m2!3d47.7250321!4d10.3186925" style={adressStyle} target="_blank" rel="noopener noreferrer" >
          MEHLSTRAßE 1, 87435 KEMPTEN<br/>
        </a>
      </span>
      <span style={{display: "flex", flexDirection: "column"}}>
        <a style={{...adressStyle, marginRight: "10px"}} href="tel:004983159188639">TEL 0831 591 886 39</a> 
        <a style={adressStyle} href="mailto:hallo@studioerika.de">HALLO@STUDIOERIKA.DE</a>
      </span>
    </div>
    <a style={{...linkStyle, ...(isMobile?rowMobileStyle:middleStyle)}}
      href="https://www.instagram.com/erikagrafik/" target="_blank" rel="noopener noreferrer" >Instagram</a>
    <div style={(isMobile?rowMobileStyle:rightStyle)}>
      <Link to="/impressum-datenschutz" style={linkStyle}>Impressum + Datenschutz</Link></div>
  </div>
}