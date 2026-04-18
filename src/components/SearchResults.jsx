import { JobCard } from "./JobCard";

export default function SearchResults({ jobs }) {

  return (
    <>
      <div className="jobs-listing">
        {jobs.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem', textWrap: 'balance' }}>
            No se encontraron resultados para tu búsqueda.
          </p>
        )}
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            title={job.titulo}
            company={job.empresa}
            description={job.descripcion}
            data={job.data}
          />
        ))}
      </div>
    </>
  )
}