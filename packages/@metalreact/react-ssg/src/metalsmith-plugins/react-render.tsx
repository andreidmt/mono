/* eslint-disable unicorn/no-await-expression-member */

import { mkdir } from "node:fs/promises"
import path from "node:path"

import { importDefault } from "@andreidmt/utils-import"
import { writeAllFiles } from "@andreidmt/utils-metalsmith"
import { renameFile } from "@andreidmt/utils-path"
import { Plugin as MetalPlugin, File as MetalFile } from "metalsmith"
import { ComponentType, PropsWithChildren } from "react"
import ReactDOMServer from "react-dom/server"

import { FrontmatterProvider } from "../react-hooks/use-frontmatter.js"
import { MetalsmithProvider } from "../react-hooks/use-metalsmith.js"

const CACHE_FOLDER_PATH = path.join(
  process.cwd(),
  ".cache",
  "react-ssg",
  "react-render"
)

/**
 * Compile JS to HTML. The file needs to export a React component as default
 * and already have been transpiled to JS.
 */

type CompileJSToHTML = (
  filePath: string,
  props?: {
    pageFrontmatter?: Record<string, unknown>
    metalsmithMetadata?: Record<string, unknown>
  }
) => Promise<string>

const compileJSToHTML: CompileJSToHTML = async (
  filePath,
  { pageFrontmatter, metalsmithMetadata } = {}
) => {
  const PageComponent = (await importDefault(
    filePath
  )) as ComponentType<PropsWithChildren>

  return ReactDOMServer.renderToStaticMarkup(
    <MetalsmithProvider data={metalsmithMetadata}>
      <FrontmatterProvider data={pageFrontmatter}>
        <PageComponent />
      </FrontmatterProvider>
    </MetalsmithProvider>
  )
}

/**
 * Metalsmith plugin for rendering React components to HTML.
 */

export type ReactRender = (props?: { pattern?: string[] }) => MetalPlugin

export const reactRender: ReactRender = ({
  pattern = ["**/*.js", "*.js"],
} = {}) => {
  mkdir(CACHE_FOLDER_PATH, { recursive: true })

  return async (metalFiles, metalsmith) => {
    const matchedFilePaths = metalsmith.match(pattern, Object.keys(metalFiles))
    const debug = metalsmith.debug("reactRender")

    if (matchedFilePaths.length === 0) {
      debug(`No files found under ${pattern}`)
      return
    }

    debug(`Found ${matchedFilePaths.length} JS files under ${pattern}`)

    const matchedFiles = Object.entries(metalFiles).filter(([key]) =>
      matchedFilePaths.includes(key)
    )
    const metalsmithMetadata = metalsmith.metadata() as Record<string, unknown>

    // Write to disk all JS Metalsmith files. This is needed because the
    // `compileJSToHTML` function simply imports the JS file and executes it.
    await writeAllFiles(matchedFiles, {
      destination: CACHE_FOLDER_PATH,
    })

    const compilePromises = matchedFilePaths.map(async sourceFilePath => {
      const metalFile = metalFiles[sourceFilePath] as MetalFile

      debug(`Compiling ${sourceFilePath}`)

      try {
        const fileCachePath = path.join(CACHE_FOLDER_PATH, sourceFilePath)
        const htmlContents = await compileJSToHTML(fileCachePath, {
          pageFrontmatter: metalFile,
          metalsmithMetadata,
        })
        const htmlFileName = renameFile(sourceFilePath, { ext: ".html" })

        // Metalsmith housekeeping, replace JS file with HTML file
        metalFile.contents = Buffer.from(htmlContents)
        metalFile["path"] = htmlFileName

        metalFiles[htmlFileName] = metalFile
        delete metalFiles[sourceFilePath]
      } catch (error) {
        console.error(error)
      }
    })

    await Promise.all(compilePromises)
  }
}
