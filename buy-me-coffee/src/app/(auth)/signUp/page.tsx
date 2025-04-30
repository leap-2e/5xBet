import SignUp from "@/components/auth/SignUp";
import YellowHalf from "@/components/auth/YellowHalf";

export default function register() {
    return (
        <div className="flex w-full h-full ">
            <div className="w-[50%]">
                <YellowHalf></YellowHalf>
            </div>
            <div className="flex w-[50%] items-center justify-center min-h-screen">
                <SignUp />
            </div>
        </div>
    )
}