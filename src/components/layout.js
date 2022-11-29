import React, { useEffect, useRef, useState } from "react"
import Footer from "./footer"
import Header from "./header"
import { useIdle, useInterval } from "react-use"
import "./layout.css"
import useWindowSize from "../hooks/useWindowSize"

const Canvas = ({positions,dimensions, ...props}) => {
  const ref = useRef(null)
  useEffect(()=>{
    console.log(positions)
    const ctx = ref.current.getContext("2d")
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    for (let pos of positions){
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 50, 0, 2*Math.PI, false)
      ctx.fillStyle = "white"
      ctx.fill()
    }
  }, [positions])
  return <canvas ref={ref} {...props} width={dimensions.width} height={dimensions.height}/>
}

const canvasStyle = {
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  pointerEvents: "none",
  userSelect: "none",
  zIndex: 99999,
}

export default function Layout({ children }) {
  // draw disks when user is idle
  const isIdle = useIdle(20e3)
  const [positions, setPositions] = useState([])
  const size = useWindowSize();
  // reset disks if the user becomes active
  useEffect(()=>{
    if (!isIdle) {
      setPositions([])
    } 
  }, [isIdle])
  // add a position to draw to randomly on a counter when idle
  useInterval(()=>{
    if(isIdle){
      setPositions(pos => [...pos, {x: Math.random()*size.width, y: Math.random()*size.height}])
    } 
  }, 5e3)

  return<> 
    <Canvas positions={positions} style={canvasStyle} dimensions={size}/>
    <div style={{position: "relative", minHeight: "100vh", padding: "20px"}}>
      <Header />
      {children}
    </div>
    <div style={{marginTop: "50px", position: "relative", padding: "20px"}}>
      <Footer />
    </div>
  </>
}