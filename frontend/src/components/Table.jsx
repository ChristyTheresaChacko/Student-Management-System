import React from "react";
import Button from "./Button";

/**
 * Table Component - Reusable table for displaying list data
 * 
 * @param {Array} columns - Array of column definitions
 *   Each column: { header: string, key: string, render?: (value, row) => JSX }
 * @param {Array} data - Array of row objects
 * @param {Array} actions - Array of action buttons for each row
 *   Each action: { label: string, onClick: (row) => void, className?: string, confirm?: boolean }
 * @param {boolean} loading - Loading state
 * @param {string} emptyMessage - Message when no data
 */
const Table = ({ 
  columns = [], 
  data = [], 
  actions = [], 
  loading = false, 
  emptyMessage = "No data found." 
}) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-x-auto border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Header - Hidden on mobile, shown on md+ */}
        <thead className="bg-gray-50 hidden md:table-header-group">
          <tr>
            {columns.map((col, idx) => (
              <th 
                key={idx}
                className={`px-6 py-3 text-base font-medium text-gray-500 uppercase tracking-wider ${
                  col.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {col.header}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-6 py-3 text-right text-base font-medium text-gray-500 uppercase tracking-wider">
                ACTIONS
              </th>
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td 
                colSpan={columns.length + (actions.length > 0 ? 1 : 0)} 
                className="text-center p-4 text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : safeData.length === 0 ? (
            <tr>
              <td 
                colSpan={columns.length + (actions.length > 0 ? 1 : 0)} 
                className="text-center p-4 text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            safeData.map((row, rowIdx) => (
              <tr 
                key={rowIdx} 
                className="hover:bg-gray-50 block md:table-row border-b md:border-b mb-4 md:mb-0"
              >
                {columns.map((col, colIdx) => {
                  const cellValue = col.key.split(".").reduce((obj, key) => obj?.[key], row);
                  
                  return (
                    <td 
                      key={colIdx} 
                      className={`block md:table-cell px-6 py-4 text-base before:content-[attr(data-label)] before:font-bold before:mr-3 md:before:content-none ${col.align === "right" ? "md:text-right" : ""}`}
                      data-label={col.header}
                    >
                      {col.render ? col.render(cellValue, row) : cellValue || "-"}
                    </td>
                  );
                })}
                
                {/* Actions Column */}
                {actions.length > 0 && (
                  <td className="block md:table-cell px-6 py-4 space-x-2 flex flex-col md:flex-row gap-2 md:gap-0 md:text-right before:content-['Actions'] before:font-bold md:before:content-none">
                    {actions.map((action, actionIdx) => (
                      <Button
                        key={actionIdx}
                        className={`${action.className || "bg-blue-600 hover:bg-blue-700 text-white"} w-full md:w-auto`}
                        onClick={() => {
                          if (action.confirm) {
                            if (window.confirm(action.confirm)) {
                              action.onClick(row);
                            }
                          } else {
                            action.onClick(row);
                          }
                        }}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
