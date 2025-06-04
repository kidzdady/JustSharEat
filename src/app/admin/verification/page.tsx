'use client'; // Verification will involve fetching data and actions

import React from 'react';
// import { Button } from '@/components/ui/Button';

export default function AdminVerificationPage() {
  // const [pendingVerifications, setPendingVerifications] = useState([]); // Example state

  // useEffect(() => {
  //   // Fetch pending verifications
  // }, []);

  // const handleApprove = (sellerId) => { /* ... */ };
  // const handleReject = (sellerId) => { /* ... */ };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Seller Verification</h1>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Pending Verifications</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Name/ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type (Restaurant/Event/Home)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Example Row - Replace with dynamic data */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Mama Ntilie Foods</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Restaurant</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2023-03-10</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {/* <Button onClick={() => handleApprove('seller123')} variant="primary" size="sm">Approve</Button>
                <Button onClick={() => handleReject('seller123')} variant="destructive" size="sm" className="ml-2">Reject</Button> */}
                <span className="text-green-600 hover:underline cursor-pointer mr-2">Approve</span>
                <span className="text-red-600 hover:underline cursor-pointer">Reject</span>
              </td>
            </tr>
            {/* Add more rows or map through 'pendingVerifications' state */}
          </tbody>
        </table>
        <p className="mt-4 text-sm text-gray-500">Seller verification table and actions coming soon.</p>
      </div>
    </div>
  );
}