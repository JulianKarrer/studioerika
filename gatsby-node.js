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
                  gatsbyImageData(
                    placeholder: BLURRED
                    layout: FULL_WIDTH
                    quality: 75
                    webpOptions: {quality: 75}
                  )
                }
                publicURL
              }
              doubleimage1 {
                childrenImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    layout: FULL_WIDTH
                    quality: 75
                    webpOptions: {quality: 75}
                  )
                }
                publicURL
              }
              doubleimage2 {
                childrenImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    layout: FULL_WIDTH
                    quality: 75
                    webpOptions: {quality: 75}
                  )
                }
                publicURL
              }
              alttext
              alttext1
              alttext2
              url
              mp4file
              portraitimage {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    layout: FULL_WIDTH
                    quality: 75
                    webpOptions: {quality: 75}
                  )
                }
                publicURL
              }
              image_video_left
              image_video_mp4fileobject {
                image_video_mp4file {
                  relativePath
                }
              }
              image_video_imageobject {
                alttext
                image_video_image {
                  childImageSharp {
                    gatsbyImageData(
                      placeholder: BLURRED
                      layout: FULL_WIDTH
                      quality: 75
                      webpOptions: {quality: 75}
                    )
                  }
                  publicURL
                }
              }
              video_video_1 {
                mp4filevv1 {
                  relativePath
                }
              }
              video_video_2 {
                mp4filevv2 {
                  relativePath
                }
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
        slug: edge.node.fields.slug,
      },
    })
  })
}