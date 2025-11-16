'use client';

import React, { useState } from 'react';
import { GripHorizontal, X } from 'lucide-react';

interface DraggableWidgetProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onRemove?: () => void;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

export const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  id,
  title,
  children,
  onRemove,
  isDragging,
  onDragStart,
  onDragEnd,
}) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      data-widget-id={id}
      className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden transition-all ${
        isDragging ? 'opacity-50 scale-95' : 'hover:border-blue-500'
      } cursor-move`}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <GripHorizontal size={18} className="text-gray-500 hover:text-blue-400" />
          <h3 className="font-semibold text-gray-200">{title}</h3>
        </div>
        {onRemove && (
          <button
            onClick={onRemove}
            className="p-1 hover:bg-red-900 rounded transition text-gray-400 hover:text-red-400"
            title="Remove widget"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Widget Content */}
      <div className="p-4">{children}</div>
    </div>
  );
};

export interface WidgetLayout {
  id: string;
  title: string;
  type: string;
  visible: boolean;
  order: number;
}

export const useWidgetLayout = (initialLayout: WidgetLayout[]) => {
  const [layout, setLayout] = useState<WidgetLayout[]>(initialLayout);

  const reorderWidgets = (sourceId: string, targetId: string) => {
    const sourceIndex = layout.findIndex((w) => w.id === sourceId);
    const targetIndex = layout.findIndex((w) => w.id === targetId);

    if (sourceIndex === -1 || targetIndex === -1) return;

    const newLayout = [...layout];
    [newLayout[sourceIndex], newLayout[targetIndex]] = [
      newLayout[targetIndex],
      newLayout[sourceIndex],
    ];

    setLayout(newLayout);
  };

  const toggleWidgetVisibility = (id: string) => {
    setLayout((prev) =>
      prev.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w))
    );
  };

  const removeWidget = (id: string) => {
    setLayout((prev) => prev.filter((w) => w.id !== id));
  };

  return {
    layout,
    reorderWidgets,
    toggleWidgetVisibility,
    removeWidget,
  };
};
