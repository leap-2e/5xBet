import CreateProfile from "@/app/(auth)/createProfile/page";
import CreatorFormPayment from "@/components/creator/CreatorFormPayment";
import EdithProfile from "@/components/dashboard/settings/EditProfile";
import ResetPass from "@/components/dashboard/settings/ResetPass";
import { Coffee } from "lucide-react";
import Link from "next/link";

export default function Settings() {
    return (
        <div className="p-0 m-4 ">
            <div className="flex justify-between">
                <div className="flex gap-3 font-bold">
                    <Coffee className="size-7"></Coffee>
                    <div>Buy Me Coffee</div>
                </div>
                <div>
                    profileg bichnee
                </div>
            </div>
            <div className=" flex gap-30 pt-10 ml-4 ">
                <div className="text-[Inter] flex flex-col gap-1  ">
                    <Link href={`/home`}><p>Home</p></Link>
                    <Link href={`/explore`}><p>Explore</p></Link>
                    <Link href={`/explore`}><p>View page</p></Link>
                    <Link href={`/settings`}><p>Account settings</p></Link>
                </div>
                <div className=" flex flex-col gap-3">
                    <p className="font-bold text-[24px]" >My account</p>
                    <div className="w-[550px] h-[670px]  border-1 p-8 rounded-lg ">
                        <div><EdithProfile /></div>
                    </div>
                </div>

            </div>
            <div className="ml-64.5 pt-7 w-[550px] flex flex-col gap-8">
            <div className="   border-1 p-8 rounded-lg ">
                <ResetPass />
            </div>
            <div className=" border-1 p-8 rounded-lg">
                <CreatorFormPayment></CreatorFormPayment>
            </div>
            <div>
                
            </div>
            </div>
            
        </div>
    )
}