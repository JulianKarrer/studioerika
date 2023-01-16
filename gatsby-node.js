const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// create pages API
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const template = path.resolve(`src/templates/projekt.js`)
  const result = await graphql(`
  query ProjectPagesQuery {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(projekte)/"}}) {
      edges {
        node {
          frontmatter {
            title
            category
            erikamacht
            grafikund
            header
            werwaswieso
            client
            content {
              type
              coverimage {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
                }
                publicURL
              }
              doubleimage1 {
                childrenImageSharp {
                  gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
                }
                publicURL
              }
              doubleimage2 {
                childrenImageSharp {
                  gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
                }
                publicURL
              }
              alttext
              alttext1
              alttext2
              url
              mp4file
              portraitimage{
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
                }
                publicURL
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
  `)
  result.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      path: `${edge.node.fields.slug}`,
      component: template,
      context: {
        title: edge.node.frontmatter.title,
        category: edge.node.frontmatter.category,
        erikamacht: edge.node.frontmatter.erikamacht,
        grafikund: edge.node.frontmatter.grafikund,
        header: edge.node.frontmatter.header,
        werwaswieso: edge.node.frontmatter.werwaswieso,
        client: edge.node.frontmatter.client,
        content: edge.node.frontmatter.content,
      },
    })
  })
}