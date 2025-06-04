import React from 'react';
// import AdminSidebar from '@/components/layout/AdminSidebar'; // If you have a specific admin sidebar
// import { useAuth } from '@/context/AuthContext'; // To protect admin routes

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { currentUser, loading } = useAuth();

  // This is a basic protection, more robust checks might be needed (e.g., checking user role from Firestore)
  // if (loading) {
  //   return <div>Loading admin section...</div>;
  // }

  // if (!currentUser || currentUser.role !== 'admin') {
  //   // Redirect to home or login, or show an unauthorized message
  //   // For simplicity, showing a message here. In a real app, redirect.
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <p className="text-xl text-destructive">Access Denied. You do not have permission to view this page.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex min-h-screen bg-admin-background"> {/* Assuming you have admin specific bg color */}
      {/* <AdminSidebar /> */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-semibold mb-4">Admin Menu</h2>
        <nav>
          <ul className="space-y-2">
            <li><a href="/admin" className="hover:text-primary">Dashboard</a></li>
            <li><a href="/admin/users" className="hover:text-primary">User Management</a></li>
            <li><a href="/admin/verification" className="hover:text-primary">Seller Verification</a></li>
            {/* Add more admin links as needed */}
          </ul>
        </nav>
        <p className="text-sm text-gray-400 mt-auto">Admin section placeholder navigation.</p>
      </aside>
      <main className="flex-grow p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}