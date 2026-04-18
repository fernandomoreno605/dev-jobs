import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "./useRouter";

export function useFilters() {
  const RESULTS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return Number(urlParams.get('page')) || 1;
  });

  const [textToFilter, setTextToFilter] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('text') || '';
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalResults, setTotalResults] = useState(0);

  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experience: ''
  });

  const { navigateTo } = useRouter();

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

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`);

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
    const params = new URLSearchParams();
    if (textToFilter) params.append('text', textToFilter);
    if (filters.technology) params.append('technology', filters.technology);
    if (filters.location) params.append('type', filters.location);
    if (filters.experience) params.append('level', filters.experience);

    if (currentPage > 1) params.append('page', currentPage);

    const queryParams = params.toString();
    const newUrl = queryParams
      ? `${window.location.pathname}?${queryParams}`
      : window.location.pathname;

    navigateTo(newUrl);

  }, [filters, textToFilter, currentPage, navigateTo]);

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