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

const formSchema = z.object({
    identifier: z.string().min(3, "Please enter your username or email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignIn() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // You can later send `identifier` (username/email) to your login API
    }

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
                                {/* Identifier field (Email or Username) */}
                                <FormField
                                    control={form.control}
                                    name="identifier"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[14px] text-black">
                                                Username or Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter username or email"
                                                    {...field}
                                                    className="border outline-none focus-within:outline-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Password field */}
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
                                                    type="password"
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

                            <div className="flex gap-2 my-3 mx-1">
                                <p>Create new account?</p>
                                <Link href="/signUp">
                                    <p className="text-rose-400">Sign Up</p>
                                </Link>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}