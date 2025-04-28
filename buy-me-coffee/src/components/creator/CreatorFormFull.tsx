'use client'
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CreatorFormProfile from "./CreatorFormProfile";
import CreatorFormPayment from "./CreatorFormPayment";

export default function CreateUserForm() {
    const [step, setStep] = useState<number>(1);


    return (
        <div>
            <CreatorFormProfile>
            </CreatorFormProfile>
            <CreatorFormPayment>
            </CreatorFormPayment>Payment
        </div>
    );
}