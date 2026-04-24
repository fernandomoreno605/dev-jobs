import { useState } from "react";
import { Link } from "./Link";
import styles from "./JobCard.module.css";
import { useFavoritesStore } from "../store/favoritesStore";

function JobCardFavoriteButton({ jobId }) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  return (
    <button
      onClick={() => toggleFavorite(jobId)}
    >
      {isFavorite(jobId) ? "❤️" : "🤍"}
    </button>
  );
}

export function JobCard({ title, company, description, data, jobId }) {
  const [isApplied, setIsApplied] = useState(false);

  const buttonText = isApplied ? 'Applied!' : 'Apply';
  const buttonClass = isApplied ? 'is-applied' : '';

  return (
    <article
      className="job-listing-card"
      data-modality={data?.modalidad}
      data-technology={data?.technology}
      data-experience-level={data?.nivel}
    >
      <div>
        <h3>
          <Link className={styles.title} href={`/jobs/${jobId}`}>
            {title}
          </Link>
        </h3>
        <small>{company}</small>
        <p>{description}</p>
      </div>
      <div className={styles.actions}>
        <Link className={styles.details} href={`/jobs/${jobId}`}>
          Ver detalles
        </Link>
        <button
          disabled={isApplied}
          className={`button-apply-job ${buttonClass}`}
          onClick={handleApply}
        >
          {buttonText}
        </button>
        <JobCardFavoriteButton jobId={jobId} />
      </div>
    </article>
  )

  function handleApply() {
    console.log('apply event');
    setIsApplied(!isApplied);
  }
}
