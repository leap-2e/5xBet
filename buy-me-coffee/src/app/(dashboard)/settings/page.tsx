

import EdithProfile from "@/components/dashboard/settings/EditProfile";
import ResetPass from "@/components/dashboard/settings/ResetPass";
import { Card, CardContent } from "@/components/ui/card";


export default function Settings() {
    return (
        <div className="w-full h-full flex items-center justify-center min-h-screen text-center bg-gray-300">
            <div className="w-[550px] block h-auto">
                <Card className=" flex gap-30 w-full " >
                    <CardContent>
                        <EdithProfile />
                    </CardContent>
                </Card >
                <Card className="   border-1 p-8 rounded-lg ">
                    <ResetPass />
                </Card>


            </div>
        </div >
    )
}
