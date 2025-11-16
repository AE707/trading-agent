'use client';

import React, { useState, useCallback } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Column {
  id: string;
  label: string;
  visible: boolean;
}

interface ColumnManagerProps {
  columns: Column[];
  onColumnChange: (columns: Column[]) => void;
}

const ColumnManager: React.FC<ColumnManagerProps> = ({ columns, onColumnChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localColumns, setLocalColumns] = useState<Column[]>(columns);

  const handleToggleColumn = useCallback((columnId: string) => {
    const updated = localColumns.map(col =>
      col.id === columnId ? { ...col, visible: !col.visible } : col
    );
    setLocalColumns(updated);
  }, [localColumns]);

  const handleSave = useCallback(() => {
    onColumnChange(localColumns);
    localStorage.setItem('tableColumns', JSON.stringify(localColumns));
    setIsOpen(false);
  }, [localColumns, onColumnChange]);

  const handleReset = useCallback(() => {
    const defaults = columns.map(col => ({ ...col, visible: true }));
    setLocalColumns(defaults);
  }, [columns]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Eye size={16} />
        Columns
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Column Visibility</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
            {localColumns.map(col => (
              <div key={col.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={col.visible}
                  onChange={() => handleToggleColumn(col.id)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600"
                />
                <label className="text-sm text-gray-700 dark:text-gray-300 flex-1 cursor-pointer">
                  {col.label}
                </label>
                {col.visible ? (
                  <Eye size={14} className="text-green-600" />
                ) : (
                  <EyeOff size={14} className="text-gray-400" />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex-1 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded hover:bg-gray-300 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnManager;

export const useColumnManager = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const loadColumns = useCallback((defaultColumns: Column[]) => {
    const saved = localStorage.getItem('tableColumns');
    if (saved) {
      setColumns(JSON.parse(saved));
    } else {
      setColumns(defaultColumns);
    }
  }, []);

  return { columns, setColumns, loadColumns };
};
