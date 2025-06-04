import React from 'react';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl text-primary mt-2">0</p>
          <p className="text-sm text-gray-500">User data coming soon.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">Pending Verifications</h2>
          <p className="text-3xl text-primary mt-2">0</p>
          <p className="text-sm text-gray-500">Verification data coming soon.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">Reported Issues</h2>
          <p className="text-3xl text-primary mt-2">0</p>
          <p className="text-sm text-gray-500">Issue tracking coming soon.</p>
        </div>
      </div>
      {/* Further admin dashboard content can be added here */}
      <p className="mt-8 text-gray-600">Welcome to the SharEat Admin Panel. More features will be available soon.</p>
    </div>
  );
}