import { FiTrendingUp } from "react-icons/fi";

const StatsCard = ({ title, value, trend, subtitle, icon, color }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-2 text-gray-900">{value}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
        {trend !== undefined && (
          <div className={`flex items-center mt-2 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? (
              <FiTrendingUp className="mr-1" />
            ) : (
              <FiTrendingDown className="mr-1" />
            )}
            <span className="text-sm font-medium">
              {Math.abs(trend).toFixed(1)}% from last period
            </span>
          </div>
        )}
      </div>
      <div className={`${color} p-3 rounded-full text-white transition-transform duration-300 hover:scale-110`}>
        {icon}
      </div>
    </div>
  </div>
);
export default StatsCard;