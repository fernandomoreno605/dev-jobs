import Footer from "./components/Footer.jsx"
import Header from "./components/Header.jsx"
import { NotFoundPage } from "./pages/NotFound.jsx"
import { HomePage } from "./pages/Home.jsx"
import { SearchPage } from "./pages/Search.jsx"
import { useRouter } from "./hooks/useRouter.jsx"
import { Route } from "./components/Route.jsx"

function App() {

  const { currentPath } = useRouter();

  let page = <NotFoundPage />

  if (currentPath === "/") {
    page = <HomePage />
  }

  if (currentPath === "/search") {
    page = <SearchPage />
  }


  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />

      <Footer />
    </>
  )
}

export default App