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
import { useSignIn, useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { useEffect, useState } from "react";

// 🧠 Form validation - Zod ашиглаж байна
const SignInSchema = z.object({
    identify: z.string().min(1, "И-мэйл эсвэл хэрэглэгчийн нэр шаардлагатай"),
    password: z.string().min(8, "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой"),
});

export default function SignIn() {
    const router = useRouter();
    const { isSignedIn } = useAuth();
    const { signIn, isLoaded, setActive } = useSignIn();
    const [error, setError] = useState<string>("");

    // 🛠️ Form бүрдүүлэлт
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            identify: "",
            password: "",
        },
    });

    // 🚀 Form submit хийх үед
    const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
        if (!isLoaded) return; // Clerk бүрэн ачааллаж дуусаагүй бол буцаана

        try {
            const result = await signIn.create({
                identifier: values.identify, // ✉️ И-мэйл эсвэл хэрэглэгчийн нэрээр нэвтрэх
                password: values.password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId }); // 🛡️ Session идэвхжүүлнэ
                toast.success("✅ Амжилттай нэвтэрлээ!");
                router.push("/dashboard"); // 🎯 Dashboard руу чиглүүлнэ
            } else {
                toast.info("⏳ Нэмэлт алхмуудыг гүйцээнэ үү");
            }
        } catch (err: any) {
            const errorMessage = err?.errors?.[0]?.message || "Алдаа гарлаа. Дахин оролдоно уу.";
            console.error("SignIn error:", errorMessage);
            setError(errorMessage);
            toast.error(errorMessage); // 🔥 Алдааны popup
        }
    };

    // 🔥 Хэрэв аль хэдийн нэвтэрсэн бол шууд dashboard руу илгээнэ
    useEffect(() => {
        if (isSignedIn) {
            router.push("/dashboard");
        }
    }, [isSignedIn, router]);

    return (
        <div className="py-10 px-20 w-full h-screen">
            <div className="h-full w-full px-32 flex flex-col gap-4 justify-center items-center">
                <div className="w-[400px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex flex-col gap-2">
                                {/* ✉️ И-мэйл эсвэл Хэрэглэгчийн нэр оруулах хэсэг */}
                                <FormField
                                    control={form.control}
                                    name="identify"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[14px] text-black">Email эсвэл Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Email эсвэл username бичнэ үү"
                                                    {...field}
                                                    className="border outline-none focus-within:outline-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* 🔒 Нууц үг оруулах хэсэг */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[14px] text-black">Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Нууц үг бичнэ үү"
                                                    {...field}
                                                    className="border outline-none focus-within:outline-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* 🖱️ Submit товч */}
                            <Button type="submit" className="w-full rounded-md bg-[#18181b]">
                                Submit
                            </Button>

                            {/* 🔗 Бүртгэл байхгүй бол бүртгүүлэх линк */}
                            <div className="flex gap-2 my-3 mx-1">
                                <p>Бүртгэлгүй юу?</p>
                                <a href="/signUp" className="text-rose-400">
                                    Бүртгүүлэх
                                </a>
                            </div>
                        </form>
                    </Form>
                </div>
                {/* ⚠️ Алдааны мессеж */}
                {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                )}
            </div>
        </div>
    );
}