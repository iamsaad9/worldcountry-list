"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FilterSection from "./FilterSection";
import CountryTable from "./CountryTable";
function CountrySection() {
  const [loading, setLoading] = useState(true);
  const [countryData, setCountryData] = useState([]);
  const [filters, setFilter] = useState({
    searchQuery: "",
    sortBy: "population",
    region: [],
    independent: true,
    us_member: true,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,population,region,area,flags,independent,unMember"
      );
      const data = await res.json();

      const mapped = data.map((c, idx) => ({
        key: idx.toString(),
        flag: c.flags?.png,
        name: c.name?.common,
        population: c.population,
        area: c.area,
        region: c.region,
        independent: c.independent,
        un_member: c.unMember,
      }));

      setLoading(false);
      setCountryData(mapped);
    };

    fetchCountries();
  }, []);

  return (
    <div className="w-[90%] rounded-2xl border-1 border-(--secondary) bg-(--background) flex flex-col gap-5 p-5 md:p-10 -mt-20 z-10">
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-5">
        <h1 className="text-lg font-medium text-(--text) ">
          Found {countryData.length} countries
        </h1>
        <SearchBar
          handleSearched={(query) =>
            setFilter((prev) => ({ ...prev, searchQuery: query }))
          }
        />
      </div>

      <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-5 py-5">
        <FilterSection
          handleSetFilters={(sortby, region, un_member, independent) =>
            setFilter((prev) => ({
              ...prev,
              sortBy: sortby,
              region,
              independent,
              un_member,
            }))
          }
        />
        <CountryTable
          countriesData={countryData}
          isLoading={loading}
          filtersApplied={filters}
        />
      </div>
    </div>
  );
}

export default CountrySection;
