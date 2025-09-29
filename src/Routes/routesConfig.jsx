// src/routesConfig.js
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Dashboard from "../pages/auth/dashboard";

import OrderPage from "../pages/Orders";
import OrderDetailsPage from "../pages/OrderDetailsPage";

import AccountSetup from "../pages/auth/accountSetup";
import IDSetup from "../pages/auth/IDSetup";
import ProfileCamera from "../pages/auth/ProfileCamera";
import EmailCheck from "../pages/auth/EmailCheck";
import EmailCode from "../pages/auth/EmailCode";
import EmailSuccess from "../pages/auth/EmailSuccess";

import ForgotPassword from "../pages/auth/ForgetPassword/ForgotPassword";
import CheckEmail from "../pages/auth/ForgetPassword/CheckEmail";
import SetNewPassword from "../pages/auth/ForgetPassword/SetNewPassword";
import PasswordResetSuccess from "../pages/auth/ForgetPassword/PasswordResetSuccess";

import DistributorPage from "../pages/Distributor";
import DistributorDetails from "../pages/DistributorsDetails";
import ProductDetails from "../pages/ProductDetails";

import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

import ManufacturerPage from "../pages/manufacturer";
import ManufacturerDetails from "../pages/ManufacturerDetails";

import Wallet from "../pages/Wallet";

import EventPage from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import MyTicketsPage from "../pages/MyTicketsPage";

import InvestmentPage from "../pages/Invest";
import InvestmentDetails from "../pages/InvestmentDetails";

import Profile from "../pages/Profile";

// ✅ Public Routes (No Auth Required)
export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Register /> },

    // Account Setup Flow
    { path: "/accountsetup", element: <AccountSetup /> },
    { path: "/idsetup", element: <IDSetup /> },
    { path: "/profilecam", element: <ProfileCamera /> },
  
    // Email Verification
    { path: "/emailcheck", element: <EmailCheck /> },
    { path: "/emailcode", element: <EmailCode /> },
    { path: "/emailsuccess", element: <EmailSuccess /> },

  // Investments
  { path: "/investments", element: <InvestmentPage /> },
  { path: "/investment/:idSlug", element: <InvestmentDetails /> },

    // Events
    { path: "/events", element: <EventPage /> },
    { path: "/events/:slug", element: <EventDetails /> },

      // Distributors
  { path: "/distributors", element: <DistributorPage /> },
  { path: "/distributors/:id", element: <DistributorDetails /> },
  { path: "/distributors/:distributorId/products/:id", element: <ProductDetails /> },

  // Manufacturer
  { path: "/manufacturers", element: <ManufacturerPage /> },
  { path: "/manufacturers/:id", element: <ManufacturerDetails /> },

  // Forget Password Flow
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/checkemail", element: <CheckEmail /> },
  { path: "/set-new-password/:token", element: <SetNewPassword /> },
  { path: "/password-reset-success", element: <PasswordResetSuccess /> },
];




// ✅ Protected Routes (Requires Authentication)
export const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },

  // Orders
  { path: "/orders", element: <OrderPage /> },
  { path: "/orders/:id", element: <OrderDetailsPage /> },


  { path: "/ticket", element: <MyTicketsPage /> },

  // Wallet
  { path: "/wallet", element: <Wallet /> },




];
