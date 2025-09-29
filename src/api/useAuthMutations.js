import { useMutation } from "@tanstack/react-query";
import {
  checkEmail,
  checkUserName,
  registerUser,
  verifyOtp,
  resendOtp,
  completeOnboarding,
} from "/src/api/authClient.js";

// ✅ These MUST each receive a function
export const useCheckEmail = () => useMutation({ mutationFn: checkEmail });



export const useCheckUserName = () => useMutation({ mutationFn: checkUserName });
export const useRegisterUser = () => useMutation({ mutationFn: registerUser });  // ✅ IMPORTANT
export const useVerifyOtp = () => useMutation({ mutationFn: verifyOtp });
export const useResendOtp = () => useMutation({ mutationFn: resendOtp });
export const useCompleteOnboarding = () => useMutation({ mutationFn: completeOnboarding });
