import { ListDatum } from '@/src/model/modelDetailHistory'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import React from 'react'

const ModalDetailHistory: React.FC<{isOpen: boolean,item?:ListDatum,onClose: ()=>void}> = ({
  isOpen,
  item,
  onClose
}) => {
  return (
    <div>
      <Modal size='5xl' backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Detail Data</ModalHeader>
              <ModalBody>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                  <Input label="Nama Pemilik" value={item?.namaPemilik} disabled/>
                  <Input label="Tanggal Pembelian" value={item?.tglBeli} disabled/>
                  <Input label="Plat Nomor" value={item?.platNumber} disabled/>
                  <Input label="Nomor Mesin" value={item?.nomorMesin} disabled/>
                  <Input label="Nomor Rangka" value={item?.nomorRangka} disabled/>
                  <Input label="Tipe Motor" value={item?.typeMotor} disabled/>
                  <Input label="Tahun Motor" value={item?.tahunMotor.toString()} disabled/>
                  <Input label="Kondisi Bahan Bakar" value={item?.kondisiBensin.toString()} disabled/>
                  <Input label="No KTP" value={item?.noKTP} disabled/>
                  <Input label="No Hp" value={item?.noHP} disabled/>
                  <Input label="Alamat" value={item?.alamat} disabled/>
                  <Input label="Provinsi" value={item?.provinsi} disabled/>
                  <Input label="Kota" value={item?.kota} disabled/>
                  <Input label="Kecamatan" value={item?.kecamatan} disabled/>
                  <Input label="Kelurahan" value={item?.kelurahan} disabled/>
                  <Input label="RT" value={item?.rt} disabled/>
                  <Input label="RW" value={item?.rw} disabled/>
                  <Input label="Tipe Coming Customer" value={item?.typeComingCustomer} disabled/>
                  <Input label="Alasan Ke Ahass" value={item?.alasanKeAhass} disabled/>
                  <Input label="HsoID Penerima" value={item?.hsoIdPenerima} disabled/>
                  <Input label="Saran Mekanik" value={item?.saranMekanik} disabled/>
                  <Input label="Deskripsi Gagal Upload" value={item?.description != "" ? item?.description :  "Tidak Ada"} disabled/>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ModalDetailHistory