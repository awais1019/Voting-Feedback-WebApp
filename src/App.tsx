import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { customRoute } from "./lib/util";
import { LoadingBar } from "./components/LoadingBar";


const Login = React.lazy(() => import("./components/login/Login"));
const AdminDashboard = React.lazy(() => import("./components/AdminDashboard"));
const SignUp = React.lazy(() => import("./components/SignUp"));
const StudentDashboard = React.lazy(() => import("./components/StudentDashboard"));

export function App() {
  return (
    <>
      <Suspense fallback={<LoadingBar />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          {customRoute("/admin-dashboard", <AdminDashboard />, ["admin"])}
          {customRoute("/student-dashboard", <StudentDashboard />, ["student"])}
        </Routes>
      </Suspense>
    </>
  );
}
