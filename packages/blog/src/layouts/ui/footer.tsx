import { FC } from "react"

type FooterProps = {
  generator: string
}

const Footer: FC<FooterProps> = ({ generator }) => {
  return (
    <footer>
      <hr />
      <center>{generator}</center>
    </footer>
  )
}

export { Footer }
