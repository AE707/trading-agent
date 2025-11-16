'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';

interface TableFilterProps {
  data: any[];
  searchableFields: string[];
  onFilterChange: (filteredData: any[]) => void;
}

export const TableFilter = ({ data, searchableFields, onFilterChange }: TableFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    let result = data;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(item =>
        searchableFields.some(field =>
          String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply field-specific filters
    Object.entries(selectedFilters).forEach(([field, value]) => {
      if (value) {
        result = result.filter(item =>
          String(item[field]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    return result;
  }, [data, searchTerm, selectedFilters, searchableFields]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onFilterChange(filteredData);
  };

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...selectedFilters, [field]: value };
    setSelectedFilters(newFilters);
    onFilterChange(filteredData);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedFilters({});
    onFilterChange(data);
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow">
      <div className="flex flex-col gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search across all fields..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Tags */}
        {(searchTerm || Object.keys(selectedFilters).length > 0) && (
          <div className="flex flex-wrap gap-2 items-center">
            {searchTerm && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Search: {searchTerm}
              </span>
            )}
            {Object.entries(selectedFilters).map(([field, value]) =>
              value && (
                <span
                  key={field}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {field}: {value}
                </span>
              )
            )}
            <button
              onClick={clearFilters}
              className="ml-auto text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm"
            >
              <X size={16} /> Clear All
            </button>
          </div>
        )}

        {/* Result Count */}
        <div className="text-sm text-gray-600">
          Showing {filteredData.length} of {data.length} results
        </div>
      </div>
    </div>
  );
};
