import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex flex-col px-7 py-2 gap-4'>
        <Image src="/images/background-profile.png" alt="404" className='object-cover' width={1920} height={200} />
        {/* Caard */}
        <div className='relative top-[-72] grid grid-cols-5 gap-4 px-5'>
            <div className='col-span-1 p-4 flex flex-col bg-white border-1 border-gray-300 rounded-xl h-auto justify-items-center items-center'>
                <Image src='/images/profile-img.png' className='rounded-xl' alt='' width={150} height={150} />
                <div className='font-bold text-2xl mt-4'>
                    Junior Garcia
                </div>
                <div className='text-lg text-gray-400'>
                    Software Engineer
                </div>
                <div className='w-full rounded-md my-2 p-4 border-1 text-center border-gray-500'>
                    mail@mailexample.com
                </div>
                <div className='w-full rounded-md my-2 p-4 border-1 text-center border-gray-500'>
                    Software Engineer
                </div>
            </div>
            <div className='col-span-4 p-4 flex flex-col bg-white border-1 border-gray-300 rounded-xl h-auto justify-items-center items-center'>
                y
            </div>
        </div>
    </div>
  )
}

export default page