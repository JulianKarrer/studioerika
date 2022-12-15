const path = require(`path`)

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
            slug
            title
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
              }
              doubleimage1 {
                childrenImageSharp {
                  gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
                }
              }
              doubleimage2 {
                childrenImageSharp {
                  gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
                }
              }
              alttext
              alttext1
              alttext2
              url
            }
          }
        }
      }
    }
  }
  `)
  result.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      path: `projekte/${edge.node.frontmatter.slug}`,
      component: template,
      context: {
        title: edge.node.frontmatter.title,
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