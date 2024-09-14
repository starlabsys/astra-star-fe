import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";
import { ListDetailHistoryPkb, Pekerjaan } from "@/src/model/modelDetailHistory";

const ModalDetailHistory: React.FC<{
  isOpen: boolean;
  item?: ListDetailHistoryPkb;
  onClose: () => void;
}> = ({ isOpen, item, onClose }) => {
  // Initialize pekerjaan state
  const [pekerjaan, setPekerjaan] = useState<Pekerjaan[]>(item?.pekerjaan || []);

  // Handler to add a new pekerjaan
  const addPekerjaan = () => {
    setPekerjaan([...pekerjaan, { gudang: "", jenisPekerjaan: "", kategoriPekerjaan: "", namaPekerjaan: "", sukuCadang: [] }]);
  };

  // Handler to remove a pekerjaan
  const removePekerjaan = (index: number) => {
    setPekerjaan(pekerjaan.filter((_, i) => i !== index));
  };

  // Handler to update pekerjaan data
  const handlePekerjaanChange = (index: number, field: keyof Pekerjaan, value: string) => {
    const updatedPekerjaan = pekerjaan.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    setPekerjaan(updatedPekerjaan);
  };

  // Handler to add a new sukuCadang to a specific pekerjaan
  const addSukuCadang = (pekerjaanIndex: number) => {
    const updatedPekerjaan = pekerjaan.map((p, i) =>
      i === pekerjaanIndex
        ? { ...p, sukuCadang: [...p.sukuCadang, ""] }
        : p
    );
    setPekerjaan(updatedPekerjaan);
  };

  // Handler to remove a sukuCadang from a specific pekerjaan
  const removeSukuCadang = (pekerjaanIndex: number, sukuCadangIndex: number) => {
    const updatedPekerjaan = pekerjaan.map((p, i) =>
      i === pekerjaanIndex
        ? { ...p, sukuCadang: p.sukuCadang.filter((_, j) => j !== sukuCadangIndex) }
        : p
    );
    setPekerjaan(updatedPekerjaan);
  };

  // Handler to update sukuCadang data
  const handleSukuCadangChange = (pekerjaanIndex: number, sukuCadangIndex: number, value: string) => {
    const updatedPekerjaan = pekerjaan.map((p, i) =>
      i === pekerjaanIndex
        ? {
          ...p,
          sukuCadang: p.sukuCadang.map((sc, j) => (j === sukuCadangIndex ? value : sc))
        }
        : p
    );
    setPekerjaan(updatedPekerjaan);
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} size="5xl" onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Detail Data</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Input disabled label="Nama Pemilik" value={item?.namaPemilik} />
            <Input disabled label="Tanggal Pembelian" value={item?.tglBeli} />
            <Input disabled label="Plat Nomor" value={item?.platNumber} />
            <Input disabled label="Nomor Mesin" value={item?.nomorMesin} />
            <Input disabled label="Nomor Rangka" value={item?.nomorRangka} />
            <Input disabled label="Tipe Motor" value={item?.typeMotor} />
            <Input disabled label="Tahun Motor" value={item?.tahunMotor.toString()} />
            <Input disabled label="Kondisi Bahan Bakar" value={item?.kondisiBensin.toString()} />
            <Input disabled label="No KTP" value={item?.noKTP} />
            <Input disabled label="No Hp" value={item?.noHP} />
            <Input disabled label="Alamat" value={item?.alamat} />
            <Input disabled label="Provinsi" value={item?.provinsi} />
            <Input disabled label="Kota" value={item?.kota} />
            <Input disabled label="Kecamatan" value={item?.kecamatan} />
            <Input disabled label="Kelurahan" value={item?.kelurahan} />
            <Input disabled label="RT" value={item?.rt} />
            <Input disabled label="RW" value={item?.rw} />
            <Input disabled label="Tipe Coming Customer" value={item?.typeComingCustomer} />
            <Input disabled label="Alasan Ke Ahass" value={item?.alasanKeAhass} />
            <Input disabled label="HsoID Penerima" value={item?.hsoIdPenerima} />
            <Input disabled label="Saran Mekanik" value={item?.saranMekanik} />
            <Input disabled label="Deskripsi Gagal Upload" value={item?.description || "Tidak Ada"} />


          </div>
          <div>
            {/* Dynamic Pekerjaan Section */}
            <div className="mt-4">
              <h3>Pekerjaan</h3>
              {pekerjaan.map((job, pekerjaanIndex) => (
                <div key={pekerjaanIndex} className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Gudang"
                    value={job.gudang}
                    onChange={(e) => handlePekerjaanChange(pekerjaanIndex, "gudang", e.target.value)}
                  />
                  <Input
                    label="Jenis Pekerjaan"
                    value={job.jenisPekerjaan}
                    onChange={(e) => handlePekerjaanChange(pekerjaanIndex, "jenisPekerjaan", e.target.value)}
                  />
                  <Input
                    label="Kategori Pekerjaan"
                    value={job.kategoriPekerjaan}
                    onChange={(e) => handlePekerjaanChange(pekerjaanIndex, "kategoriPekerjaan", e.target.value)}
                  />
                  <Input
                    label="Nama Pekerjaan"
                    value={job.namaPekerjaan}
                    onChange={(e) => handlePekerjaanChange(pekerjaanIndex, "namaPekerjaan", e.target.value)}
                  />

                  {/* Dynamic SukuCadang Section */}
                  <div className="mt-2">
                    <h4>Suku Cadang</h4>
                    {job.sukuCadang.map((sc, sukuCadangIndex) => (
                      <div key={sukuCadangIndex} className="flex gap-2 mb-2">
                        <Input
                          label={`Suku Cadang ${sukuCadangIndex + 1}`}
                          value={sc}
                          onChange={(e) => handleSukuCadangChange(pekerjaanIndex, sukuCadangIndex, e.target.value)}
                        />
                        <Button color="danger" onPress={() => removeSukuCadang(pekerjaanIndex, sukuCadangIndex)}>Remove</Button>
                      </div>
                    ))}
                    <Button color="success" onPress={() => addSukuCadang(pekerjaanIndex)}>Add Suku Cadang</Button>
                  </div>

                  <Button color="danger" onPress={() => removePekerjaan(pekerjaanIndex)}>Remove Pekerjaan</Button>
                </div>
              ))}
              <Button color="success" onPress={addPekerjaan}>Add Pekerjaan</Button>
            </div>
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
      </ModalContent>
    </Modal>
  );
};

export default ModalDetailHistory;
