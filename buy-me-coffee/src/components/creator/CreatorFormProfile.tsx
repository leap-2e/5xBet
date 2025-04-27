'use client'

import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { ProfileType, ProfileSchema } from "./CreatorFormUtils"


export default function CreatorFormProfile() {

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null)
    const [userData, setUserData] = useState<ProfileType>()

    // ✅ useForm ашиглан Zod-ийн validation-г формд холбож, form-н анхны утгуудыг defaultValues ашиглан зааж өгч байна
    // 🛠️ initialize react-hook-form + Zod + define default value
    const form = useForm<ProfileType>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: "",
            bio: "",
            image: undefined,
            socialMediaURL: "",
        }
    })

    //values = all input values 
    const onSubmit = (values: ProfileType) => {
        setUserData(values)
        console.log(values);

    }
    useEffect(() => { console.log(userData); }, [])
    return (
        <div className="w-full h-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* ✅📸 Image Upload Input */}

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
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

                    {/* ✅  Name Input */}

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name here here" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ✅ 📝 About Input */}

                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>About</FormLabel>
                                <FormControl>
                                    <Input placeholder="Write about yourself here" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ✅ 🔗 Social Media URL Input */}

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
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

