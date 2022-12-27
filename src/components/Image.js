import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";


const Image = ({image, alt, url, style})=>{
  return <>
    {image&&<GatsbyImage image={getImage(image)} alt={alt} style={{...style}}  />}
    {!image&&
      <img src={url} alt={alt} style={{width: "100%", ...style}}/>
    }
  </>
}

export default Image