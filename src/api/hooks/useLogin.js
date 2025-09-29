// src/hooks/useLogin.js
import { useMutation } from "@tanstack/react-query";
import api from "../authApi"; // Axios instance

// Login function: calls backend /auth/login
const loginUser = async ({ email, password }) => {
  const res = await api.post("/v1/user/auth/login", { email, password });
  // Backend sets HttpOnly cookie; we return user info only
  return res.data;
};

// Mutation hook for React components
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser, // ✅ updated for React Query v5
  });
};
