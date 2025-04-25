import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { Link, Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTranslation, initReactI18next } from "react-i18next";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { Navbar, Container, Nav, ButtonGroup, Button } from "react-bootstrap";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
function App() {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "container py-5", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-center mb-4", children: "Choose Your View" }),
    /* @__PURE__ */ jsxs("div", { className: "d-flex flex-column gap-3 align-items-center", children: [
      /* @__PURE__ */ jsx(Link, { to: "/pagination", className: "w-100", style: { maxWidth: "400px" }, children: /* @__PURE__ */ jsx("button", { className: "btn btn-primary w-100", children: t("paginatedCharacters") }) }),
      /* @__PURE__ */ jsx(Link, { to: "/scrolled", className: "w-100", style: { maxWidth: "400px" }, children: /* @__PURE__ */ jsx("button", { className: "btn btn-success w-100", children: t("scrolledCharacters") }) })
    ] })
  ] });
}
function CharacterCard({ character }) {
  const { t } = useTranslation();
  const translateStatus = (status) => {
    return t(status.toLowerCase());
  };
  const translateSpecies = (species) => {
    return t(species.toLowerCase());
  };
  const translateGender = (gender) => {
    return t(gender.toLowerCase());
  };
  return /* @__PURE__ */ jsxs("div", { className: "character-card", children: [
    /* @__PURE__ */ jsx("img", { src: character.image, alt: character.name, className: "character-image" }),
    /* @__PURE__ */ jsxs("div", { className: "character-info", children: [
      /* @__PURE__ */ jsx("h3", { children: character.name }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsxs("strong", { children: [
          t("status"),
          ":"
        ] }),
        " ",
        translateStatus(character.status)
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsxs("strong", { children: [
          t("species"),
          ":"
        ] }),
        " ",
        translateSpecies(character.species)
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsxs("strong", { children: [
          t("gender"),
          ":"
        ] }),
        " ",
        translateGender(character.gender)
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsxs("strong", { children: [
          t("origin"),
          ":"
        ] }),
        " ",
        character.origin.name !== "unknown" ? character.origin.name : t("unknown")
      ] })
    ] })
  ] });
}
function Characters({ characters, lastCharacterRef }) {
  return /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", justifyContent: "center" }, children: characters.map((character, index) => {
    const isLast = index === characters.length - 1;
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref: isLast && lastCharacterRef ? lastCharacterRef : null,
        className: "col-md-3 mb-4",
        children: /* @__PURE__ */ jsx(CharacterCard, { character })
      },
      character.id
    );
  }) });
}
function LoadingSpinner() {
  return /* @__PURE__ */ jsx("div", { className: "spinner-container", children: /* @__PURE__ */ jsx("div", { className: "loading-spinner" }) });
}
function CharacterFilterSortPanel({
  status,
  species,
  sort,
  onStatusChange,
  onSpeciesChange,
  onSortChange
}) {
  const { t } = useTranslation();
  const clearFilters = () => {
    onStatusChange("");
    onSpeciesChange("");
    onSortChange("");
  };
  return /* @__PURE__ */ jsxs("div", { className: "d-flex flex-wrap justify-content-center gap-3 mb-4", children: [
    /* @__PURE__ */ jsxs(
      "select",
      {
        className: "form-select w-auto",
        value: status,
        onChange: (e) => onStatusChange(e.target.value),
        children: [
          /* @__PURE__ */ jsx("option", { value: "", children: t("allStatus") }),
          /* @__PURE__ */ jsx("option", { value: "Alive", children: t("alive") }),
          /* @__PURE__ */ jsx("option", { value: "Dead", children: t("dead") }),
          /* @__PURE__ */ jsx("option", { value: "unknown", children: t("unknown") })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "select",
      {
        className: "form-select w-auto",
        value: species,
        onChange: (e) => onSpeciesChange(e.target.value),
        children: [
          /* @__PURE__ */ jsx("option", { value: "", children: t("allSpecies") }),
          /* @__PURE__ */ jsx("option", { value: "Human", children: t("human") }),
          /* @__PURE__ */ jsx("option", { value: "Alien", children: t("alien") }),
          /* @__PURE__ */ jsx("option", { value: "Robot", children: t("robot") })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "select",
      {
        className: "form-select w-auto",
        value: sort,
        onChange: (e) => onSortChange(e.target.value),
        children: [
          /* @__PURE__ */ jsx("option", { value: "", children: t("sortBy") }),
          /* @__PURE__ */ jsx("option", { value: "name", children: t("nameAZ") }),
          /* @__PURE__ */ jsx("option", { value: "origin", children: t("originAZ") })
        ]
      }
    ),
    /* @__PURE__ */ jsx("button", { className: "btn btn-danger", onClick: clearFilters, children: t("clearFilters") })
  ] });
}
gql`
  query GetAllCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        name
        status
        species
        gender
        origin {
          name
        }
        image
      }
    }
  }
`;
const GET_FILTERED_CHARACTERS = gql`
query GetFilteredCharacters($page: Int, $name: String, $status: String, $species: String) {
  characters(page: $page, filter: { name: $name, status: $status, species: $species }) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      status
      species
      gender
      image
      origin {
        name
      }
    }
  }
}
`;
const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
});
const fetchFilteredCharacters = async (page, status, species) => {
  try {
    const { data } = await client.query({
      query: GET_FILTERED_CHARACTERS,
      variables: {
        page,
        status: status || void 0,
        species: species || void 0
      }
    });
    return data;
  } catch (error) {
    console.error("Error fetching filtered characters:", error);
    return null;
  }
};
const getProcessedCharacters = async (page, filters) => {
  var _a;
  const response = await fetchFilteredCharacters(
    page,
    filters.status,
    filters.species
  );
  if (!((_a = response == null ? void 0 : response.characters) == null ? void 0 : _a.results)) {
    return { characters: [], totalPages: 0 };
  }
  let characters = [...response.characters.results];
  if (filters.sort === "name") {
    characters.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filters.sort === "origin") {
    characters.sort((a, b) => {
      var _a2, _b;
      return (((_a2 = a.origin) == null ? void 0 : _a2.name) ?? "").localeCompare(((_b = b.origin) == null ? void 0 : _b.name) ?? "");
    });
  }
  return {
    characters,
    totalPages: response.characters.info.pages
  };
};
function PaginationPage() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      const result = await getProcessedCharacters(page, {
        status: statusFilter,
        species: speciesFilter,
        sort: sortOption
      });
      setCharacters(result.characters);
      setTotalPages(result.totalPages);
      setLoading(false);
    };
    loadCharacters();
  }, [page, statusFilter, speciesFilter, sortOption]);
  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      CharacterFilterSortPanel,
      {
        status: statusFilter,
        species: speciesFilter,
        sort: sortOption,
        onStatusChange: (val) => {
          setPage(1);
          setStatusFilter(val);
        },
        onSpeciesChange: (val) => {
          setPage(1);
          setSpeciesFilter(val);
        },
        onSortChange: setSortOption
      }
    ),
    loading ? /* @__PURE__ */ jsx(LoadingSpinner, {}) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Characters, { characters }),
      /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginTop: "1.5rem" }, children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setPage(1), disabled: page === 1, children: "⏮ First" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setPage((p) => Math.max(p - 1, 1)), disabled: page === 1, children: "◀ Prev" }),
        getPageNumbers().map((num) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setPage(num),
            style: {
              margin: "0 4px",
              fontWeight: num === page ? "bold" : "normal",
              backgroundColor: num === page ? "#ccc" : "transparent"
            },
            children: num
          },
          num
        )),
        /* @__PURE__ */ jsx("button", { onClick: () => setPage((p) => Math.min(p + 1, totalPages)), disabled: page === totalPages, children: "Next ▶" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setPage(totalPages), disabled: page === totalPages, children: "Last ⏭" })
      ] })
    ] })
  ] });
}
function Layout() {
  const { t, i18n: i18n2 } = useTranslation();
  const changeLanguage = (lng) => {
    i18n2.changeLanguage(lng);
  };
  return /* @__PURE__ */ jsxs("div", { className: "site-wrapper", children: [
    /* @__PURE__ */ jsx(Navbar, { bg: "light", expand: "lg", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(Navbar.Brand, { as: Link, to: "/", className: "fw-bold", children: t("title") }),
      /* @__PURE__ */ jsx(Navbar.Toggle, { "aria-controls": "basic-navbar-nav" }),
      /* @__PURE__ */ jsxs(Navbar.Collapse, { id: "basic-navbar-nav", children: [
        /* @__PURE__ */ jsxs(Nav, { className: "ms-auto", children: [
          /* @__PURE__ */ jsx(Nav.Link, { as: Link, to: "/pagination", className: "mx-2", children: t("pagination") }),
          /* @__PURE__ */ jsx(Nav.Link, { as: Link, to: "/scrolled", className: "mx-2", children: t("scrolled") })
        ] }),
        /* @__PURE__ */ jsxs(ButtonGroup, { className: "ms-3", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: i18n2.language === "en" ? "primary" : "outline-primary",
              onClick: () => changeLanguage("en"),
              children: "EN"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: i18n2.language === "de" ? "primary" : "outline-primary",
              onClick: () => changeLanguage("de"),
              children: "DE"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "site-content", children: /* @__PURE__ */ jsx(Container, { className: "py-4", children: /* @__PURE__ */ jsx(Outlet, {}) }) }),
    /* @__PURE__ */ jsx("footer", { className: "site-footer bg-light py-3", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("p", { className: "text-center mb-0", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ",
      t("title")
    ] }) }) })
  ] });
}
function InfiniteScrollPage() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const observer = useRef(null);
  const lastCharacterRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );
  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      const result = await getProcessedCharacters(page, {
        status: statusFilter,
        species: speciesFilter,
        sort: sortOption
      });
      setCharacters((prev) => {
        const newCharacters = page === 1 ? result.characters : [...prev, ...result.characters];
        return newCharacters.slice(-100);
      });
      setTotalPages(result.totalPages);
      setLoading(false);
    };
    loadCharacters();
  }, [page, statusFilter, speciesFilter, sortOption]);
  useEffect(() => {
    setCharacters([]);
    setPage(1);
    window.scrollTo(0, 0);
  }, [statusFilter, speciesFilter, sortOption]);
  const handleFilterChange = (type, value) => {
    if (type === "status") setStatusFilter(value);
    if (type === "species") setSpeciesFilter(value);
    if (type === "sort") setSortOption(value);
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mt-4", children: [
    /* @__PURE__ */ jsx(
      CharacterFilterSortPanel,
      {
        status: statusFilter,
        species: speciesFilter,
        sort: sortOption,
        onStatusChange: (val) => handleFilterChange("status", val),
        onSpeciesChange: (val) => handleFilterChange("species", val),
        onSortChange: (val) => handleFilterChange("sort", val)
      }
    ),
    /* @__PURE__ */ jsx(Characters, { characters, lastCharacterRef }),
    loading && /* @__PURE__ */ jsx(LoadingSpinner, {}),
    !loading && page >= totalPages && characters.length > 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-muted", children: "No more characters to load." })
  ] });
}
const router = createBrowserRouter([
  {
    path: "/",
    element: /* @__PURE__ */ jsx(Layout, {}),
    children: [
      {
        path: "/",
        element: /* @__PURE__ */ jsx(App, {})
      },
      {
        path: "/pagination",
        element: /* @__PURE__ */ jsx(PaginationPage, {})
      },
      {
        path: "/scrolled",
        element: /* @__PURE__ */ jsx(InfiniteScrollPage, {})
      }
    ]
  }
]);
function Router() {
  return /* @__PURE__ */ jsx(RouterProvider, { router });
}
i18n.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  },
  resources: {
    en: {
      translation: {
        title: "Rick & Morty",
        scrolledCharacters: "Scrolled Characters",
        paginatedCharacters: "Paginated Characters",
        pagination: "Paginated",
        clientFilter: "Client Filter",
        scrolled: "Scrolled",
        status: "Status",
        allStatus: "All Status",
        alive: "Alive",
        dead: "Dead",
        unknown: "Unknown",
        species: "Species",
        allSpecies: "All Species",
        human: "Human",
        alien: "Alien",
        robot: "Robot",
        sortBy: "Sort By",
        nameAZ: "Name (A-Z)",
        originAZ: "Origin (A-Z)",
        origin: "Origin",
        clearFilters: "Clear Filters",
        gender: "Gender",
        male: "Male",
        female: "Female"
      }
    },
    de: {
      translation: {
        title: "Rick & Morty",
        scrolledCharacters: "Unendliche Scroll-Charaktere",
        paginatedCharacters: "Paginierte Zeichen",
        pagination: "Seitenweise",
        clientFilter: "Client-Filter",
        scrolled: "Gescrollt",
        status: "Status",
        allStatus: "Alle Status",
        alive: "Lebendig",
        dead: "Tot",
        unknown: "Unbekannt",
        species: "Spezies",
        allSpecies: "Alle Spezies",
        human: "Mensch",
        alien: "Außerirdisch",
        robot: "Roboter",
        sortBy: "Sortieren nach",
        nameAZ: "Name (A-Z)",
        originAZ: "Herkunft (A-Z)",
        origin: "Herkunft",
        clearFilters: "Filter zurücksetzen",
        gender: "Geschlecht",
        male: "Männlich",
        female: "Weiblich"
      }
    }
  }
});
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(Router, {}) })
);
