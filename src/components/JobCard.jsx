import { useState } from "react";

export function JobCard({ title, company, description, data }) {
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
        <h3>{title}</h3>
        <small>{company}</small>
        <p>{description}</p>
      </div>
      <button
        disabled={isApplied}
        className={`button-apply-job ${buttonClass}`}
        onClick={handleApply}
      >
        {buttonText}
      </button>
    </article>
  )

  function handleApply() {
    console.log('apply event');
    setIsApplied(!isApplied);
  }
}
