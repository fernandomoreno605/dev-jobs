import { NavLink } from "react-router";
import { Link } from "./Link";
import { useAuth } from "../context/AuthContext";

export default function Header() {

  const { isLoggedIn, login, logout } = useAuth();

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
      </nav>
      {isLoggedIn ? (
        <button onClick={logout}>Cerrar sesión</button>
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