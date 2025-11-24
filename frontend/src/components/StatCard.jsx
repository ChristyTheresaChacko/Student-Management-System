import React from "react";

/**
 * StatCard Component
 * Reusable card for displaying statistics with title and value
 * 
 * @param {string} title - Card title/label
 * @param {string|number} value - Main value to display
 * @param {string} icon - Optional Lucide icon component
 * @param {string} color - Optional color class (default: green-600)
 */
const StatCard = ({ 
  title, 
  value, 
  icon: Icon = null, 
  color = "border-green-600" 
}) => {
  return (
    <div className={`bg-white shadow-md rounded-2xl p-6 border-l-8 ${color} hover:shadow-xl transition-all`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-600 font-medium">{title}</h3>
          <p className="text-3xl font-bold text-darkgreen-700 mt-2">{value}</p>
        </div>
        {Icon && (
          <div className="text-gray-400">
            <Icon size={32} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
