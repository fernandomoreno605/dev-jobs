import { Link } from "./Link";

export default function Header() {
  return (
    <header>
      <Link style={{ textDecoration: "none", color: "white" }} href="/">
        <h1>DevJobs</h1>
      </Link>
      <nav>
        <Link href="/">Inicio</Link>
        <Link href="/search">Empleos</Link>
        <a href="#">Empresas</a>
        <a href="#">Salarios</a>
      </nav>
      <div>
        {/* <devjobs-avatar service="x" username="baitybait" size="32">
          </devjobs-avatar> */}
      </div>
    </header>

  );
}