import { NavLink } from "react-router";
import { Link } from "./Link";
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";

export default function Header() {
  const { isLoggedIn, login, logout } = useAuthStore();
  const { clearFavorites } = useFavoritesStore()
  const totalFavorites = useFavoritesStore(state => state.countFavorites());

  const handleLogout = () => {
    logout();
    clearFavorites();
  }

  return (
    <header>
      <Link style={{ textDecoration: "none", color: "white" }} href="/">
        <h1>DevJobs</h1>
      </Link>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "nav-link-active" : ""}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) => isActive ? "nav-link-active" : ""}
        >
          Empleos
        </NavLink>
        <a href="#">Empresas</a>
        <a href="#">Salarios</a>
        {
          isLoggedIn && (
            <NavLink
              className={({ isActive }) => isActive ? "nav-link-active" : ""}
              to="/profile"
            >
              Profile ❤️ {totalFavorites}
            </NavLink>
          )
        }
      </nav>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Cerrar sesión</button>
      ) : (
        <button onClick={login}>Iniciar sesión</button>
      )}
      <div>
        {/* <devjobs-avatar service="x" username="baitybait" size="32">
          </devjobs-avatar> */}
      </div>
    </header>

  );
}