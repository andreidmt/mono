import { useMetalsmith } from "@metalreact/metalsmith-react-ssg"
import { FC, ReactNode } from "react"

import { MetalsmithMetadata } from "./types/metalsmith-metadata.ts"
import { Footer } from "./ui/footer.js"
import { Head } from "./ui/head.js"

type HomepageLayoutPropsType = {
  children: ReactNode
}

const HomepageLayout: FC<HomepageLayoutPropsType> = ({ children }) => {
  const { sitename, description, generator, posts } =
    useMetalsmith<MetalsmithMetadata>()

  return (
    <html lang="en">
      <Head sitename={sitename} description={description} />

      <body className="gruvbox gruvbox-light">
        <main className="page home">
          <main>
            {children}

            <hr />

            {posts.map(page => {
              return (
                <article key={page.path}>
                  <header>
                    <h2>
                      <small>
                        <time dateTime={page.createdAt.toISOString()}>
                          {page.createdAt.toLocaleDateString("en-us", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </small>
                      <a href={`/${page.path}`}>{page.title}</a>
                    </h2>
                  </header>
                </article>
              )
            })}
          </main>

          <Footer generator={generator} />
        </main>
      </body>
    </html>
  )
}

export default HomepageLayout
