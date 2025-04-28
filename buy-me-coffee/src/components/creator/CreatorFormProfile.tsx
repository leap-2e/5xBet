"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
 
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Camera, CameraIcon, CircleX, ImageIcon, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea"; // Ensure this file exists or update the path
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ProfileType } from "./CreatorFormUtils";
const formSchema = z.object({
  image: z.string(),
  name: z.string().nonempty("Please enter name"),
  about: z.string().min(8, "Please enter info about yourself"),
  socialMediaURL: z.string().min(8, "Please enter a social link"),
});
 
interface CreateProps {
  currentStep: any;
  setCurrentStep: (step: number) => void;
}
 
export default function createProfile() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      about: "",
      socialMediaURL: "",
    },
  });
 
  const [file, setFile] = React.useState<File | null>(null);
  const [avatarImg, setAvatarImg] = React.useState<string | null>(null);
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
 
  const uploadImage = async (file: File | null) => {
    if (!file) {
      console.error("No file selected for upload.");
      return null;
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      if (!response.ok) {
        console.error("Upload failed:", result);
        return null;
      }
      console.log("Cloudinary upload result:", result);
      return result.secure_url;
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };
  
 
  const createProfile = async ({ values }: { values: ProfileType }) => {
    const imageUrl = await uploadImage(file);
 
    const response = await fetch("http://localhost:8000/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar_image: imageUrl,
        name: values.name,
        about: values.about,
        social_media_url: values.socialMediaURL,
        user_id : 19
      }),
    });
    if (!response.ok) {
      console.error("Failed to create profile");
      return;
    }
    const data = await response.json();
    if (data.error) {
      console.error("Failed to create profile:", data.message);
      return;
    }
    const { profile, userId } = data;
    console.log("Profile created successfully:", profile);
    console.log("User ID:", userId);
    if (imageUrl) {
      console.log("Image uploaded successfully:", imageUrl);
      form.setValue("image", imageUrl);
    } else {
      console.error("Failed to upload image");
    }
  };
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
 
    if (!file) {
      return;
    }
 
    setFile(file);
 
    const temImageUrl = URL.createObjectURL(file);
    setAvatarImg(temImageUrl);
    form.setValue("image", "uploaded");
  };
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    createProfile({ values: { ...values, avatarImage: file! } });
    console.log("Form submitted:", values);
    console.log("File:", file);
    console.log("Avatar Image:", avatarImg);
  }
  return (
    <div className="text-black h-full flex justify-center items-start pt-40">
      <div className="w-[500px] flex flex-col gap-10">
        <h1 className="text-[24px] font-semibold">
          Complete your profile page
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-black font-semibold">
                      Add photo
                    </FormLabel>
                    <FormControl>
                      {avatarImg ? (
                        <div className="h-[230px] w-[230px] relative rounded-full">
                          <div className="h-[138px]">
                            <Image
                              alt="file-input"
                              src={avatarImg}
                              width={1000}
                              height={1000}
                              className={
                                "size-full object-cover rounded-full h-[230px] w-[230px] border border-dashed border-blue-500/20 bg-blue-500/5 bg-cover bg-no-repeat bg-center"
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor="file-input"
                          className={`flex flex-col h-[230px] w-[230px] items-center justify-center cursor-pointer gap-2 p-4 rounded-full border border-dashed border-[#bc6c25] bg-[#fefae0]`}
                        >
                          <CameraIcon />
                          <Input
                            id="file-input"
                            type="file"
                            onChange={handleChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-black font-semibold">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name here"
                        {...field}
                        className="border outline-none focus-within:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-black font-semibold">
                      About
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write about yourself here"
                        {...field}
                        className="border outline-none focus-within:outline-none h-[130px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialMediaURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-black font-semibold">
                      Social media URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://"
                        {...field}
                        className="border outline-none focus-within:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-[40%] rounded-md text-white bg-[#18181b]"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
 
 