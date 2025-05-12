import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { customRoute } from "./lib/util";
import { LoadingBar } from "./components/LoadingBar";
import DashboardLayout from "./layout/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

const Login = React.lazy(() => import("./components/login/Login"));
const AdminDashboardPage = React.lazy(
  () => import("./pages/AdminDashboardPage")
);
const SignUp = React.lazy(() => import("./components/SignUp"));
const StudentDashboard = React.lazy(
  () => import("./components/StudentDashboard")
);

export function App() {
  return (
    <>
      <Suspense fallback={<LoadingBar />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "student"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {customRoute("admin-home", <AdminDashboardPage />, ["admin"])}
            {customRoute("admin-loading", <LoadingBar />, ["admin"])}
            {customRoute("student-home", <StudentDashboard />, ["student"])}
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
