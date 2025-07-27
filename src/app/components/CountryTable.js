import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

const defaultCountries = [
  {
    key: "1",
    flag: "https://flagcdn.com/w320/cn.png",
    name: "China",
    population: "1402112000",
    area: "9706961",
    region: "Asia",
    // independent: true,
  },
  {
    key: "2",
    flag: "https://flagcdn.com/w320/in.png",
    name: "India",
    population: "1380004385",
    area: "3287590",
    region: "Asia",
    // independent: true,
  },
  {
    key: "3",
    flag: "https://flagcdn.com/w320/us.png",
    name: "United States",
    population: "329484123",
    area: "9372610",
    region: "Americas",
    // independent: true,
  },
  {
    key: "4",
    flag: "",
    name: "",
    population: "",
    area: "",
    region: "",
    // independent: true,
  },
  {
    key: "5",
    flag: "",
    name: "",
    population: "",
    area: "",
    region: "",
    // independent: true,
  },
  {
    key: "6",
    flag: "",
    name: "",
    population: "",
    area: "",
    region: "",
    // independent: true,
  },
  {
    key: "7",
    flag: "",
    name: "",
    population: "",
    area: "",
    region: "",
    // independent: true,
  },
  {
    key: "8",
    flag: "",
    name: "",
    population: "",
    area: "",
    region: "",
    // independent: true,
  },
];

function CountryTable({ countriesData, isLoading, filtersApplied }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Filters Applied", filtersApplied);
    console.log("countriesData", countriesData);
    setCountries(countriesData);
    setLoading(isLoading);
  }, [countriesData]);

  useEffect(() => {
    console.log("Filters Applied:", filtersApplied);
    console.log("Countries Data:", countriesData);

    if (!countriesData.length) return;

    let filtered = [...countriesData];

    // 🔍 Search filter
    if (filtersApplied.searchQuery?.trim()) {
      filtered = filtered.filter((country) =>
        country.name
          ?.toLowerCase()
          .includes(filtersApplied.searchQuery.toLowerCase())
      );
    }

    // 🌍 Region filter (multi-select)
    if (filtersApplied.region?.length > 0) {
      filtered = filtered.filter((country) =>
        filtersApplied.region.includes(country.region)
      );
    }

    if (typeof filtersApplied.independent === "boolean") {
      filtered = filtered.filter(
        (country) => country.independent === filtersApplied.independent
      );
    }

    // ✅ UN member filter
    if (typeof filtersApplied.un_member === "boolean") {
      filtered = filtered.filter(
        (country) => country.un_member === filtersApplied.un_member
      );
    }
    // 🔃 Sorting
    switch (filtersApplied.sortBy) {
      case "population":
        filtered.sort((a, b) => b.population - a.population);
        break;
      case "area":
        filtered.sort((a, b) => b.area - a.area);
        break;
      case "alphaasc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alphadec":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    console.log("Filtered:", filtered);
    setCountries(filtered);
    setLoading(isLoading);
  }, [countriesData, filtersApplied, isLoading]);

  const columns = [
    { key: "flag", label: "Flag" },
    { key: "name", label: "Name" },
    { key: "population", label: "Population" },
    { key: "area", label: "Area (km²)" },
    { key: "region", label: "Region" },
  ];

  const renderCell = React.useCallback((country, columnKey) => {
    const cellValue = country[columnKey];
    switch (columnKey) {
      case "flag":
        return (
          <>
            {cellValue == "" ? (
              <div className="w-16 h-10 bg-(--secondary) rounded-sm" />
            ) : (
              <img
                src={cellValue}
                className="!w-16 h-10 rounded-sm"
                alt="flag"
              />
            )}
          </>
        );
      case "name":
        return (
          <>
            {cellValue == "" ? (
              <div className="w-full p-2 rounded-full bg-(--secondary)"></div>
            ) : (
              <h1 className="text-base text-(--text)">{cellValue}</h1>
            )}
          </>
        );
      case "population":
      case "area":
        return (
          <>
            {cellValue == "" ? (
              <div className="w-full p-2 rounded-full bg-(--secondary)"></div>
            ) : (
              <h1 className="text-base text-(--text)">
                {Number(cellValue).toLocaleString()}
              </h1>
            )}
          </>
        );
      case "region":
        return (
          <>
            {cellValue == "" ? (
              <div className="w-full p-2 rounded-full bg-(--secondary)"></div>
            ) : (
              <h1 className="text-base text-(--text)">{cellValue}</h1>
            )}
          </>
        );
      default:
        return <h1 className="text-base text-(--text)">{cellValue}</h1>;
    }
  }, []);

  return (
    <Table
      aria-label="Country table"
      className="w-[80%] !bg-transparent"
      classNames={{
        base: "!bg-transparent",
        table: "!bg-transparent",
        wrapper: "!bg-transparent !p-0",
        th: "!bg-transparent text-(--text) font-light border-b-2 border-(--secondary) py-4",
        tr: "!my-10",
      }}
      shadow="none"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        emptyContent="No countries found"
        items={loading ? defaultCountries : countries}
      >
        {(item) => (
          <TableRow
            key={item.key}
            className="hover:bg-[#282B30] cursor-pointer transition-colors duration-300 !rounded-2xl"
          >
            {(columnKey) => (
              <TableCell className="!w-auto">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default CountryTable;
