
import { Coffee, ExternalLink, Search, } from "lucide-react";
import Link from "next/link";


export default function Explore() {
    return (
        <div className=" m-11">
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
                
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-[20px]">Explore creators</h4>
                    <div className="relative w-full max-w-md">

                        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pb-6 pointer-events-none">
                            <i className="w-4 h-4 text-gray-400"><Search></Search></i>
                        </div>


                        <input
                            className="pl-9 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm mb-4 transition duration-200 w-full"
                            type="search"
                            placeholder="Search"
                        />
                    </div>

                 
                    <div className="grid grid-cols-3">
                    <div className="w-[909px] h-[224px] border border-gray-300 rounded-lg focus:outline-none  " >
                        <div className="m-3 flex flex-col gap-2">
                        <div className="flex justify-between ">
                        <div className="flex gap-2">
                        <img className="rounded-full size-[40px]" src={`/spacedog.jpg`}></img>
                        <p className="font-bold">Space ranger</p>
                        </div>
                        <button className="flex gap-2 bg-gray-200 rounded-lg w-[136px] items-center pl-2"> <Link href={`/profile`}><p>View profile</p></Link> <ExternalLink></ExternalLink></button>
                        </div>
                        <div className="flex gap-2">
                            <div className=" flex flex-col gap-2">
                                <p className="font-bold">About Space ranger</p>
                                <div className="text-[13px] w-[420px]">All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about clarity, focus, approachability, and having a little wry smile almost all the time.</div>

                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="font-bold">
                                Social media URL
                                </div>
                                <div className="text-[13px]">
                                https://buymeacoffee.com/baconpancakes1
                                </div>

                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

            </div>


        </div>
    )
}


{/* <div className="w-[909px] h-[224px] rounded-lg bg-amber-200  border-black  " >
                        <div className=" flex flex-col gap-2  h-[176px] m-3">
                            <div className="flex gap-2">
                                <img className="rounded-full size-[40px]" src={`/spacedog.jpg`}></img>
                                <div className="flex"><p className="font-bold">Space ranger</p>
                                <button>View profile</button></div>
                            </div>
                            <div className="flex gap-70">
                            <div>About Space ranger</div>
                            <div className="flex flex-col">
                            <div>Social media URL</div>
                            <div>https://buymeacoffee.com/baconpancakes1</div>
                            </div>
                            </div>
                            <div className="text-[13px] w-[420px]">All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about clarity, focus, approachability, and having a little wry smile almost all the time.</div>
                        </div>
                    </div> */}