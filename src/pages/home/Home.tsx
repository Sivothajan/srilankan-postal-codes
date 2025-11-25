"use client";

import { ChevronLeft, ChevronRight, FilterX, Search } from "lucide-react";
import { useMemo, useState } from "react";

import postalDataRaw from "@/assets/data.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PostalCodeItem {
  postal_code: string;
  post_office: string;
  division_code: string;
  district: string;
  is_sub: boolean;
}

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Extract Unique Districts
  const uniqueDistricts = useMemo(() => {
    const districts = (postalDataRaw as PostalCodeItem[]).map(
      (item) => item.district,
    );
    return Array.from(new Set(districts)).sort();
  }, []);

  const hasActiveFilters =
    searchQuery !== "" || districtFilter !== "all" || typeFilter !== "all";

  // 2. Main Filter Logic
  const filteredData = useMemo(() => {
    const data = postalDataRaw as PostalCodeItem[];

    return data.filter((item) => {
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        item.post_office.toLowerCase().includes(lowerQuery) ||
        item.postal_code.includes(lowerQuery) ||
        item.district.toLowerCase().includes(lowerQuery);

      const matchesDistrict =
        districtFilter === "all" || item.district === districtFilter;

      let matchesType = true;
      if (typeFilter === "main") matchesType = !item.is_sub;
      if (typeFilter === "sub") matchesType = item.is_sub;

      return matchesSearch && matchesDistrict && matchesType;
    });
  }, [searchQuery, districtFilter, typeFilter]);

  // 3. Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDistrictChange = (value: string) => {
    setDistrictFilter(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (value: string) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDistrictFilter("all");
    setTypeFilter("all");
    setCurrentPage(1);
  };

  // 4. Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-background">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-2 mb-8 mt-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Sri Lankan Postal Codes
          </h1>
          <p className="text-muted-foreground">
            Search and filter by location or office type.
          </p>
        </div>

        {/* Search & Filter Card */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filters</CardTitle>
            <CardDescription>
              Found {filteredData.length} results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row">
              {/* Text Search */}
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search by name or code..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>

              {/* District Dropdown */}
              <div className="w-full md:w-[200px]">
                <Select
                  value={districtFilter}
                  onValueChange={handleDistrictChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    {uniqueDistricts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Type Dropdown */}
              <div className="w-full md:w-[180px]">
                <Select value={typeFilter} onValueChange={handleTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Office Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="main">Main Office</SelectItem>
                    <SelectItem value="sub">Sub Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                title="Clear Filters"
                className={!hasActiveFilters ? "opacity-50" : ""}
              >
                <FilterX className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card>
          <CardContent className="p-0">
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px] whitespace-nowrap">
                      Postal Code
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Post Office
                    </TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Division</TableHead>
                    <TableHead className="text-right">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item, index) => (
                      <TableRow key={`${item.postal_code}-${index}`}>
                        <TableCell className="font-medium">
                          {item.postal_code}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {item.post_office}
                        </TableCell>
                        <TableCell>{item.district}</TableCell>
                        <TableCell>{item.division_code}</TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          {item.is_sub ? (
                            <Badge variant="secondary">Sub Office</Badge>
                          ) : (
                            <Badge variant="default">Main Office</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>

          {/* Pagination Footer */}
          {filteredData.length > 0 && (
            <CardFooter className="flex justify-between items-center py-4">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
