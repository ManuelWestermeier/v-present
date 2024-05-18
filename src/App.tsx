import { useSearchParams } from "react-router-dom"
import SetPageUrlPage from "./pages/set-url-page"
import Presentation from "./pages/presentation"

function App() {
  const [searchParams, setSearchParams] = useSearchParams({ url: "false" })
  const url = searchParams.get("url") == "false" ? "" : searchParams.get("url") || ""

  if (searchParams.get("url") == "false") {
    const setURL = (newUrl: string) =>
      setSearchParams((old: URLSearchParams) => {
        return {
          url: newUrl
        }
      })

    return <SetPageUrlPage url={url} setUrl={setURL} />
  }

  return <Presentation url={url} />
}

export default App