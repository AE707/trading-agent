'use client';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToCSV = (data: any[], filename: string = 'export.csv') => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header];
      return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
    }).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (data: any[], filename: string = 'export.pdf', title: string = 'Report') => {
  if (!data || data.length === 0) return;
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Title
  doc.setFontSize(16);
  doc.text(title, pageWidth / 2, 15, { align: 'center' });
  
  // Date
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 25, { align: 'center' });
  
  // Table
  const tableColumn = Object.keys(data[0]);
  const tableRows = data.map(item =>
    tableColumn.map(col => item[col])
  );
  
  (doc as any).autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 35,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [31, 41, 55],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [243, 244, 246],
    },
  });
  
  doc.save(filename);
};

export const exportChartAsPNG = (elementId: string, filename: string = 'chart.png') => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const canvas = element.querySelector('canvas');
  if (!canvas) return;
  
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
};
