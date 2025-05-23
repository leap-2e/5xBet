'use client'
import { useUserDataStore } from "@/app/hooks/zustand-User";
import CreatorFormPayment from "@/components/creator/CreatorFormPayment";
import CreatorFormProfileForm from "@/components/creator/CreatorFormProfile";
import { ProfileType } from "@/components/creator/CreatorFormUtils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { toast } from "sonner";

export default function CreateProfile() {
    const [formProfileFilled, setFormProfileFilled] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { profile, setProfile } = useUserDataStore()
    const { userId } = useAuth()

    // On Continue logic
    const onContinue = async (values: ProfileType) => {
        console.log('🛠️ Form values before upload:', values);
        if (!userId || !values.name || !values.bio || !imagePreview || !values.socialMediaURL) {
            console.log("⚠️ Missing required fields");
            toast("⚠️ Missing required fields");
            return;
        }
        setProfile({
            user_id: userId,
            username: values.name,
            about: values.bio,
            image: imagePreview,
            social_media_url: values.socialMediaURL,
        });
        setFormProfileFilled(true)
    };

    const Back = () => {
        setFormProfileFilled(false)
    }


    return (
        <div className="flex items-center justify-center min-h-screen text-center">
            <div className="absolute top-10"><UserButton></UserButton></div>

            {!formProfileFilled ?
                <div>
                    <div className="w-[510px] max-h-[710px] space-y-8 ">
                        <h1 className="font-bold">Complete your profile page</h1>
                        <CreatorFormProfileForm onContinue={onContinue}
                            setImagePreview={setImagePreview}
                            imagePreview={imagePreview}
                            imageFile={setImageFile}></CreatorFormProfileForm>
                    </div>
                </div>

                :

                <div>
                    <div className="w-[510px] max-h-[710px] space-y-8 ">

                        <h1 className="font-bold">How would you like to be paid?
                            <p className="text-sm font-extralight">Enter location and payment details</p>
                        </h1>

                        <CreatorFormPayment imageFile={imageFile}></CreatorFormPayment>
                        <Button onClick={Back} variant="outline" className="w-full ">Back</Button>

                    </div>
                </div>
            }
        </div>

    )
}
