import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

function SearchBar({ handleSearched }) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!searchQuery) {
      handleSearched("");
      return;
    }

    const delayDebounce = setTimeout(() => {
      console.log("Searched:", searchQuery);
      handleSearched(searchQuery);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div className="flex p-2 px-4 rounded-xl items-center w-full md:w-[50%] xl:w-[30%] bg-(--secondary)">
      <Search className="m-1 text-(--text)" />
      <input
        type="text"
        className="w-full h-10 p-2 outline-none bg-transparent text-(-text) placeholder:text-(--white)"
        placeholder="Search by Name, Region, Subregion"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      {/* {showLoading && <span className="loader"></span>} */}
    </div>
  );
}

export default SearchBar;
