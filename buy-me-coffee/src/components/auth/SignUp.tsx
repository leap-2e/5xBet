"use client";

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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    username: z.string().min(2, "Username must be at least 2 characters"),
});

export default function SignUp() {
    const router = useRouter();
    const { signUp, isLoaded, setActive } = useSignUp();
    const [error, setError] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!isLoaded) return;

        try {
            const result = await signUp.create({
                emailAddress: values.email,
                password: values.password,
                username: values.username,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                console.log("✅ Signed up successfully");
                toast.success("Successfully ✅ Signed Up");
                router.push("/createProfile");
            } else {
                console.log("⏳ Awaiting further steps (like email verification)");
            }
        } catch (err: any) {
            const errorMessage = err?.errors?.[0]?.message || "Something went wrong.";
            console.error("SignUp error:", errorMessage);
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div className="py-10 px-20 w-[100%] h-screen">

            <div className="h-full w-full px-32 flex flex-col gap-4 justify-center items-center">
                <div className="w-[400px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex flex-col gap-2">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[14px] text-black">
                                                Username
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your username"
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[14px] text-black">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your email"
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
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[14px] text-black">
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter your password"
                                                    {...field}
                                                    className="border outline-none focus-within:outline-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full rounded-md bg-[#18181b]"
                            >
                                Sign Up
                            </Button>
                        </form>
                    </Form>
                    {error && (
                        <div className="text-red-500 text-sm text-center mt-4">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}