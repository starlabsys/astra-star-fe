import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";

interface SukuCadang {
  name: string;
  qty: number;
}
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
  const { listDetail, setListDetail, pushDetailHistory, pushDetailData } =
    useDetailHistoryService(uuid);
  const [pekerjaan, setPekerjaan] = useState<Pekerjaan[]>(
    item?.pekerjaan || [],
  );
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const [dataItem, setDataItem] = useState<any>({});

  // Add new pekerjaan
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

  // Update pekerjaan data
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

  // Add new sukuCadang to specific pekerjaan
  const addSukuCadang = (pekerjaanIndex: number) => {
    const updatedPekerjaan = pekerjaan.map((p, i) =>
      i === pekerjaanIndex
        ? { ...p, sukuCadang: [...p.sukuCadang, { name: "", qty: 0 }] }
        : p,
    );

    setPekerjaan(updatedPekerjaan);
  };

  // Update sukuCadang data
  const handleSukuCadangChange = (
    pekerjaanIndex: number,
    sukuCadangIndex: number,
    field: keyof SukuCadang,
    value: string,
  ) => {
    const updatedPekerjaan = pekerjaan.map((p, i) =>
      i === pekerjaanIndex
        ? {
            ...p,
            sukuCadang: p.sukuCadang.map((sc, j) =>
              j === sukuCadangIndex ? { ...sc, [field]: value } : sc,
            ),
          }
        : p,
    );

    setPekerjaan(updatedPekerjaan);
  };

  // Remove sukuCadang from specific pekerjaan
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
  // Local state for all fields
  const [id, setId] = useState<string>(item?.id || "");
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
  const [kondisiBensin, setKondisiBensin] = useState<number>(
    Number(item?.kondisiBensin) || 0,
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
  const [kmAkhirMotor, setkmAkhirMotor] = useState<number>(
    Number(item?.kmAkhirMotor) || 0,
  );
  const [kodePos, setkodePos] = useState<string>(item?.kodePos || "");
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
    setDataItem({
      id,
      namaPemilik,
      tglBeli,
      platNumber,
      nomorMesin,
      nomorRangka,
      typeMotor,
      tahunMotor,
      kondisiBensin,
      kmAkhirMotor,
      kodePos,
      noKTP,
      noHP,
      alamat,
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      rt,
      rw,
      typeComingCustomer,
      alasanKeAhass,
      hsoIdPenerima,
      saranMekanik,
      // description,
    });
  }, [
    id,
    namaPemilik,
    tglBeli,
    platNumber,
    nomorMesin,
    nomorRangka,
    typeMotor,
    tahunMotor,
    kondisiBensin,
    noKTP,
    noHP,
    alamat,
    kmAkhirMotor,
    kodePos,
    provinsi,
    kota,
    kecamatan,
    kelurahan,
    rt,
    rw,
    typeComingCustomer,
    alasanKeAhass,
    hsoIdPenerima,
    saranMekanik,
    // description,
  ]);

  return (
    <Modal
      backdrop={`blur`}
      isOpen={isOpen}
      scrollBehavior={"inside"}
      size={`5xl`}
      onOpenChange={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Modal Title
            </ModalHeader>
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
                  label="Km Akhir Motor"
                  value={kmAkhirMotor.toString()}
                  onChange={(e) => setNomorRangka(e.target.value)}
                />
                <Input
                  label="Kode Pos"
                  value={kodePos}
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
                  value={kondisiBensin.toString()}
                  onChange={(e) => setKondisiBensin(Number(e.target.value))}
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
              </div>
              <div>
                {/* Dynamic Pekerjaan Section */}
                <div className="mt-4">
                  <h3>Pekerjaan</h3>
                  {pekerjaan.map((job, pekerjaanIndex) => (
                    <div
                      key={pekerjaanIndex}
                      className={`border-t-1 border-gray-200 py-2`}
                    >
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
                        <div className="mt-4">
                          <h4>Suku Cadang</h4>
                          {job.sukuCadang.map((sukuCadang, sukuCadangIndex) => (
                            <div
                              key={sukuCadangIndex}
                              className="grid grid-cols-2 gap-4 mb-2"
                            >
                              <Input
                                label="Nama Suku Cadang"
                                value={sukuCadang.name}
                                onChange={(e) =>
                                  handleSukuCadangChange(
                                    pekerjaanIndex,
                                    sukuCadangIndex,
                                    "name",
                                    e.target.value,
                                  )
                                }
                              />
                              <Input
                                label="Jumlah"
                                type="number"
                                value={sukuCadang.qty.toString()}
                                onChange={(e) =>
                                  handleSukuCadangChange(
                                    pekerjaanIndex,
                                    sukuCadangIndex,
                                    "qty",
                                    e.target.value,
                                  )
                                }
                              />
                              <Button
                                color="danger"
                                onClick={() =>
                                  removeSukuCadang(
                                    pekerjaanIndex,
                                    sukuCadangIndex,
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                          <Button onClick={() => addSukuCadang(pekerjaanIndex)}>
                            Add Suku Cadang
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button onClick={addPekerjaan}>Add Pekerjaan</Button>
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
                  // console.log(dataItem, pekerjaan);
                  pushDetailData(dataItem, pekerjaan);
                  onClose;
                }}
              >
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDetailHistory;
