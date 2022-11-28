import React from "react"
import Footer from "./footer"
import Header from "./header"
import "./layout.css"

export default function Layout({ children }) {
  return <div style={{position: "relative", minHeight: "100vh"}}>
      <Header />
      {children}
      <Footer />
    </div>
}