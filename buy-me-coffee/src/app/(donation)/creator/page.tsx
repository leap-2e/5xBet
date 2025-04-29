import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='[&>*]:mx-auto'>
      <div className='flex justify-between items-center py-4 w-[1280px]'>
        <Image src="https://res.cloudinary.com/df4naqoki/image/upload/v1745750704/Logo_1_ismxqn.png" alt="creator" width={151} height={24} />
        <div className='flex justify-between items-center w-[187px]'>
            <div className='flex gap-2 items-center'>
                <Image src="https://res.cloudinary.com/df4naqoki/image/upload/v1745287673/samples/dessert-on-a-plate.jpg" alt="creator" width={40} height={40} className='rounded-full bg-fill'/>
                <span>test</span>
            </div>
            <ChevronDown/>
        </div>
      </div>
      <div className='bg-red-800 h-[320px]'>
      </div>
      <div className='w-[1280px] flex gap-5'>
        <div className='flex-1'>

        </div>
        <div className='flex-1'>

        </div>
      </div>
    </div>
  )
}

export default page
