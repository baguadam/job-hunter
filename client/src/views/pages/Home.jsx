import { useEffect, useState } from "react";
import "./styles/pages.css";
import { Search } from "./components/Search";
import { JobsTable } from "./components/JobsTable";
import { useGetAllJobsQuery } from "../../state/apiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

export const Home = () => {
  const [hasFilters, setHasFilters] = useState(false);
  const [filters, setFilters] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const message = location.state?.message;

  const { data, isFetching, refetch } = useGetAllJobsQuery({
    filters,
    hasFilters,
  });

  // HANDLERS
  const handleRemoveFiltersClick = () => {
    setFilters(null);
    setHasFilters(false);
    setSearchValue("");
  };

  const handleAddFiltersClick = (e, filterValues) => {
    e.preventDefault();
    setFilters({ ...filters, ...filterValues });
    setHasFilters(true);
  };

  const handleCompanySearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    setFilters({
      ...filters,
      company: searchValue,
    });
    setHasFilters(true);
  };

  // A felugró Snackbar kezelése
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // USEEFFECTS
  // Ha megváltoznak a filterek, újrahúzzuk
  useEffect(() => {
    refetch();
  }, [hasFilters, filters, refetch]);

  useEffect(() => {
    if (message && !open) {
      setOpen(true);
    }
  }, [message, open]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        navigate(".", { replace: true, state: {} });
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [open, navigate]);

  return (
    <div className="wrapper">
      <div className="header-wrapper">
        <h1>Főoldal</h1>
      </div>
      <Search
        onFiltersChange={setFilters}
        onRemoveFiltersClick={handleRemoveFiltersClick}
        onAddFiltersClick={handleAddFiltersClick}
        hasFilters={hasFilters}
        searchValue={searchValue}
        onSearchValueChange={handleCompanySearchChange}
        onSearch={handleSearchClick}
      />
      {isFetching ? <p>Loading...</p> : <JobsTable jobs={data} />}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
