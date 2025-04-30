import { CLOUD_NAME, UPLOAD_PRESET } from "@/app/constants/routes";
import axios from "axios";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Энэ функц className-ийг хялбар болгодог
// - `clsx` → нөхцөлтэйгөөр class нэмэхэд тусална (жишээ нь: isDark && "bg-black")
// - `twMerge` → зөрчилдөж байгаа tailwind class-уудыг цэвэрлэнэ (жишээ нь: "px-4 px-2" бол зөвхөн нэгийг үлдээнэ)
// Tailwind CSS ашиглахад кодыг илүү цэвэрхэн, аюулгүй болгодог
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// 🎯 Cloudinary руу upload хийх function (duudagdaj ajjillana , onContinue dotor orson baigaa)
export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    formData
  );
  return res.data.secure_url as string;
  // Шууд Cloudinary линк буцаана
};
