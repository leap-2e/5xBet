"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
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
import Link from "next/link";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { SignInschema } from "./SignUtils";
import { useSignIn } from "@clerk/nextjs";

export default function SignIn() {

    const router = useRouter();
    const { signIn, isLoaded, setActive } = useSignIn(); //CLERK
    const form = useForm<z.infer<typeof SignInschema>>({
        resolver: zodResolver(SignInschema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async (values: z.infer<typeof SignInschema>) => {
        if (!isLoaded) return;

        try {
            const result = await signIn.create({
                identifier: values.email, // (email or username both work)
                password: values.password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                console.log("✅ Signed in successfully");
                toast.success("Successfully ✅ Signed In ")
                router.push("/createProfile");
            } else {
                console.log("⏳ Awaiting further steps (like 2FA)");
            }
        } catch (err: any) {
            const errorMessage = err?.errors?.[0]?.message || "Something went wrong. Please try again.";
            console.error("SignIn error:", errorMessage);
            toast.error(errorMessage);
        }
    };


    return (
        <div className="py-10 px-20 w-[100%] h-screen">

            <div className="h-full w-full px-32 flex flex-col gap-4 justify-center items-center">

                <div className="w-[400px]">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <div className="flex flex-col gap-2">
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
                                                    placeholder="Enter email here"
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
                                                    placeholder="Enter password here"
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
                                Submit
                            </Button>
                            <div className="flex gap-2 my-3 mx-1"> <p>Create new account?</p>
                                <Link href="/signUp"><p className="text-rose-400">Sign Up</p></Link>
                            </div>

                        </form>
                    </Form>
                </div>
            </div>
        </div>

    );
} 