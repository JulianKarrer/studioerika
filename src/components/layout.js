import React from "react"
import Footer from "./footer"
import Header from "./header"
import "./layout.css"

export default function Layout({ children }) {
  return<> 
    <div style={{position: "relative", minHeight: "100vh", padding: "20px"}}>
      <Header />
      {children}
    </div>
    <div style={{marginTop: "50px", position: "relative", padding: "20px"}}>
      <Footer />
    </div>
  </>
}