import React from "react"
import { Link } from "gatsby"
import { useIsMobile } from "../hooks/useMobile"

const linkStyle = {
  fontFamily: "SuisseWorks, -apple-system, Roboto, sans-serif, serif",
  textDecoration: "none",
  fontSize: "20px",
  color: "#141414",
  paddingRight: "10px",
}

const divStyle = {
  position: "fixed",
  padding: "20px",
  top: 20,
  right: 20,
}

const divStyleMobile = {
  padding: "20px",
  paddingBottom: 0,
}

export default function Header() {
  const isMobile = useIsMobile();
  return <div style={isMobile?divStyleMobile:divStyle}>
    <Link style={linkStyle} to="/">Was</Link>
    <Link style={linkStyle} to="/">Wer</Link>
    <Link style={linkStyle} to="/">Wie</Link>
    <Link style={linkStyle} to="/">Wo</Link>
  </div>
}