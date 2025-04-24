"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
export interface LoginTypes {
    username: string;
}
import Link from "next/link";
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});
interface SignProps {
    currentStep: any;
    setCurrentStep: (step: number) => void;
    setSignUps: (username: string) => void;
}
export default function SignUsername({
    currentStep,
    setCurrentStep,
    setSignUps,
}: SignProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        setCurrentStep(currentStep + 1);
        setSignUps(values.username);
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
            <div className="h-full w-full px-32 flex flex-col gap-4 justify-center items-center">
                <div>
                    <div>
                        <h1 className="text-[#09090B] text-[24px] font-semibold">
                            Create Your Account
                        </h1>
                        <p className="text-[#71717a] text-[14px]">
                            Choose a username for your page
                        </p>
                    </div>
                    <div className="w-[400px]">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
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
                                                    placeholder="Enter username here"
                                                    {...field}
                                                    className="border outline-none focus-within:outline-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full rounded-md bg-[#18181b]"
                                >
                                    Submit
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
} 