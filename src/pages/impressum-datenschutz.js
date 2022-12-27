import React from "react"
import Layout from "../components/layout"
import { graphql } from 'gatsby'
import "../components/impressum.css"
import { GatsbySeo } from "gatsby-plugin-next-seo"


const Impressum = ({data}) => {
  return <Layout title="Datenschutz">
    <GatsbySeo
        title="Impressum und Datenschutz"
        description=""
        noindex={true}
        nofollow={true}
      />
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