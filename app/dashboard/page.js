"use client";

import RoleGuard from "@/app/middlewares/RoleGuard";

export default function DashboardPage() {
  return (
    <RoleGuard allowedRoles={["Admin"]}>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">
            This page is not yet implemented
          </h1>
          <p className="text-gray-500">Please check back later.</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-700 transition cursor-pointer mt-2"
            onClick={() => (window.location.href = "/auth/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    </RoleGuard>
  );
}
