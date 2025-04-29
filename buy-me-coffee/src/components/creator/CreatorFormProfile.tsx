'use client';

import { useEffect, useState } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ProfileType, ProfileSchema } from './CreatorFormUtils';
import axios from 'axios';

import { UserButton } from "@clerk/nextjs";

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export default function CreatorFormProfile() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    type CreateProfile = {
        name: string,
        bio: string,
        socialMediaURL: string,
        image: string,
        user_id: number,
    }




    const form = useForm<ProfileType>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: '',
            bio: '',
            image: undefined,
            socialMediaURL: '',
        },
    });

    // 🎯 Файлаа авна
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue('image', file); // React Hook Form-д file хадгална
            setImagePreview(URL.createObjectURL(file)); // Зураг урьдчилж preview хийнэ
        }
    };

    // 🎯 Cloudinary руу upload хийх
    const uploadImageToCloudinary = async (file: File) => {
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
    const onContinue = async (values: ProfileType) => {
        console.log('🛠️ Form values before upload:', values);

        const file = values.image;

        if (file instanceof File) {
            try {
                // 1. Upload Image
                // const imageUrl = await uploadImageToCloudinary(file);
                // console.log('✅ Image uploaded to Cloudinary:', imageUrl);

                // 2. Create Updated Values
                // const updatedValues = { ...values, image: imageUrl };
                // console.log('🔥 Final profile submit:', updatedValues);

                // 3. Send to Backend with Axios
                console.log(BASE_URL);

                const response = await axios.post(`${BASE_URL}/profile`, {
                    name: 'ursa',
                    about: 'gamer',
                    avatar_image: 'img url',
                    social_media_url: 'insagramurl',
                    user_id: 19,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('🚀 Profile created successfully:', response.data);
            } catch (error: any) {
                console.log('❌ Error creating profile:', error?.response?.data || error.message);
            }
        } else {
            console.log('⚠️ No image file to upload');
        }
    };

    return (
        <div className="w-full h-full">
            <UserButton></UserButton>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onContinue)} className="space-y-6">

                    {/* 📸 Image upload */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                            <FormItem>
                                <FormLabel>Upload Image</FormLabel>
                                <FormControl>
                                    <label className="relative w-32 h-32 rounded-full border cursor-pointer overflow-hidden">
                                        {imagePreview ? (
                                            <img src={imagePreview} className="w-full h-full object-cover" />
                                        ) : (
                                            <img
                                                src="/camera.svg"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8"
                                            />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </label>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 🧍 Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 📝 Bio */}
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>About</FormLabel>
                                <FormControl>
                                    <Input placeholder="Write about yourself" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 🔗 Social Media URL */}
                    <FormField
                        control={form.control}
                        name="socialMediaURL"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Social Media URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 🔥 Continue Button */}
                    <Button type="submit" className="w-full">
                        Continue
                    </Button>

                </form>
            </Form>
        </div>
    );
}