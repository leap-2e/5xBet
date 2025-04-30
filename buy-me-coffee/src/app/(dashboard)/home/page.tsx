import { Coffee } from "lucide-react";
import Link from "next/link";

export default function Home () {
    return (
     <div>
      
      <div className="flex justify-between">
                <div className="flex gap-3 font-bold">
                    <Coffee className="size-7"></Coffee>
                    <div>Buy Me Coffee</div>
                </div>
                <div>
                    profileg bichnee
                </div>
            </div>
            <div className="pt-9 flex gap-30">
                <div className="text-[Inter] flex flex-col gap-1 ">
                    <Link href={`/home`}><p>Home</p></Link>
                    <Link href={`/explore`}><p>Explore</p></Link>
                    <Link href={`/explore`}><p>View page</p></Link>
                    <Link href={`/settings`}><p>Account settings</p></Link>
                </div>
                
     </div>
     </div>
    )
 }