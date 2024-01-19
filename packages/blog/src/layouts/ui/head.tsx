import { FC, useEffect } from "react"

type HeadProps = {
  sitename: string
  description: string
}

export const Head: FC<HeadProps> = ({ sitename, description }) => {
  useEffect(() => {
    const link = Object.assign(document.createElement("link"), {
      rel: "icon",
      href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🖖</text></svg>",
    })

    document.head.append(link)
  }, [])

  return (
    <head>
      <title>{sitename}</title>

      <meta charSet="utf8" />
      <meta name="description" content={description} />
      <meta name="viewport" content="device-width, initial-scale=1.0" />
      <meta name="generator" content="metalsmith" />

      <link rel="preconnect" as="style" href="/index.css" />
      <link rel="stylesheet" href="/index.css" />
    </head>
  )
}
