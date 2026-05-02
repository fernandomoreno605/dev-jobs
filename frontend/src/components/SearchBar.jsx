import FilterSelector from "./FilterSelector";
import { useId, useRef } from "react";

export default function SearchBar({ onSearch, onTextChange }) {
  const locationOptions = [
    {
      value: "on-site",
      label: "Presencial"
    },
    {
      value: "remote",
      label: "Remoto"
    },
    {
      value: "hybrid",
      label: "Híbrido"
    }
  ];

  const experienceLevelOptions = [
    {
      value: "junior",
      label: "Junior"
    },
    {
      value: "medium",
      label: "Medium"
    },
    {
      value: "senior",
      label: "Senior"
    }
  ];

  const technologyOptions = [
    {
      value: "javascript",
      label: "JavaScript"
    },
    {
      value: "python",
      label: "Python"
    },
    {
      value: "react",
      label: "React"
    },
    {
      value: "nodejs",
      label: "Node.js"
    },
    {
      value: "java",
      label: "Java"
    },
    {
      value: "csharp",
      label: "C#"
    },
    {
      value: "c",
      label: "C"
    },
    {
      value: "c++",
      label: "C++"
    },
    {
      value: "ruby",
      label: "Ruby"
    },
    {
      value: "php",
      label: "PHP"
    }
  ]

  const timeoutId = useRef(null);

  const idTechnology = useId();
  const idLocation = useId();
  const idExperience = useId();
  const idSearch = useId();
  const searchInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = {
      search: formData.get(idSearch),
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experience: formData.get(idExperience)
    };
    onSearch(filters);
  }

  const handleTextChange = (event) => {
    const text = event.target.value;
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      onTextChange(text);
    }, 500);
  }

  const hadleClearInput = (event) => {
    event.preventDefault();
    searchInputRef.current.value = '';
    onTextChange('');
  }
  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>
      <form onSubmit={handleSubmit} id="empleos-search-form" role="search">
        <div className="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
          <input
            ref={searchInputRef}
            name={idSearch}
            type="text"
            id="empleos-search-input"
            placeholder="Buscar empleos por title, habilidad o empresa"
            onChange={handleTextChange}>
          </input>
          {/* <button onClick={hadleClearInput}>
            ✖
          </button> */}
        </div>
        <div className="search-filters">
          <FilterSelector
            name={idTechnology}
            id="filter-technology"
            defaultOptionValue="Tecnología"
            options={technologyOptions}
          />
          <FilterSelector
            name={idLocation}
            id="filter-location"
            defaultOptionValue="Ubicación"
            options={locationOptions}
          />
          <FilterSelector
            name={idExperience}
            id="filter-experience-level2"
            defaultOptionValue="Nivel de experiencia"
            options={experienceLevelOptions}
          />
        </div>
      </form>
      <span id="filter-selected-value"></span>
    </section>
  );
}