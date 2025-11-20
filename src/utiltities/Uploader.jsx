import { createClient } from "@supabase/supabase-js";

export const UploadPdf = async (file) => {
  const supabaseUrl = "https://cdmaoihjiqltclcvrrmm.supabase.co";
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkbWFvaWhqaXFsdGNsY3Zycm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4Mzc3MzUsImV4cCI6MjA3NzQxMzczNX0.EfgvE_ROpQOMX_wv0f2qS5hd9u2H8VSmf2E88UP8Tqw";

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    cconsole.error("Unexpected error during upload:", err);
    return null;
  }
};

export const uploadImageTwo = async (file) => {
  const cloudName = "dmxpytmgz";
  const uploadPreset = "library-upload";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  // const isPDF = file.type === "application/pdf";
  // const resourceType = isPDF ? "raw" : "image";

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
