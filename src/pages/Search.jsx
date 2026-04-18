import Pagination from "../components/Pagination.jsx"
import SearchBar from "../components/SearchBar.jsx"
import SearchResults from "../components/SearchResults.jsx"
import { useFilters } from "../hooks/useFilters.jsx";

export function SearchPage() {
  const {
    jobs,
    loading,
    currentPage,
    totalPages,
    totalResults,
    handlePageChange,
    handleSearch,
    handleTextFilter
  } = useFilters();

  const title = loading
    ? 'Cargando...'
    : `Resultados: ${totalResults}, Página ${currentPage} - DevJobs`;

  return (
    <main>
      <title>{title}</title>
      <SearchBar onSearch={handleSearch} onTextChange={handleTextFilter} />
      <section>
        <header>
          <h2>Resultados de búsqueda</h2>
        </header>
        {
          loading ? <p>Cargando...</p> : <SearchResults jobs={jobs} />
        }
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange} />
      </section>
    </main>
  )
}