
import { Coffee } from "lucide-react";
import Image from "next/image";

export const AuthSideBar = () => {
    return (
        <div className="bg-amber-400 w-[50%] text-black">
            <div className="w-full flex h-[15%] items-center px-20 gap-3">
                <Coffee size={20} strokeWidth={2.5} />
                <p className="text-[15px] font-bold">Buy Me Coffee</p>
            </div>
            <div className="w-full flex flex-col h-[85%] justify-center gap-10 items-center">
                <div className="w-[280px] h-[280px] bg-amber-500 rounded-full overflow-hidden flex justify-center items-center">
                    <Image
                        src={"/coffee.png"}
                        alt="coffee"
                        width={300}
                        height={300}
                        className="w-[215px] h-[246px] mt-10"
                    />
                </div>
                <h1 className="text-[24px] font-bold ">Fund your creative work</h1>
                <p className="text-[17px] mb-32 font-normal font-[Manrope] w-[420px]  text-center">
                    Accept support. Start a membership. Setup a shop. It’s easier than you
                    think.
                </p>
            </div>
        </div>
    );
}; 