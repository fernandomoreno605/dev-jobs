import Footer from "./components/Footer.jsx"
import Header from "./components/Header.jsx"
import { Routes, Route } from "react-router"
import { lazy, Suspense } from "react"

const HomePage = lazy(() => import("./pages/Home.jsx"));
const SearchPage = lazy(() => import("./pages/Search.jsx"));
const JobDetail = lazy(() => import("./pages/Detail.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFound.jsx"));

function App() {

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App