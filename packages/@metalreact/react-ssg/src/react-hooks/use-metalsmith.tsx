import { useContext, createContext, FC } from "react"

const metalsmithContext = createContext<object>({})

/**
 * MetalsmithProvider component providing access to Metalsmith metadata.
 * @example
 * import { MetalsmithProvider } from "@metalreact/metalsmith-react-ssg"
 *
 * const metadata = {
 *   title: "My Site",
 *   description: "My site's description",
 *   url: "https://example.com",
 *   generator: "Metalsmith + React",
 * }
 *
 * export const App = () => (
 *   <MetalsmithProvider data={metadata}>
 *     <MyApp />
 *   </MetalsmithProvider>
 * )
 */

type MetalsmithProviderProps = {
  data?: object
  children: import("react").ReactNode
}

export const MetalsmithProvider: FC<MetalsmithProviderProps> = ({
  data = {},
  children,
}) => {
  return (
    <metalsmithContext.Provider value={data}>
      {children}
    </metalsmithContext.Provider>
  )
}

/**
 * Hook exposing Metalsmith metadata to any component in the app.
 * @example
 * import { useMetalsmith } from "@metalreact/metalsmith-react-ssg"
 *
 * export const MyComponent = () => {
 *   const { title } = useMetalsmith()
 *
 *   return <div>{title}</div>
 * }
 */

export const useMetalsmith = <T extends Record<string, unknown>>(): T => {
  return useContext(metalsmithContext) as T
}
