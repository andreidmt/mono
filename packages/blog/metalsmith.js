import { emoji } from "@metalreact/emoji"
import { fileMetadata } from "@metalreact/file-metadata"
import { mdx } from "@metalreact/mdx"
import { reactRender, reactLayouts } from "@metalreact/react-ssg"
import { swc } from "@metalreact/swc"
import collections from "@metalsmith/collections"
// import permalinks from "@metalsmith/permalinks"
import postcss from "@metalsmith/postcss"
import remove from "@metalsmith/remove"
// import rss from "@metalsmith/rss/lib/index.js"
// import toc from "@metalsmith/table-of-contents"

import boxen from "boxen"
import Metalsmith from "metalsmith"
// import shiki from "shiki"

// const highlighter = await shiki.getHighlighter({
//   themes: ["github-light"],
//   langs: ["javascript", "typescript"],
// })

const BUILD_START_TIME = performance.now()

await Metalsmith("./")
  .source("./src")
  .destination("./dist")
  .clean(true)
  .env({
    NODE_ENV: "development",
    DEBUG: "swc,mdx,reactLayouts,fileMetadata,reactRender",
  })
  .metadata({
    sitename: "Andrei Dumitrescu",
    siteurl: "https://andreidmt.xyz/",
    description: "Personal website of Andrei Dumitrescu",
    generator: "Metalsmith + React",
    generatorurl: "https://github.com/andreidmt/metalsmith-react",
  })
  .use(
    // Common file metadata
    fileMetadata({
      path: filePath => filePath,
      updatedAt: (_filePath, file) => {
        const fmUpdatedAt = /** @type {string} */ (file["updatedAt"])

        return fmUpdatedAt
          ? new Date(fmUpdatedAt)
          : file.stats?.mtime ?? file.stats?.birthtime
      },
      createdAt: (_filePath, file) => {
        const fmCreatedAt = /** @type {string} */ (file["createdAt"])

        return fmCreatedAt ? new Date(fmCreatedAt) : file.stats?.birthtime
      },
    })
  )
  .use(
    // Transpile CSS files
    postcss({
      pattern: "index.css",
      plugins: {
        "postcss-preset-env": { stage: 2 },
        "postcss-color-function": {},
        "postcss-import": {},
      },
    })
  )
  .use(
    // Remove source CSS files
    remove(["css/*"])
  )
  .use(
    // Transpile JS(X)/TS(X) files to JS files
    swc()
  )
  .use(
    // Compile MDX files into JS files with React components
    mdx({
      pattern: ["posts/**/*.(md|mdx)", "index.(md|mdx)"],
    })
  )
  .use(
    // Group posts files into paged and sorted collections
    collections({
      posts: {
        pattern: "posts/*/index.js",
        sortBy: "createdAt",
        reverse: true,
        limit: 25,
        refer: true,
        metadata: {
          layout: "posts.js",
        },
        filterBy: file => file.tags?.includes("post"),
      },
    })
  )
  .use(
    // Turn React page level components into HTML files
    reactRender({
      pattern: ["posts/*/*.js", "posts/*.js", "index.js"],
    })
  )
  .use(
    // Wrap React page level components with layouts
    reactLayouts({
      pattern: ["posts/*/*.html", "posts/*.html", "index.html"],
      layout: {
        directory: "layouts",
      },
    })
  )
  // Rewrite file paths
  // .use(
  //   permalinks({
  //     linksets: [
  //       {
  //         match: { collection: "posts" },
  //         pattern: ":title",
  //       },
  //     ],
  //   })
  // )
  // Remove source React components
  .use(remove(["layouts/*", "layouts/**/*"]))
  // Transform emoji shortcodes into SVGs or Unicode characters
  .use(
    emoji({
      pattern: ["**/*.html"],
    })
  )
  .build()

console.log(
  boxen(
    `Build successfull in ${(
      (performance.now() - BUILD_START_TIME) /
      1000
    ).toFixed(2)}s`,
    {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "green",
    }
  )
)

// .use(
//   rss({
//     feedOptions: {
//       title: "test",
//       site_url: "http://test.test",
//     },
//   })
// )
// .use(remove(["_layouts/**/*"]))
// .use(
//   layouts({
//     pattern: ["**/*.html", "*.html"],
//     default: "content.ejs",
//     directory: "src/_layouts",
//   })
// )
// .use(
//   markdown({
//     highlight: (input, language) => {
//       const tokens = highlighter.codeToThemedTokens(input, language)

//       return shiki.renderToHtml(tokens, {
//         elements: {
//           code: ({ className, style, children }) => {
//             return `<code class="${className}">${children}</code>`
//           },
//         },
//       })
//     },
//   })
// )
// .use(
//   transformMDtoHTML({
//     pattern: ["**/*.md", "*.md"],
//     parseMDElement: {
//       code: node => {
//         const lang = node.lang || "text"
//         const tokens = highlighter.codeToThemedTokens(node.value, lang)

//         const highlightLines = [4, 5, 6]
//         const codeHTML = shiki.renderToHtml(tokens, {
//           bg: "inherit",
//           elements: {
//             pre({ className, style, children }) {
//               return `<pre class="${className}" style="${style}">${children}</pre>`
//             },
//             // customize line to add line number and highlight current line
//             line({ className, index, children }) {
//               const shallHighlight = highlightLines.includes(index)
//               return `<span class="${className} ${
//                 shallHighlight ? "highlighted-line" : ""
//               }"><span class="line-number" disabled>${
//                 index + 1
//               }</span>${children}</span>`
//             },
//           },
//         })

//         node.type = "html"
//         node.value = codeHTML
//       },
//     },
//   })
// )
