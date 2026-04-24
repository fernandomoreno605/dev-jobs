import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./Details.module.css";
import { useRouter } from "../hooks/useRouter";
import { Link } from "../components/Link";
import snarkdown from "snarkdown";
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";

function JobSection({ title, content }) {

  const html = snarkdown(content);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div
        className={`${styles.sectionContent} prose`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
function JobDetailFavoriteButton({ jobId }) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  return (
    <button
      onClick={() => toggleFavorite(jobId)}
    >
      {isFavorite(jobId) ? "❤️" : "🤍"}
    </button>
  );
}

export default function JobDetail() {
  const { navigateTo } = useRouter();
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    async function getJobDetails({ id }) {
      try {
        setLoading(true);
        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs/${id}`);
        if (!response.ok) throw Error('Job not found');
        const data = await response.json();
        console.log('incoming data: ', data);
        setJob(data);
      } catch (error) {
        setError('An error happens: ', error);
      } finally {
        setLoading(false);
      }
    }

    getJobDetails({ id });
  }, [id]);

  if (loading) {
    return (
      <div style={{ maxWidth: '1280px', margin: 'o auto', padding: '0 1rem' }}>
        <div className={styles.loading}>
          <p className={styles.loadingText}>Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '1280px', margin: 'o auto', padding: '0 1rem' }}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>Oferta no encontrada</h2>
          <button
            className={styles.errorButton}
            onClick={() => navigateTo('/')}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: 'o auto', padding: '0 1rem' }}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/search" className={styles.breadcrumbButton}>
            Empleos
          </Link>
          <span className={styles.breadcrumSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
        </nav>
      </div>
      <header className={styles.header}>
        <h1 className={styles.title}>{job.titulo}</h1>
        <p className={styles.meta}>{job.empresa} · {job.ubicacion}</p>
      </header>
      <button disabled={!isLoggedIn} className={styles.applyButton}>
        {isLoggedIn ? 'Aplicar ahora' : 'Inicia sesión para aplicar'}
      </button>
      <JobDetailFavoriteButton jobId={job.id} />
      <JobSection title={"Descripción del puesto"} content={job.content.description} />
      <JobSection title={"Responsabilidades"} content={job.content.responsibilities} />
      <JobSection title={"Requisitos"} content={job.content.requirements} />
      <JobSection title={"Acerca de la empresa"} content={job.content.about} />

    </div >
  );
}