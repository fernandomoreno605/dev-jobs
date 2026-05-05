import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router";

export function useFilters() {
  const RESULTS_PER_PAGE = 5;

  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(() => {
    return Number(searchParams.get('page')) || 1;
  });

  const [textToFilter, setTextToFilter] = useState(() => {
    return searchParams.get('text') || '';
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalResults, setTotalResults] = useState(0);

  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experience: ''
  });

  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter);
    setCurrentPage(1);
  }

  useEffect(() => {

    async function fetchJobs() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (textToFilter) params.append('text', textToFilter);
        if (filters.technology) params.append('technology', filters.technology);
        if (filters.location) params.append('type', filters.location);
        if (filters.experience) params.append('level', filters.experience);

        const offset = (currentPage - 1) * RESULTS_PER_PAGE;

        params.append('offset', offset);
        params.append('limit', RESULTS_PER_PAGE);

        const queryParams = params.toString();

        const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs?${queryParams}`);

        const parsedResponse = await response.json();
        setTotalResults(parsedResponse.total);
        setJobs(parsedResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }

    fetchJobs();

  }, [filters, textToFilter, currentPage]);

  useEffect(() => {
    setSearchParams((params) => {
      textToFilter ? params.set('text', textToFilter) : params.delete('text');

      filters.technology ? params.set('technology', filters.technology) : params.delete('technology');

      filters.location ? params.set('type', filters.location) : params.delete('type');

      filters.experience ? params.set('level', filters.experience) : params.delete('level');

      currentPage > 1 ? params.set('page', currentPage) : params.delete('page');

      return params;
    });

  }, [filters, textToFilter, currentPage]);

  return {
    jobs,
    loading,
    currentPage,
    totalPages,
    totalResults,
    handlePageChange,
    handleSearch,
    handleTextFilter
  }
}