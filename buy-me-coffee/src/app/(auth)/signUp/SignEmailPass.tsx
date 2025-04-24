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
import Link from "next/link";
import { useEffect, useState } from "react";
const formSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});
export default function SignEmailPass({
    signUp,
}: {
    signUp: (email: string, password: string) => void;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [username, setUsername] = useState<string | null>(null);
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername);
    }, []);
    function onSubmit(values: z.infer<typeof formSchema>) {
        signUp(values.email, values.password);
        console.log(values);
    }
    return (
        <div className="py-10 px-20 w-[100%] h-screen">
            <div className="flex justify-end">
                <Link
                    href={"./login"}
                    className="bg-[#f4f4f5] text-black px-4 py-2 rounded-md cursor-pointer"
                >
                    Log in
                </Link>
            </div>
            <div className="h-full w-full flex flex-col gap-4 justify-center items-center">
                <div>
                    <div>
                        <div className="flex items-center  gap-2">
                            <h1 className="text-[#09090B] text-[24px] font-semibold">
                                Welcome ,
                            </h1>
                            <p className="text-[#09090B] text-[24px] font-semibold">
                                {username}
                            </p>
                        </div>
                        <p className="text-[#71717a] text-[14px]">
                            Connect email and set a password
                        </p>
                    </div>
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
                                    Continue
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
} 