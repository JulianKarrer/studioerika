/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Studio Erika`,
    siteUrl: `https://www.studioerika.de`
  },
  plugins: ["gatsby-plugin-netlify-cms", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Studio Erika`,
        short_name: `Studio Erika`,
        start_url: `/`,
        background_color: `#141414`,
        theme_color: `f5f4f0`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
      },
  },
  {
    resolve: `gatsby-plugin-sharp`,
    options: {
      defaults: {
        formats: [/*`avif`,*/ `webp`, `png`, `auto`],
        breakpoints: [750, 1080, 1366, 1920],
        backgroundColor: `transparent`,
        placeholder: "blurred"
      }
    }
  }, "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "content",
      path: `${__dirname}/content`,
    },
  },
  "gatsby-transformer-remark",
  'gatsby-plugin-next-seo',
  // "gatsby-plugin-transition-link",
  {
    resolve:'gatsby-plugin-copy-files-enhanced',
    options:{
      source:`${__dirname}/content/projekte`,
      destination:'/projekte/',
      purge:true,
    }
  },
]
};