import { useFrontmatter, useMetalsmith } from "@metalreact/metalsmith-react-ssg"
import { FC, ReactNode } from "react"

import { MetalsmithMetadata } from "./types/metalsmith-metadata.js"
import { Footer } from "./ui/footer.js"
import { Head } from "./ui/head.js"

type PostsFrontmatter = {
  title: string
  path: string
  createdAt: Date
  updatedAt: Date
  tags?: string[]
}

type PostsLayoutPropsType = {
  children: ReactNode
}

const PostsLayout: FC<PostsLayoutPropsType> = ({ children }) => {
  const { sitename, description, generator } =
    useMetalsmith<MetalsmithMetadata>()
  const { title } = useFrontmatter<PostsFrontmatter>()

  return (
    <html lang="en">
      <Head sitename={sitename} description={description} />

      <body className="gruvbox gruvbox-light">
        <main className="page home">
          <header>
            <h1>{title}</h1>
          </header>

          <main>{children}</main>

          <Footer generator={generator} />
        </main>
      </body>
    </html>
  )
}

export default PostsLayout
export { PostsLayoutPropsType, PostsFrontmatter }
