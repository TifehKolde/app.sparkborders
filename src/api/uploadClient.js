import axios from "axios";

export const uploadFiles = async (files) => {
  try {
    const formData = new FormData();

    // Always send the first file as "media"
    if (files.length > 0) {
      formData.append("media", files[0]); 
    }

    // Send all files as "medias"
    files.forEach((file) => formData.append("medias", file));

    const { data } = await axios.post(
      "https://sandbox-sparkborders.onrender.com/api/v1/upload/",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    // Debug log
    console.log("Upload API raw response:", data);

    // Ensure consistent return format
    if (!data.success || !Array.isArray(data.data)) {
      return {
        success: false,
        data: [],
        message: data.message || "Upload failed",
      };
    }

    return data;
  } catch (err) {
    console.error("Upload failed:", err.response?.data || err.message);
    return {
      success: false,
      data: [],
      message: err.response?.data?.message || err.message,
    };
  }
};
