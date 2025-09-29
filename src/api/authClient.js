import api from "./authApi";

// ✅ 1. Check if email is available
export const checkEmail = async ({ email }) => {
  console.log("Payload being sent to server:", { email });
  const { data } = await api.post("/v1/user/auth/checkEmail", { email });
  console.log("Response:", data);
  return data;
};



// ✅ 2. Check if username is available
export const checkUserName = async ({ userName }) => {
  const { data } = await api.post("/v1/user/auth/checkUserName", { userName });
  return data;
};

// ✅ 3. Register user (sends OTP email)
export const registerUser = async ({ name, email, userName, password }) => {
  const { data } = await api.post("/v1/user/auth/register", {
    name,
    email,
    userName,
    password,
  });
  return data;
};

// ✅ 4. Verify OTP
export const verifyOtp = async ({ otp }) => {
  try {
    const { data } = await api.post("/v1/user/auth/verifyOtp", { otp });
    return data;
  } catch (err) {
    console.error("verifyOtp failed:", err.response?.data || err.message);
    return { success: false, message: "Unable to verify OTP" };
  }
};

// ✅ 5. Resend OTP
export const resendOtp = async () => {
  try {
    const { data } = await api.post("/v1/user/auth/resendOtp", {});
    return data;
  } catch (err) {
    console.error("resendOtp failed:", err.response?.data || err.message);
    return { success: false, message: "Unable to resend OTP" };
  }
};

// ✅ 6. Complete onboarding
export const completeOnboarding = async ({
  userType,
  country,
  state,
  address,
  intrestedProduct,
  idType = "",
  idImageFront = "",
  idImageBack = "",
}) => {
  try {
    const { data } = await api.post("/v1/user/auth/completeOnboarding", {
      userType,
      country,
      state,
      address,
      intrestedProduct,
      idType,
      idImageFront, // these are URLs returned from /upload/
      idImageBack,
    });
    return data;
  } catch (err) {
    console.error("completeOnboarding failed:", err.response?.data || err.message);
    return { success: false, message: "Unable to complete onboarding" };
  }
};

  