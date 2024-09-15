import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import {
  ListDetailHistoryPkb,
  Pekerjaan,
} from "@/src/model/modelDetailHistory";
import useDetailHistoryService from "@/src/module/admin/history/detail/detailHistoryService";

const ModalDetailHistory: React.FC<{
  isOpen: boolean;
  item?: ListDetailHistoryPkb;
  uuid: string;
  onClose: () => void;
}> = ({ isOpen, item, onClose, uuid }) => {
  // Initialize pekerjaan state
  const { listDetail, setListDetail, pushDetailHistory } =
    useDetailHistoryService(uuid);
  const [pekerjaan, setPekerjaan] = useState<Pekerjaan[]>(
    item?.pekerjaan || [],
  );

  // Handler to add a new pekerjaan
  const addPekerjaan = () => {
    setPekerjaan([
      ...pekerjaan,
      {
        gudang: "",
        jenisPekerjaan: "",
        kategoriPekerjaan: "",
        namaPekerjaan: "",
        sukuCadang: [],
      },
    ]);
  };

  // Handler to remove a pekerjaan
  const removePekerjaan = (index: number) => {
    setPekerjaan(pekerjaan.filter((_, i) => i !== index));
  };

  // Handler to update pekerjaan data
  const handlePekerjaanChange = (
    index: number,
    field: keyof Pekerjaan,
    value: string,
  ) => {
    const updatedPekerjaan = pekerjaan.map((p, i) =>
      i === index ? { ...p, [field]: value } : p,
    );

    setPekerjaan(updatedPekerjaan);
  };

  // Handler to add a new sukuCadang to a specific pekerjaan
  const addSukuCadang = (pekerjaanIndex: number) => {
    const updatedPekerjaan = pekerjaan.map((p, i) =>
      i === pekerjaanIndex ? { ...p, sukuCadang: [...p.sukuCadang, ""] } : p,
    );

    setPekerjaan(updatedPekerjaan);
  };

  // Handler to remove a sukuCadang from a specific pekerjaan
  const removeSukuCadang = (
    pekerjaanIndex: number,
    sukuCadangIndex: number,
  ) => {
    const updatedPekerjaan = pekerjaan.map((p, i) =>
      i === pekerjaanIndex
        ? {
            ...p,
            sukuCadang: p.sukuCadang.filter((_, j) => j !== sukuCadangIndex),
          }
        : p,
    );

    setPekerjaan(updatedPekerjaan);
  };

  // Handler to update sukuCadang data
  const handleSukuCadangChange = (
    pekerjaanIndex: number,
    sukuCadangIndex: number,
    value: string,
  ) => {
    const updatedPekerjaan = pekerjaan.map((p, i) =>
      i === pekerjaanIndex
        ? {
            ...p,
            sukuCadang: p.sukuCadang.map((sc, j) =>
              j === sukuCadangIndex ? value : sc,
            ),
          }
        : p,
    );

    setPekerjaan(updatedPekerjaan);
  };

  // Local state for all fields
  const [namaPemilik, setNamaPemilik] = useState<string>(
    item?.namaPemilik || "",
  );
  const [tglBeli, setTglBeli] = useState<string>(item?.tglBeli || "");
  const [platNumber, setPlatNumber] = useState<string>(item?.platNumber || "");
  const [nomorMesin, setNomorMesin] = useState<string>(item?.nomorMesin || "");
  const [nomorRangka, setNomorRangka] = useState<string>(
    item?.nomorRangka || "",
  );
  const [typeMotor, setTypeMotor] = useState<string>(item?.typeMotor || "");
  const [tahunMotor, setTahunMotor] = useState<string>(
    item?.tahunMotor.toString() || "",
  );
  const [kondisiBensin, setKondisiBensin] = useState<string>(
    item?.kondisiBensin.toString() || "",
  );
  const [noKTP, setNoKTP] = useState<string>(item?.noKTP || "");
  const [noHP, setNoHP] = useState<string>(item?.noHP || "");
  const [alamat, setAlamat] = useState<string>(item?.alamat || "");
  const [provinsi, setProvinsi] = useState<string>(item?.provinsi || "");
  const [kota, setKota] = useState<string>(item?.kota || "");
  const [kecamatan, setKecamatan] = useState<string>(item?.kecamatan || "");
  const [kelurahan, setKelurahan] = useState<string>(item?.kelurahan || "");
  const [rt, setRT] = useState<string>(item?.rt || "");
  const [rw, setRW] = useState<string>(item?.rw || "");
  const [typeComingCustomer, setTypeComingCustomer] = useState<string>(
    item?.typeComingCustomer || "",
  );
  const [alasanKeAhass, setAlasanKeAhass] = useState<string>(
    item?.alasanKeAhass || "",
  );
  const [hsoIdPenerima, setHsoIdPenerima] = useState<string>(
    item?.hsoIdPenerima || "",
  );
  const [saranMekanik, setSaranMekanik] = useState<string>(
    item?.saranMekanik || "",
  );
  const [description, setDescription] = useState<string>(
    item?.description || "Tidak Ada",
  );

  // Synchronize state with the modal opening
  useEffect(() => {
    if (item) {
      setNamaPemilik(item.namaPemilik || "");
      setTglBeli(item.tglBeli || "");
      setPlatNumber(item.platNumber || "");
      setNomorMesin(item.nomorMesin || "");
      setNomorRangka(item.nomorRangka || "");
      setTypeMotor(item.typeMotor || "");
      setTahunMotor(item.tahunMotor.toString() || "");
      setKondisiBensin(item.kondisiBensin.toString() || "");
      setNoKTP(item.noKTP || "");
      setNoHP(item.noHP || "");
      setAlamat(item.alamat || "");
      setProvinsi(item.provinsi || "");
      setKota(item.kota || "");
      setKecamatan(item.kecamatan || "");
      setKelurahan(item.kelurahan || "");
      setRT(item.rt || "");
      setRW(item.rw || "");
      setTypeComingCustomer(item.typeComingCustomer || "");
      setAlasanKeAhass(item.alasanKeAhass || "");
      setHsoIdPenerima(item.hsoIdPenerima || "");
      setSaranMekanik(item.saranMekanik || "");
      setDescription(item.description || "Tidak Ada");
    }
  }, [item]);

  return (
    <Modal backdrop="blur" isOpen={isOpen} size="5xl" onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Detail Data</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Input
              label="Nama Pemilik"
              value={namaPemilik}
              onChange={(e) => setNamaPemilik(e.target.value)}
            />
            <Input
              label="Tanggal Pembelian"
              value={tglBeli}
              onChange={(e) => setTglBeli(e.target.value)}
            />
            <Input
              label="Plat Nomor"
              value={platNumber}
              onChange={(e) => setPlatNumber(e.target.value)}
            />
            <Input
              label="Nomor Mesin"
              value={nomorMesin}
              onChange={(e) => setNomorMesin(e.target.value)}
            />
            <Input
              label="Nomor Rangka"
              value={nomorRangka}
              onChange={(e) => setNomorRangka(e.target.value)}
            />
            <Input
              label="Tipe Motor"
              value={typeMotor}
              onChange={(e) => setTypeMotor(e.target.value)}
            />
            <Input
              label="Tahun Motor"
              value={tahunMotor}
              onChange={(e) => setTahunMotor(e.target.value)}
            />
            <Input
              label="Kondisi Bahan Bakar"
              value={kondisiBensin}
              onChange={(e) => setKondisiBensin(e.target.value)}
            />
            <Input
              label="No KTP"
              value={noKTP}
              onChange={(e) => setNoKTP(e.target.value)}
            />
            <Input
              label="No Hp"
              value={noHP}
              onChange={(e) => setNoHP(e.target.value)}
            />
            <Input
              label="Alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
            <Input
              label="Provinsi"
              value={provinsi}
              onChange={(e) => setProvinsi(e.target.value)}
            />
            <Input
              label="Kota"
              value={kota}
              onChange={(e) => setKota(e.target.value)}
            />
            <Input
              label="Kecamatan"
              value={kecamatan}
              onChange={(e) => setKecamatan(e.target.value)}
            />
            <Input
              label="Kelurahan"
              value={kelurahan}
              onChange={(e) => setKelurahan(e.target.value)}
            />
            <Input
              label="RT"
              value={rt}
              onChange={(e) => setRT(e.target.value)}
            />
            <Input
              label="RW"
              value={rw}
              onChange={(e) => setRW(e.target.value)}
            />
            <Input
              label="Tipe Coming Customer"
              value={typeComingCustomer}
              onChange={(e) => setTypeComingCustomer(e.target.value)}
            />
            <Input
              label="Alasan Ke Ahass"
              value={alasanKeAhass}
              onChange={(e) => setAlasanKeAhass(e.target.value)}
            />
            <Input
              label="HsoID Penerima"
              value={hsoIdPenerima}
              onChange={(e) => setHsoIdPenerima(e.target.value)}
            />
            <Input
              label="Saran Mekanik"
              value={saranMekanik}
              onChange={(e) => setSaranMekanik(e.target.value)}
            />
            <Input
              label="Deskripsi Gagal Upload"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input label="Tipe Motor" value={item?.typeMotor} />
            <Input label="Tahun Motor" value={item?.tahunMotor.toString()} />
            <Input
              label="Kondisi Bahan Bakar"
              value={item?.kondisiBensin.toString()}
            />
            <Input label="No KTP" value={item?.noKTP} />
            <Input label="No Hp" value={item?.noHP} />
            <Input label="Alamat" value={item?.alamat} />
            <Input label="Provinsi" value={item?.provinsi} />
            <Input label="Kota" value={item?.kota} />
            <Input label="Kecamatan" value={item?.kecamatan} />
            <Input label="Kelurahan" value={item?.kelurahan} />
            <Input label="RT" value={item?.rt} />
            <Input label="RW" value={item?.rw} />
            <Input
              label="Tipe Coming Customer"
              value={item?.typeComingCustomer}
            />
            <Input label="Alasan Ke Ahass" value={item?.alasanKeAhass} />
            <Input label="HsoID Penerima" value={item?.hsoIdPenerima} />
            <Input label="Saran Mekanik" value={item?.saranMekanik} />
            <Input
              label="Deskripsi Gagal Upload"
              value={item?.description || "Tidak Ada"}
            />
          </div>
          <div>
            {/* Dynamic Pekerjaan Section */}
            <div className="mt-4">
              <h3>Pekerjaan</h3>
              {pekerjaan.map((job, pekerjaanIndex) => (
                <div
                  key={pekerjaanIndex}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"
                >
                  <Input
                    label="Gudang"
                    value={job.gudang}
                    onChange={(e) =>
                      handlePekerjaanChange(
                        pekerjaanIndex,
                        "gudang",
                        e.target.value,
                      )
                    }
                  />
                  <Input
                    label="Jenis Pekerjaan"
                    value={job.jenisPekerjaan}
                    onChange={(e) =>
                      handlePekerjaanChange(
                        pekerjaanIndex,
                        "jenisPekerjaan",
                        e.target.value,
                      )
                    }
                  />
                  <Input
                    label="Kategori Pekerjaan"
                    value={job.kategoriPekerjaan}
                    onChange={(e) =>
                      handlePekerjaanChange(
                        pekerjaanIndex,
                        "kategoriPekerjaan",
                        e.target.value,
                      )
                    }
                  />
                  <Input
                    label="Nama Pekerjaan"
                    value={job.namaPekerjaan}
                    onChange={(e) =>
                      handlePekerjaanChange(
                        pekerjaanIndex,
                        "namaPekerjaan",
                        e.target.value,
                      )
                    }
                  />

                  {/* Dynamic SukuCadang Section */}
                  <div className="mt-2">
                    <h4>Suku Cadang</h4>
                    {job.sukuCadang.map((sc, sukuCadangIndex) => (
                      <div key={sukuCadangIndex} className="flex gap-2 mb-2">
                        <Input
                          label={`Suku Cadang ${sukuCadangIndex + 1}`}
                          value={sc}
                          onChange={(e) =>
                            handleSukuCadangChange(
                              pekerjaanIndex,
                              sukuCadangIndex,
                              e.target.value,
                            )
                          }
                        />
                        <Button
                          color="danger"
                          onPress={() =>
                            removeSukuCadang(pekerjaanIndex, sukuCadangIndex)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      color="success"
                      onPress={() => addSukuCadang(pekerjaanIndex)}
                    >
                      Add Suku Cadang
                    </Button>
                  </div>

                  <Button
                    color="danger"
                    onPress={() => removePekerjaan(pekerjaanIndex)}
                  >
                    Remove Pekerjaan
                  </Button>
                </div>
              ))}
              <Button color="success" onPress={addPekerjaan}>
                Add Pekerjaan
              </Button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button
            color="primary"
            onPress={() => {
              pushDetailHistory(item, pekerjaan);
              onClose();
            }}
          >
            Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDetailHistory;
