import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/app-layout";
import { ProtectedRoute } from "./components/layout/protected-route";
import { LoginPage } from "./pages/auth/login";
import { ChangePassword } from "./pages/auth/change-password";
import { DashboardPage } from "./pages/dashboard";
import { SalesDashboard } from "./pages/sales/dashboard";
import { CustomerMasterPage } from "./pages/sales/customers";
import { WeeklyCamPage } from "./pages/sales/weekly-cam";
import { VisitReportPage } from "./pages/sales/visit-report";
import { ReportsPage } from "./pages/sales/reports";
import { MonthlyCamPage } from "./pages/sales/monthly-cam";
import { ComingSoonPage } from "./pages/errors/coming-soon";
import { SettingsPage } from "./pages/settings";

// App Engineer Workspace Imports
import { AppEngDashboard } from "./pages/app-engineer/dashboard";
import { PendingEnquiriesPage } from "./pages/app-engineer/pending-enquiry";
import { GeneralWorkPage } from "./pages/app-engineer/general-work";
import { QuotationsPage } from "./pages/app-engineer/quotations";
import { AppEngReportsPage } from "./pages/app-engineer/reports";

// Plant Workspace Imports
import { PlantDashboard } from "./pages/plant/dashboard";
import { PlantTracking } from "./pages/plant/tracking";
import { PlantWam } from "./pages/plant/wam";
import { PlantDirectory } from "./pages/plant/directory";
import { PlantReports } from "./pages/plant/reports";

// Define role groupings based on requirements
const ALL_ROLES = ['ADMIN', 'MD', 'MANAGER', 'SALES_ENGINEER', 'APPLICATION_ENGINEER', 'PLANT_ENGINEER'] as const;
const GLOBAL_ROLES = ['ADMIN', 'MD', 'MANAGER'] as const;
const SALES_ROLES = ['ADMIN', 'MD', 'MANAGER', 'SALES_ENGINEER'] as const;
const APP_ENG_ROLES = ['ADMIN', 'MD', 'MANAGER', 'APPLICATION_ENGINEER'] as const;
const PLANT_ROLES = ['ADMIN', 'MD', 'MANAGER', 'PLANT_ENGINEER'] as const;

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/change-password",
    element: (
      <ProtectedRoute allowedRoles={[...ALL_ROLES]}>
        <ChangePassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute allowedRoles={[...GLOBAL_ROLES]}>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      // --- SALES MODULES ---
      {
        path: "/sales",
        element: (
          <ProtectedRoute allowedRoles={[...SALES_ROLES]}>
            <SalesDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sales/customers",
        element: (
          <ProtectedRoute allowedRoles={[...SALES_ROLES]}>
            <CustomerMasterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sales/weekly-cam",
        element: (
          <ProtectedRoute allowedRoles={[...SALES_ROLES]}>
            <WeeklyCamPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sales/visit-report",
        element: (
          <ProtectedRoute allowedRoles={[...SALES_ROLES]}>
            <VisitReportPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sales/monthly-cam",
        element: (
          <ProtectedRoute allowedRoles={[...SALES_ROLES]}>
            <MonthlyCamPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sales/reports",
        element: (
          <ProtectedRoute allowedRoles={[...ALL_ROLES]}>
            <ReportsPage />
          </ProtectedRoute>
        ),
      },
      
      // --- APP ENGINEER MODULES ---
      {
        path: "/app-engineer",
        element: (
          <ProtectedRoute allowedRoles={[...APP_ENG_ROLES]}>
            <ComingSoonPage moduleName="App Engineering Dashboard" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app-engineer/pending-enquiry",
        element: (
          <ProtectedRoute allowedRoles={[...APP_ENG_ROLES]}>
            <ComingSoonPage moduleName="Pending Enquiry" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app-engineer/general-work",
        element: (
          <ProtectedRoute allowedRoles={[...APP_ENG_ROLES]}>
            <ComingSoonPage moduleName="General Work" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app-engineer/quotations",
        element: (
          <ProtectedRoute allowedRoles={[...APP_ENG_ROLES]}>
            <ComingSoonPage moduleName="Quotations" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app-engineer/reports",
        element: (
          <ProtectedRoute allowedRoles={[...APP_ENG_ROLES]}>
            <ComingSoonPage moduleName="App Engineer Reports" />
          </ProtectedRoute>
        ),
      },

      // --- PLANT ENGINEER MODULES ---
      {
        path: "/plant",
        element: (
          <ProtectedRoute allowedRoles={[...PLANT_ROLES]}>
            <ComingSoonPage moduleName="Plant Dashboard" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/plant/tracking",
        element: (
          <ProtectedRoute allowedRoles={[...PLANT_ROLES]}>
            <ComingSoonPage moduleName="Plant Tracking" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/plant/wam",
        element: (
          <ProtectedRoute allowedRoles={[...PLANT_ROLES]}>
            <ComingSoonPage moduleName="WAM" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/plant/directory",
        element: (
          <ProtectedRoute allowedRoles={[...PLANT_ROLES]}>
            <ComingSoonPage moduleName="Plant Directory" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/plant/reports",
        element: (
          <ProtectedRoute allowedRoles={[...PLANT_ROLES]}>
            <ComingSoonPage moduleName="Plant Reports" />
          </ProtectedRoute>
        ),
      },

      // --- SHARED MODULES ---
      {
        path: "/directory",
        element: (
          <ProtectedRoute allowedRoles={[...GLOBAL_ROLES]}>
            <ComingSoonPage moduleName="Employee Directory" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute allowedRoles={[...ALL_ROLES]}>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
