import React, { useEffect, useState } from "react";
import { Button, Select, SelectItem } from "@heroui/react";
import { RadioGroup, Checkbox } from "@heroui/react";

export const sorting = [
  { key: "population", label: "Population" },
  { key: "area", label: "Area" },
  { key: "alphaasc", label: "A - Z" },
  { key: "alphadec", label: "Z - A" },
];

const regionsList = [
  "Americas",
  "Antartic",
  "Africa",
  "Asia",
  "Europe",
  "Oceania",
];

function FilterSection({ handleSetFilters }) {
  const [sortBy, setSortBy] = useState("population");
  const [regions, setRegions] = useState([
    "Americas",
    "Antartic",
    "Africa",
    "Asia",
    "Europe",
    "Oceania",
  ]);
  const [un_member, setUn_member] = useState(true);
  const [independent, setIndependent] = useState(true);

  const toggleRegion = (region) => {
    setRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  useEffect(() => {
    handleSetFilters(sortBy, regions, un_member, independent);
  }, [sortBy, un_member, independent, regions]);
  return (
    <div className="w-full md:w-[20%] flex flex-col gap-10 justify-start items-center">
      <Select
        popoverProps={{
          classNames: {
            content: "!bg-(--secondary)",
          },
        }}
        classNames={{
          label: "!text-(--text) py-1  text-sm",
          value: "!text-(--text)",
          trigger: "min-h-12 border-2 border-(--secondary)",
          mainWrapper: "!border-(--secondary)",
        }}
        variant="bordered"
        labelPlacement="outside"
        className="w-full"
        defaultSelectedKeys={["population"]}
        label="Sort By"
      >
        {sorting.map((item) => (
          <SelectItem
            key={item.key}
            value={item.key}
            onClick={() => setSortBy(item.key)}
          >
            {item.label}
          </SelectItem>
        ))}
      </Select>

      <RadioGroup
        classNames={{
          base: "!flex !flex-col  text-sm",
          label: "!text-(--text) py-1",
        }}
        className="w-full !flex  flex-wrap"
        label="Region"
      >
        <div className="w-[80%] flex flex-wrap gap-2">
          {regionsList.map((region) => (
            <Button
              key={region}
              size="sm"
              onPress={() => toggleRegion(region)}
              className={`text-sm text-(--text) p-5 rounded-xl transition-all duration-200
                ${
                  regions.includes(region)
                    ? "bg-(--secondary) text-white"
                    : "bg-(--background)"
                }`}
            >
              {region}
            </Button>
          ))}
        </div>
      </RadioGroup>

      <RadioGroup
        classNames={{
          base: "!flex !flex-col",
          label: "!text-(--text) py-1 text-sm",
        }}
        className="w-full !flex  flex-wrap"
        label="Status"
      >
        <Checkbox
          isSelected={un_member}
          onChange={() => setUn_member(!un_member)}
        >
          Member of United Nation
        </Checkbox>
        <Checkbox
          isSelected={independent}
          onChange={() => setIndependent(!independent)}
        >
          Independent
        </Checkbox>
      </RadioGroup>
    </div>
  );
}

export default FilterSection;
