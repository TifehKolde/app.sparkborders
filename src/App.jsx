import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";

import ProtectedRoute from "./components/ProtectedRoute";
import { publicRoutes, protectedRoutes } from "./Routes/routesConfig";

export default function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="bottom-right" reverseOrder={false} />
      <CartProvider>
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public Routes */}
          {publicRoutes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}

          {/* Protected Routes Wrapper */}
          <Route element={<ProtectedRoute />}>
            {protectedRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Routes>
      </CartProvider>
    </div>
  );
}
