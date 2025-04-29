'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form, FormField, FormItem, FormLabel, FormControl, FormMessage
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { PaymentSchema, type PaymentType } from "./CreatorFormUtils"
import CountrySelect from "./Countries"


export default function CreatorFormPayment() {

    // ✅ useForm ашиглан Zod-ийн validation-г формд холбож, form-н анхны утгуудыг defaultValues ашиглан зааж өгч байна
    // 🛠️ initialize react-hook-form + Zod + define default value
    const form = useForm<PaymentType>({
        resolver: zodResolver(PaymentSchema),
        defaultValues: {
            country: "",
            firstname: "",
            lastname: "",
            cardNumber: "",
            expires: "",
            year: "",
            cvc: "",
        },
    })

    //values = all input values
    const onSubmit = (values: PaymentType) => {
        console.log("✅ Payment Submitted:", values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Country */}


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <CountrySelect></CountrySelect>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Last Name */}
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" autoComplete="family-name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Card Number */}
                <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={16}
                                    autoComplete="cc-number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-3 gap-4">
                    {/* Exp. Month */}
                    <FormField
                        control={form.control}
                        name="expires"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Exp. Month</FormLabel>
                                <FormControl>
                                    <Input placeholder="MM" maxLength={2} autoComplete="cc-exp-month" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Exp. Year */}
                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Exp. Year</FormLabel>
                                <FormControl>
                                    <Input placeholder="2026" maxLength={4} autoComplete="cc-exp-year" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* CVC */}
                    <FormField
                        control={form.control}
                        name="cvc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl>
                                    <Input placeholder="123" maxLength={4} autoComplete="cc-csc" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full">
                    Submit Payment
                </Button>
            </form>
        </Form>
    )
}
