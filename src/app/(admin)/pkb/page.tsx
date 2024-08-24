"use client";
import { title } from '@/src/components/primitives'
import { Button } from '@nextui-org/button'
import React, { useState } from 'react'
import TablePkb from './TablePkb'
import ModalPkb from './ModalPkb'

const page: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
  return (
    <div className="w-full flex flex-col px-7 py-2 gap-4">
        <div className='flex justify-end py-2 px-4'>
            <Button type='button' color='primary' className={`text-xl`} variant={'solid'} onPress={handleOpenModal}>Upload File Excel</Button>
        </div>
        <div>
            <TablePkb />
        </div>
        <ModalPkb isOpen={isModalOpen} onOpenChange={handleCloseModal} />
    </div>

  )
}

export default page