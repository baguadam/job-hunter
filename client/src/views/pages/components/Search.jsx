/* eslint-disable react/prop-types */
import { Button, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import { buttonStyles } from "../../../utils/styles";
import "./styles/Search.css";
import { FilterModal } from "./FilterModal";

export const Search = ({
  hasFilters,
  onRemoveFiltersClick,
  onAddFiltersClick,
  searchValue,
  onSearchValueChange,
  onSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // HANDLERS
  const handleModalOpen = () => setIsOpen(true);
  const handleModalClose = () => setIsOpen(false);

  return (
    <div className="search-wrapper">
      <div className="input-wrapper">
        <InputLabel htmlFor="search-text" sx={{ fontSize: "1.2em" }}>
          <b>Keresés cégnév alapján</b>
        </InputLabel>
        <TextField
          onChange={onSearchValueChange}
          type="text"
          id="search-text"
          name="position"
          value={searchValue}
          label="Keresés..."
          variant="outlined"
          size="small"
          sx={{ marginRight: "15px", marginTop: "10px" }}
        />
        <Button
          variant="outlined"
          className="nav-button"
          sx={{ ...buttonStyles, marginRight: "15px", marginTop: "10px" }}
          onClick={onSearch}
        >
          Keresés
        </Button>
        <Button
          variant="outlined"
          className="nav-button"
          sx={{ ...buttonStyles, marginRight: "15px", marginTop: "10px" }}
          onClick={handleModalOpen}
        >
          Szűrés
        </Button>
        {hasFilters && (
          <Button
            variant="text"
            sx={{ marginTop: "10px" }}
            onClick={onRemoveFiltersClick}
          >
            Szűrők visszavonása
          </Button>
        )}
      </div>
      <FilterModal
        isOpen={isOpen}
        onClose={handleModalClose}
        onSubmit={onAddFiltersClick}
      />
    </div>
  );
};
