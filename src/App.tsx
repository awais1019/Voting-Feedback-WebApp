import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./stores/useAuthStore";
import React, { Suspense } from "react";

const Login = React.lazy(() => import("./components/login/Login"));
const AdminDashboard = React.lazy(() => import("./components/AdminDashboard"));

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { role } = useAuthStore();
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export function App() {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                {<AdminDashboard />}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}
function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-screen">
      <svg className="animate-spin h-8 w-8 text-orange-500" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="...spinner path..."
        ></path>
      </svg>
    </div>
  );
}
