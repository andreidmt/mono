import type { File } from "metalsmith"
import type { PostsFrontmatter } from "../posts.tsx"

export type MetalsmithMetadata = {
  sitename: string
  description: string
  generator: string
  url: string
  posts: File<PostsFrontmatter>[]
}
