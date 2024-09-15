"use client";
import Image from "next/image";
import React from "react";
import { Button, Input } from "@nextui-org/react";

import useProfileService from "@/src/module/admin/profile/profileService";

const ProfileView = () => {
  const { profile, setProfile, fetchData, fetchRefreshToken } =
    useProfileService();
  const data = {
    id: 9,
    username: "admin",
    password: "$2b$08$1oqKWihd6nmFIz.ZAhXBRemDp8S/5J78bQp1p.Y55Mv/pRU98UKuu",
    name: "Admin",
    refreshTokenAntrian:
      "BCBD1864500A10A0609428901FC2E97AA50E0E872CE231A4AD634D18205F82F3-1",
    refreshTokenWork:
      "DAB44B0574C06F1C6DAA03B412E8257B3ADA6BF6E0602C58CAE57E100A4E0FCA-1",
    akun: "Admin",
    createdAt: "2024-09-14T10:26:24.185Z",
    updatedAt: "2024-09-15T07:16:44.013Z",
    deletedAt: null,
    statusToken: "IS_ACTIVE",
  };

  if (!profile) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-full flex flex-col px-7 py-2 gap-4">
      <Image
        alt="404"
        className="object-cover"
        height={200}
        src="/images/background-profile.png"
        width={1920}
      />
      {/* Caard */}
      <div className="relative top-[-72] grid grid-cols-5 gap-4 px-5">
        <div className="col-span-1 p-4 flex flex-col bg-white border-1 border-gray-300 rounded-xl h-auto justify-items-center items-center">
          <Image
            alt=""
            className="rounded-xl"
            height={150}
            src="/images/profile-img.png"
            width={150}
          />
          <div className="font-bold text-2xl mt-4">{profile.name}</div>
          <div className="text-lg text-gray-400">{profile.akun}</div>
          <div
            className={`border-2 px-2 py-1 rounded-2xl font-semibold mt-4 ${profile.statusToken == "IS_ACTIVE" ? "border-green-400 text-green-400" : "border-red-600 text-red-600"} `}
          >
            {profile.statusToken}
          </div>
          <Button
            // className={`mt-4 ${profile.statusToken === "IS_ACTIVE" ? "hidden" : ""}`}
            className={`mt-4`}
            color={`primary`}
            variant={`ghost`}
            onClick={() => {
              fetchRefreshToken(
                profile?.refreshTokenAntrian,
                profile?.refreshTokenWork,
              );
            }}
          >
            Ambil Token Baru
          </Button>
          {/*<div className="w-full rounded-md my-2 p-4 border-1 text-center border-gray-500">*/}
          {/*  mail@mailexample.com*/}
          {/*</div>*/}
          {/*<div className="w-full rounded-md my-2 p-4 border-1 text-center border-gray-500">*/}
          {/*  Software Engineer*/}
          {/*</div>*/}
        </div>
        <div className="col-span-4 p-4 flex bg-white border-1 border-gray-300 rounded-xl h-auto">
          <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-4`}>
            <Input
              isDisabled={true}
              label={`Nama`}
              type={`text`}
              value={data.name}
            />
            <Input
              isDisabled={true}
              label={`Username`}
              type={`text`}
              value={data.username}
            />
            <Input
              isDisabled={true}
              label={`Role`}
              type={`text`}
              value={data.akun}
            />
            <Input
              isDisabled={true}
              label={`Token Antrian`}
              type={`text`}
              value={data.refreshTokenAntrian}
            />
            <Input
              isDisabled={true}
              label={`Token Work`}
              type={`text`}
              value={data.refreshTokenWork}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
