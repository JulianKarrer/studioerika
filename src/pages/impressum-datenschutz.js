import React from "react"
import Layout from "../components/layout"
import { graphql } from 'gatsby'
import "../components/impressum.css"


const Impressum = ({data}) => {
  return <Layout title="Datenschutz">
    <div
      className="container"
      dangerouslySetInnerHTML={{ __html: data.allMarkdownRemark.nodes[0].html }} />
  </Layout>
}

export default Impressum


export const query = graphql`
query ImpressumQuery {
  allMarkdownRemark(filter: {frontmatter: {title: {eq: "Impressum"}}}) {
    nodes {
      html
    }
  }
}`