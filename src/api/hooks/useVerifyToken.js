import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useVerifyToken() {
  return useQuery({
    queryKey: ["verifyToken"],
    queryFn: async () => {
      const response = await axios.get("/v1/user/auth/verifyToken", {
        withCredentials: true, // if you're using cookies
      });
      return response.data;
    },
    retry: false, // Prevent infinite retries on 401
  });
}
