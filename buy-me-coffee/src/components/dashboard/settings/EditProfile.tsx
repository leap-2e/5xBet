'use client'

import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useState } from "react"
import { ProfileFormData, ProfileSchema } from "@/components/creator/FormUtils"


export default function EdithProfile() {

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null)
    const [userData, setUserData] = useState<ProfileFormData>()

    // ✅ useForm ашиглан Zod-ийн validation-г формд холбож, form-н анхны утгуудыг defaultValues ашиглан зааж өгч байна
    const form = useForm<ProfileFormData>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: "",
            bio: "",
            image: undefined,
            socialMediaURL: "",
        }
    })

    //values = all input values 
    const onSubmit = (values: ProfileFormData) => {
        setUserData(values)
        console.log(userData);

    }


    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files?.[0];
        if (!selected) return;
        setImage(selected);
        setImagePreview(URL.createObjectURL(selected));
    };

    return (
        <div className="w-full h-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <p className="font-bold">Personal Info</p>
                                <FormLabel>Add photo</FormLabel>
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
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) {
                                                    form.setValue("image", file)
                                                    setImagePreview(URL.createObjectURL(file))
                                                }
                                            }}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </label>
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
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jake" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>About</FormLabel>
                                <FormControl>
                                    <Input className="h-[131px]" placeholder="Write about yourself here" {...field} />
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
                                <FormLabel>Social media URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https.//" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" type="submit">Save Changes</Button>
                </form>
            </Form>
        </div>
    )
}