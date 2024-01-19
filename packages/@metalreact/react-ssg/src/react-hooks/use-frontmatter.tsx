import { useContext, createContext, FC } from "react"

const frontmatterContext = createContext<object>({})

/**
 * FrontmatterProvider component providing access to page level frontmatter
 * data.
 * @example
 * import { FrontmatterProvider } from "@metalreact/metalsmith-react-ssg"
 *
 * const metadata = {
 *   title: "Intro into Metalsmith and React",
 *   tags: ["metalsmith", "react", "ssg"],
 * }
 *
 * export const App = () => (
 *   <FrontmatterProvider data={metadata}>
 *     <MyApp />
 *   </FrontmatterProvider>
 * )
 */

type FrontmatterProviderProps = {
  data?: object
  children: import("react").ReactNode
}

export const FrontmatterProvider: FC<FrontmatterProviderProps> = ({
  data = {},
  children,
}) => {
  return (
    <frontmatterContext.Provider value={data}>
      {children}
    </frontmatterContext.Provider>
  )
}

/**
 * Hook exposing page level Frontmatter data to any component in the app.
 * @returns {Record<string, unknown>} Frontmatter metadata.
 * @example
 * import { useFrontmatter } from "@metalreact/metalsmith-react-ssg"
 *
 * export const MyComponent = () => {
 *   const { title } = useFrontmatter()
 *
 *   return <div>{title}</div>
 * }
 */
export const useFrontmatter = <T extends Record<string, unknown>>(): T => {
  return useContext(frontmatterContext) as T
}
