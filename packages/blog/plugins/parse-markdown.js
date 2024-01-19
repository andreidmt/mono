/** @typedef {import("unist-util-visit").BuildVisitor} BuildVisitor */

import sanitizeHTMLAst from "rehype-sanitize"
import toHTML from "rehype-stringify"
import remarkParse from "remark-parse"
import toHTMLAst from "remark-rehype"
import remarkGfm from "remark-gfm"
import remarkToc from "remark-toc"
import { unified } from "unified"

import shiki from "shiki"
import { visit } from "unist-util-visit"
import parseRawHTML from "rehype-raw"

const highlighter = await shiki.getHighlighter({
  themes: ["github-light"],
  langs: ["javascript", "typescript"],
})

const parseCodeBlocks = () => {
  return ast => {
    visit(ast, "code", node => {
      const lang = node.lang || "text"
      const tokens = highlighter.codeToThemedTokens(node.value, lang)

      const highlightLines = [4, 5, 6]
      const codeHTML = shiki.renderToHtml(tokens, {
        bg: "inherit",
        elements: {
          pre({ className, style, children }) {
            return `<pre class="${className}" style="${style}">${children}</pre>`
          },
          // customize line to add line number and highlight current line
          line({ className, index, children }) {
            const shallHighlight = highlightLines.includes(index)
            return `<span class="${className} ${
              shallHighlight ? "highlighted-line" : ""
            }"><span class="line-number" disabled>${
              index + 1
            }</span>${children}</span>`
          },
        },
      })

      node.type = "html"
      node.value = codeHTML
    })
  }
}

/**
 * Transform Markdown files to HTML using remark and rehype.
 *
 * @param {Object} options
 * @param {string|string[]} options.pattern - Glob pattenrs to match files against
 * @param {boolean} options.isGitHubFlavored - Enable GitHub Flavored Markdown
 * @param {Object} options.gitHubFlavoredOptions - Options to pass to remark-gfm
 * @param {boolean} options.hasTableOfContents - Enable table of contents
 * @param {Object} options.tableOfContentsOptions - Options to pass to remark-toc
 * @param {Object<string, Function>} options.parseMDElements
 */
const transformMDtoHTML = ({
  pattern = ["**/*.md", "*.md"],
  isGitHubFlavored = true,
  gitHubFlavoredOptions = {},
  hasTableOfContents = true,
  tableOfContentsOptions = {
    maxDepth: 3,
  },
  parseMDElements = {},
} = {}) => {
  const parseMD = unified()
    .use(remarkParse)
    .use(...(isGitHubFlavored ? [remarkGfm, gitHubFlavoredOptions] : []))
    .use(...(hasTableOfContents ? [remarkToc, tableOfContentsOptions] : []))
    // .use(Object.keys(parseMDElements) > 0 ? parseMDElements : undefined)
    .use(toHTMLAst, {
      allowDangerousHtml: true,
    })
    .use(parseRawHTML)
    .use(sanitizeHTMLAst, {
      attributes: {
        "*": ["style", "className"],
        a: ["href", "name", "target", "rel"],
      },
    })
    .use(toHTML)

  return (files, metalsmith) => {
    const debug = metalsmith.debug("transformMDtoHTML")
    const markdownFiles = metalsmith.match(pattern, Object.keys(files))

    debug("Running with options: %o", { pattern })
    debug("Transforming %s Markdown files to HTML", markdownFiles.length)

    markdownFiles.forEach(fileName => {
      const file = files[fileName]
      const htmlFileName = fileName.replace(/\.md$/, ".html")

      files[htmlFileName] = file
      file.contents = parseMD.processSync(file.contents)

      // remove markdown file
      delete files[fileName]
    })
  }
}

export { transformMDtoHTML }
