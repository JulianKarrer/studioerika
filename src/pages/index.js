import * as React from "react"
import { useState } from "react"
import {useIsMobile} from "../hooks/useMobile"
import useInterval from "../hooks/useInterval"
import { useMousePos } from "../hooks/useMousePos"
import ErikaMp4 from "../videos/erikatanzt_quer_web.mp4"
import Layout from "../components/layout"

const pageStyles = {
  overflow: "hidden",
}

const bigHeaderStyles = {
  marginTop: "-20px",
  fontSize: "14vmin",
  fontFamily: "ZIGZAG, -apple-system, Roboto, sans-serif, serif"
}

const bigHeaderMobileStyles = {
  marginTop: "30px",
  fontSize: "14vmin",
  fontFamily: "ZIGZAG, -apple-system, Roboto, sans-serif, serif"
}

const videoContainerStyles = {
  width: "200px",
  maxWidth: "calc(-40px + 90vw)",
  position: "absolute",
  top: "80vh",
  transform: "translate3d(-50%, -50%, 0)",
  left: "50vw",
  overflow: "hidden",
}

const videoStyles = {

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

  return(
  <div style={isMobile?bigHeaderMobileStyles:bigHeaderStyles}>
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
    <Layout title="">
      <main style={{...pageStyles, ...(isMobile?{minHeight: "calc(100vh + 100px)"}:{})}}>
        <BigHeader />
        <div style={videoContainerStyles}>
          <video controls={false} muted loop playsInline autoPlay style={videoStyles}>
            <source src={ErikaMp4} type={"video/mp4"} />
          </video>
        </div>
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Studio Erika</title>
