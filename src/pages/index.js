import * as React from "react"
import { useState } from "react"
import Layout from "../components/layout"
import {useIsMobile} from "../hooks/useMobile"
import useInterval from "../hooks/useInterval"
import { useMousePos } from "../hooks/useMousePos"
import useWindowSize from "../hooks/useWindowSize"
import ErikaMp4 from "../videos/erikatanzt_quer_web.mp4"

const pageStyles = {
  padding: "20px",
  overflow: "hidden",
}

const bigHeaderStyles = {
  fontSize: "14vmin",
  fontFamily: "ZIGZAG, -apple-system, Roboto, sans-serif, serif"
}

const videoStyles = {
  width: "200px",
  maxWidth: "calc(-40px + 90vw)",
  position: "fixed",
  top: "75vh",
  transform: "translate3d(-50%, -50%, 0)",
  left: "50vw",
}

const headerWords = [
  "Schlingelei",
  "Schmackes",
  "Beflügeltes",
  "Fabelfrohes",
  "Schlummern",
  "Augenweiden",
  "Brausewinde",
  "Himmelvolles",
  "Hüpfdohlerei",
  "Sperenzchen ",
  "Sonderbares",
  "Wunderbares",
  "Rotzfreches ",
  "Spitzfingeriges",
  "Wohlbezuckertes",
  "Wundersames",
  "Freudentaumel",
  "Gänsefüßchen",
  "Luftschlangen",
  "Schabernack",
  "Katzenbabys",
  "Wonneproppen",
]


const headerWordsMobile = [
  "Wunder",
  "Unfug",
  "Zauber",
  "Freude",
  "Knall",
  "Krawall",
  "Zucker",
  "Firlefanz",
  "Humbug",
  "Mätzchen",
  "Schmaus",
  "Übermut",
  "Kopfkino",
  "Klimbim",
  "Mumpitz",
  "Holdes",
  "Lottriges",
]

const HEADER_GRID_SIZE = 50;
const BigHeader = () => {
  const isMobile = useIsMobile()
  const mousePos = useMousePos()
  const [mobileWord, setMobileWord] = useState(0);
  useInterval(()=>{setMobileWord((mobileWord + 1)%headerWordsMobile.length)}, 1000)
  const size = useWindowSize();

  return(
  <div style={bigHeaderStyles}>
    STUDIO ERIKA<br/>GRAFIK UND<br/>{isMobile&&
      headerWordsMobile[mobileWord]
    }{!isMobile&&
      headerWords[
        ( Math.floor(mousePos.x/HEADER_GRID_SIZE)
        + (Math.floor(mousePos.y/HEADER_GRID_SIZE)*3)  )
        % headerWords.length
      ]
    }
  </div>
  )
}

const IndexPage = () => {
  const isMobile = useIsMobile()
  return (
    <Layout>
      <main style={{...pageStyles, ...(isMobile?{minHeight: "calc(100vh + 100px)"}:{})}}>
        <BigHeader />
        <video controls={false} muted loop playsInline autoPlay style={videoStyles}>
          <source src={ErikaMp4} type={"video/mp4"} />
        </video>
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Studio Erika</title>
