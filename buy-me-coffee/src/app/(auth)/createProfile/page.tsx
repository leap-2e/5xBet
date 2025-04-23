import CreatorFormPayment from "@/components/creator/CreatorFormPayment";
import CreatorFormProfileForm from "@/components/creator/CreatorFormProfile";

export default function CreateProfile() {
    return (
        <div className="flex items-center justify-center min-h-screen ">

            <div className="w-[510px] max-h-[710px] space-y-8 ">
                <h1 className="font-bold">Complete your profile page</h1>
                <CreatorFormProfileForm></CreatorFormProfileForm>

                {/* conditional render !*/}
                <div className="w-[510px] max-h-[710px] space-y-8 ">
                    <h1 className="font-bold">How would you like to be paid?
                        <p className="text-sm font-extralight">Enter location and payment details</p>
                    </h1>
                    <CreatorFormPayment></CreatorFormPayment>
                </div>

            </div>


        </div>
    )
}