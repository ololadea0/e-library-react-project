import { supabase } from "./supabaseClient";

export const UploadPdf = async (file) => {
  try {
    const filePath = `pdfs/${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("e-library")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload failed:", error.message);
      return null;
    }

    // Get public URL after successful upload
    const { data: publicData } = supabase.storage
      .from("e-library")
      .getPublicUrl(filePath);

    return publicData?.publicUrl || null;
  } catch (err) {
    console.error("Unexpected error during upload:", err);
    return null;
  }
};

export const uploadImageTwo = async (file) => {
  const cloudName = "dmxpytmgz";
  const uploadPreset = "library-upload";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  return data.secure_url;
};

export default { UploadPdf, uploadImageTwo };
