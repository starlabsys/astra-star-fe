import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

import { PkbData } from "@/src/module/admin/pkb/pkbService";

const ModalDetailPkb: React.FC<{
  isOpen: boolean;
  item?: PkbData;
  onClose: () => void;
}> = ({ isOpen, item, onClose }) => {
  return (
    <div>
      <Modal backdrop="blur" isOpen={isOpen} size="5xl" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Detail Data
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Input
                    disabled
                    label="Nama Pemilik"
                    value={item?.namaPemilik}
                  />
                  <Input
                    disabled
                    label="Tanggal Pembelian"
                    value={item?.tglBeli}
                  />
                  <Input
                    disabled
                    label="Plat Nomor"
                    value={item?.platNumber.toString()}
                  />
                  <Input
                    disabled
                    label="Nomor Mesin"
                    value={item?.nomorMesin}
                  />
                  <Input
                    disabled
                    label="Nomor Rangka"
                    value={item?.nomorRangka}
                  />
                  <Input disabled label="Tipe Motor" value={item?.typeMotor} />
                  <Input
                    disabled
                    label="Tahun Motor"
                    value={item?.tahunMotor.toString()}
                  />
                  <Input
                    disabled
                    label="Kondisi Bahan Bakar"
                    value={item?.kondisiBensin.toString()}
                  />
                  <Input disabled label="No KTP" value={item?.noKTP} />
                  <Input disabled label="No Hp" value={item?.noHP} />
                  <Input disabled label="Alamat" value={item?.alamat} />
                  <Input disabled label="Provinsi" value={item?.provinsi} />
                  <Input disabled label="Kota" value={item?.kota} />
                  <Input disabled label="Kecamatan" value={item?.kecamatan} />
                  <Input disabled label="Kelurahan" value={item?.kelurahan} />
                  <Input disabled label="RT" value={item?.rt} />
                  <Input disabled label="RW" value={item?.rw} />
                  <Input
                    disabled
                    label="Tipe Coming Customer"
                    value={item?.typeComingCustomer}
                  />
                  <Input
                    disabled
                    label="Alasan Ke Ahass"
                    value={item?.alasanKeAhass}
                  />
                  <Input
                    disabled
                    label="HsoID Penerima"
                    value={item?.hsoIdPenerima}
                  />
                  <Input
                    disabled
                    label="Saran Mekanik"
                    value={item?.saranMekanik}
                  />
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
  );
};

export default ModalDetailPkb;
