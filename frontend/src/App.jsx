import Footer from "./components/Footer.jsx"
import Header from "./components/Header.jsx"
import { Routes, Route } from "react-router"
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const HomePage = lazy(() => import("./pages/Home.jsx"));
const SearchPage = lazy(() => import("./pages/Search.jsx"));
const JobDetail = lazy(() => import("./pages/Detail.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFound.jsx"));
const ProfilePage = lazy(() => import("./pages/Profile.jsx"));
const LoginPage = lazy(() => import("./pages/Login.jsx"));
const RegisterPage = lazy(() => import("./pages/Register.jsx"));

function App() {

  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div
            style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
            Loading...
          </div>
        }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/profile" element={
            <ProtectedRoute redirectTo="/login">
              <ProfilePage />
            </ProtectedRoute>
          }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App