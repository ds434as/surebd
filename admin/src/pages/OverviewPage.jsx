import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { 
  ShoppingBag, Users, CreditCard, DollarSign,
  TrendingUp, PieChart as PieChartIcon, Truck,
  Star, Award, RefreshCw, AlertCircle, Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444'];

const OverviewPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('30days');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://surebdbackend.arbeittechnology.com/admin/dashboard-stats');
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ icon, title, value, change, isPositive, loading }) => {
    if (loading) {
      return (
        <div className="bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 p-6 rounded-xl shadow-sm border border-gray-200/30 dark:border-gray-700/30 animate-pulse">
          <div className="h-6 w-6 bg-gray-300/50 dark:bg-gray-600/50 rounded-full mb-4"></div>
          <div className="h-5 w-3/4 bg-gray-300/50 dark:bg-gray-600/50 rounded mb-2"></div>
          <div className="h-8 w-1/2 bg-gray-300/50 dark:bg-gray-600/50 rounded"></div>
        </div>
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br ${
          isPositive 
            ? 'from-green-50/50 to-indigo-50/50 dark:from-green-900/10 dark:to-indigo-900/10' 
            : 'from-red-50/50 to-amber-50/50 dark:from-red-900/10 dark:to-amber-900/10'
        } p-6 rounded-xl shadow-sm border border-gray-200/30 dark:border-gray-700/30 hover:shadow-md transition-all`}
      >
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${
            isPositive 
              ? 'bg-gradient-to-br from-green-100 to-indigo-100 dark:from-green-900/30 dark:to-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
              : 'bg-gradient-to-br from-red-100 to-amber-100 dark:from-red-900/30 dark:to-amber-900/30 text-red-600 dark:text-red-400'
          }`}>
            {icon}
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            isPositive 
              ? 'bg-green-100/70 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
              : 'bg-red-100/70 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          }`}>
            {change}
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
      </motion.div>
    );
  };

  const renderChartSkeleton = () => (
    <div className="bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 p-6 rounded-xl shadow-sm border border-gray-200/30 dark:border-gray-700/30 h-80">
      <div className="animate-pulse h-full w-full bg-gray-200/50 dark:bg-gray-700/50 rounded"></div>
    </div>
  );

  const renderErrorState = (message) => (
    <div className="bg-gradient-to-br from-red-50/50 to-pink-50/50 dark:from-red-900/10 dark:to-pink-900/10 p-6 rounded-xl shadow-sm border border-red-200/50 dark:border-red-900/30 h-80 flex items-center justify-center">
      <div className="text-center text-red-500 dark:text-red-400">
        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
        <p>{message || 'Failed to load data'}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md hover:opacity-90 transition-opacity"
        >
          Retry
        </button>
      </div>
    </div>
  );

//   if (loading && !dashboardData) {
//     return (
//       <div className="flex-1 flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <Loader2 className="animate-spin h-8 w-8 text-indigo-500 mx-auto" />
//           <p className="mt-2 text-gray-500 dark:text-gray-400">Loading dashboard data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex-1 flex items-center justify-center min-h-screen">
//         {renderErrorState(error)}
//       </div>
//     );
//   }

  return (
    <div className="flex-1 overflow-auto relative font-baji">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 via-purple-50/20 to-pink-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 -z-10" />
      
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      </div>
      
      <div className="px-2 py-4 md:p-6 space-y-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            {['7days', '30days', '90days'].map((range) => (
              <motion.button
                key={range}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1 text-sm rounded-md transition-all ${
                  dateRange === range 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                }`}
              >
                {range === '7days' ? '7 Days' : range === '30days' ? '30 Days' : '90 Days'}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<ShoppingBag className="h-5 w-5" />}
            title="Total Products"
            value={loading ? 0 : dashboardData?.counts.products}
            change="+12%"
            isPositive={true}
            loading={loading}
          />
          <StatCard
            icon={<CreditCard className="h-5 w-5" />}
            title="Total Orders"
            value={loading ? 0 : dashboardData?.counts.orders}
            change="+24%"
            isPositive={true}
            loading={loading}
          />
          <StatCard
            icon={<Users className="h-5 w-5" />}
            title="Total Customers"
            value={loading ? 0 : dashboardData?.counts.users}
            change="+8%"
            isPositive={true}
            loading={loading}
          />
          <StatCard
            icon={<FaBangladeshiTakaSign className="h-5 w-5" />}
            title="Total Revenue"
            value={loading ? '৳0' : `৳${dashboardData.charts.salesData.reduce((acc, curr) => acc + curr.totalSales, 0).toLocaleString()}`}
            change="+32%"
            isPositive={true}
            loading={loading}
          />
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Overview Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-white/80 to-indigo-50/50 dark:from-gray-800/50 dark:to-indigo-900/10 p-6 rounded-xl shadow-sm border border-gray-200/30 dark:border-gray-700/30 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg flex items-center text-gray-900 dark:text-white">
                <TrendingUp className="h-5 w-5 mr-2 text-indigo-500" />
                Sales Overview
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Last {dateRange === '7days' ? '7' : dateRange === '30days' ? '30' : '90'} Days
                </span>
              </div>
            </div>
            <div className="h-80">
              {loading ? renderChartSkeleton() : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dashboardData.charts.salesData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="_id" 
                      stroke="#6B7280"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#6B7280"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `৳${value.toLocaleString()}`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        borderColor: '#E5E7EB',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        padding: '0.5rem'
                      }}
                      formatter={(value) => [`৳${value.toLocaleString()}`, 'Sales']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="totalSales"
                      stroke="#6366F1"
                      fillOpacity={1}
                      fill="url(#colorSales)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>

          {/* Category Distribution Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-white/80 to-purple-50/50 dark:from-gray-800/50 dark:to-purple-900/10 p-6 rounded-xl shadow-sm border border-gray-200/30 dark:border-gray-700/30 hover:shadow-md transition-all"
          >
            <h3 className="font-medium text-lg mb-4 flex items-center text-gray-900 dark:text-white">
              <PieChartIcon className="h-5 w-5 mr-2 text-purple-500" />
              Category Distribution
            </h3>
            <div className="h-80">
              {loading ? renderChartSkeleton() : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData.charts.categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="_id"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {dashboardData.charts.categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        borderColor: '#E5E7EB',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        padding: '0.5rem'
                      }}
                      formatter={(value) => [value, 'Products']}
                    />
                    <Legend 
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      wrapperStyle={{
                        paddingLeft: '20px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Status Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-white/80 to-green-50/50 dark:from-gray-800/50 dark:to-green-900/10 p-6 rounded-xl shadow-sm border border-gray-200/30 dark:border-gray-700/30 hover:shadow-md transition-all"
          >
            <h3 className="font-medium text-lg mb-4 flex items-center text-gray-900 dark:text-white">
              <Truck className="h-5 w-5 mr-2 text-green-500" />
              Order Status
            </h3>
            <div className="h-64">
              {loading ? renderChartSkeleton() : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Pending', value: dashboardData.counts.pendingOrders, color: '#F59E0B' },
                      { name: 'Processing', value: dashboardData.counts.processingOrders, color: '#3B82F6' },
                      { name: 'Delivered', value: dashboardData.counts.deliveredOrders, color: '#10B981' },
                      { name: 'Canceled', value: dashboardData.counts.canceledOrders, color: '#EF4444' },
                    ]}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="#E5E7EB" />
                    <XAxis 
                      type="number" 
                      stroke="#6B7280"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="#6B7280"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        borderColor: '#E5E7EB',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        padding: '0.5rem'
                      }}
                      formatter={(value) => [value, 'Orders']}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[0, 4, 4, 0]}
                    >
                      {[
                        { name: 'Pending', value: dashboardData.counts.pendingOrders, color: '#F59E0B' },
                        { name: 'Processing', value: dashboardData.counts.processingOrders, color: '#3B82F6' },
                        { name: 'Delivered', value: dashboardData.counts.deliveredOrders, color: '#10B981' },
                        { name: 'Canceled', value: dashboardData.counts.canceledOrders, color: '#EF4444' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>

          {/* Rating Distribution */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-white/80 to-amber-50/50 dark:from-gray-800/50 dark:to-amber-900/10 p-6 rounded-xl shadow-sm border border-gray-200/30 dark:border-gray-700/30 hover:shadow-md transition-all"
          >
            <h3 className="font-medium text-lg mb-4 flex items-center text-gray-900 dark:text-white">
              <Star className="h-5 w-5 mr-2 text-amber-500" />
              Customer Ratings
            </h3>
            <div className="h-64">
              {loading ? renderChartSkeleton() : (
                <>
                  <ResponsiveContainer width="100%" height="80%">
                    <BarChart
                      data={dashboardData.reviewStats.ratingDistribution}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="rating" 
                        stroke="#6B7280"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="#6B7280"
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          borderRadius: '0.5rem',
                          borderColor: '#E5E7EB',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          padding: '0.5rem'
                        }}
                        formatter={(value) => [value, 'Reviews']}
                      />
                      <Bar 
                        dataKey="count" 
                        radius={[4, 4, 0, 0]}
                        fill="#F59E0B"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="text-center mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Average Rating: <span className="font-semibold">
                        {dashboardData.reviewStats.averageRating.toFixed(1)}/5
                      </span> from <span className="font-semibold">
                        {dashboardData.reviewStats.totalReviews} reviews
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Top Selling Products */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-white/80 to-pink-50/50 dark:from-gray-800/50 dark:to-pink-900/10 p-6 rounded-xl shadow-sm border border-gray-200/30 dark:border-gray-700/30 hover:shadow-md transition-all"
          >
            <h3 className="font-medium text-lg mb-4 flex items-center text-gray-900 dark:text-white">
              <Award className="h-5 w-5 mr-2 text-pink-500" />
              Top Selling Products
            </h3>
            <div className="space-y-4">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center p-2 rounded-lg animate-pulse">
                    <div className="h-12 w-12 rounded-md bg-gray-200/50 dark:bg-gray-700/50"></div>
                    <div className="ml-4 flex-1 space-y-2">
                      <div className="h-4 w-3/4 bg-gray-200/50 dark:bg-gray-700/50 rounded"></div>
                      <div className="h-3 w-1/2 bg-gray-200/50 dark:bg-gray-700/50 rounded"></div>
                    </div>
                  </div>
                ))
              ) : (
                dashboardData.topSellingProducts.map((product, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200/30 dark:border-gray-600/30">
                      {product.images[0] && (
                        <img
                          src={`https://backend.tech10bd.com/images/${product.images[0]}`}
                          alt={product.productName}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {product.productName}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ৳{product.price}
                        </p>
                        <p className="text-xs font-medium text-green-600 dark:text-green-400">
                          {product.sales} sold
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;