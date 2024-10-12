"use client";
import Image from "next/image";
import React from "react";
import { Button, Input, useDisclosure } from "@nextui-org/react";

import useProfileService from "@/src/module/admin/profile/profileService";
import ModalProfileView from "@/src/module/admin/profile/modalProfileView";

const ProfileView = () => {
  const { profile } = useProfileService();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const data = {
  //   id: 13,
  //   username: "Testing3Akun",
  //   password: "$2b$08$Az2qU3lxIEdiMrr5bfCZ2uTAKjs3NiF3amAjYG6nb8sJqeQyTuxLW",
  //   name: "Testing3Akun",
  //   refreshTokenAntrian:
  //     "8B8A6CDF417694E3E7547183E696EBDDE699B188AF4FD15739B83309F37A14EC-1",
  //   refreshTokenWork:
  {
    /*    "C1B4B9F9F21B71587802C863F4343EB04AF6B470CCFF26B05F1A19C330684AFA-1",*/
  }
  {
    /*  refreshTokenPart:*/
  }
  {
    /*    "0B0DC3597B592B375A155E4663EDBF1D4EDC30838E775E3A6F01F698D2D77F64-1",*/
  }
  //   tokenAntrian:
  //     "eyJhbGciOiJSUzI1NiIsImtpZCI6IkUwM0FBMkNEMzQ1OTE5NkIxNDBEMzVEQUFGOEY3OUQ3IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2lkZW50aXR5LXRybi5zdGFyLmFzdHJhLmNvLmlkLyIsIm5iZiI6MTcyNzg4ODUyNCwiaWF0IjoxNzI3ODg4NTI0LCJleHAiOjE3Mjc5NzQ5MjQsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsInN0YXJfYXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbImV4dGVybmFsIl0sImNsaWVudF9pZCI6InN0YXJfYXBpIiwic3ViIjoiZjQ0MmY2ZWU2Zjg1NDVlNWI3ZDNmNGFiYTEzNjkxZDciLCJhdXRoX3RpbWUiOjE3Mjc4ODY5ODIsImlkcCI6IkF6dXJlQjJDIiwibmFtZSI6InN0YXJraW9zazA5MDQ1IHN0YXJraW9zazA5MDQ1IiwiZ2l2ZW5uYW1lIjoic3Rhcmtpb3NrMDkwNDUiLCJzdXJuYW1lIjoic3Rhcmtpb3NrMDkwNDUiLCJlbWFpbCI6InN0YXJraW9zazA5MDQ1IiwiZGVhbGVyVGltZXpvbmUiOiIwNzowMDowMCIsInJvbGVzIjoiW3tcdTAwMjJJZFx1MDAyMjpcdTAwMjIwNTkyNWE0ODhhZWQ0ZTAzOWNjYjFhOTIyYjQ1NDVhNlx1MDAyMixcdTAwMjJDb25uZWN0aW9uVHlwZVx1MDAyMjpcdTAwMjJCdXNpbmVzc0FyZWFcdTAwMjIsXHUwMDIyQ29ubmVjdGlvbklkXHUwMDIyOlx1MDAyMjc4YTI5ZjVjOTg0MGVkMTFhOWI4ODAzOGZiZTEwYzJmXHUwMDIyfV0iLCJzaWQiOiI4MkNBNTNCNEM5MUFDNTIzODJFMjZGNDI3MjQ2RkExQSIsImp0aSI6IkM0OURBRTFGNzVCNzlCOERENTFCM0Y5MjBGNUUwRTI1In0.N6KfN3MjkKXbBtSN6whPrYVj4SEb2NcKbT3t-0jNpLUVEa8ESDzFPSmbt0sb30-6pm9IBGmmxUg3GwSej1Rmzn05Ue1N9WA4NkP-R9Yn8KPNSpGev6KGctUsaQPDJElo_N0gUoP-7fD5Zvt5eXw2W1Vh8Rw43wv90QxeHa60ao3jux8IY7T8MSpdNvXx9bAeLAi10UxdgFxybsycfRKS4lUpkqKejBqEUomELuW6EOKakx8c2w1saDEOV4-EUoulesaq_PxLHYHQ7E821i6ft6yofiXe_p3T4UcgSYlU08qQVxJroTyG0QXB5Qu9xnEC8oYIyJPg7OWMEgvm5eQCJg",
  //   tokenWork:
  //     "eyJhbGciOiJSUzI1NiIsImtpZCI6IkUwM0FBMkNEMzQ1OTE5NkIxNDBEMzVEQUFGOEY3OUQ3IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2lkZW50aXR5LXRybi5zdGFyLmFzdHJhLmNvLmlkLyIsIm5iZiI6MTcyNzg4ODUyNCwiaWF0IjoxNzI3ODg4NTI0LCJleHAiOjE3Mjc5NzQ5MjQsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsInN0YXJfYXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbImV4dGVybmFsIl0sImNsaWVudF9pZCI6InN0YXJfYXBpIiwic3ViIjoiMmZlMjJjZTgxYWE3NDM3ZjkwMWVmNmY4NGU4ZWNmYTYiLCJhdXRoX3RpbWUiOjE3Mjc4ODcwNDMsImlkcCI6IkF6dXJlQjJDIiwibmFtZSI6InN0YXJzZXJ2aWNlYWR2aXNvcjA5MDQ1IHN0YXJzZXJ2aWNlYWR2aXNvcjA5MDQ1IiwiZ2l2ZW5uYW1lIjoic3RhcnNlcnZpY2VhZHZpc29yMDkwNDUiLCJzdXJuYW1lIjoic3RhcnNlcnZpY2VhZHZpc29yMDkwNDUiLCJlbWFpbCI6InN0YXJzZXJ2aWNlYWR2aXNvcjA5MDQ1IiwiZGVhbGVyVGltZXpvbmUiOiIwNzowMDowMCIsInJvbGVzIjoiW3tcdTAwMjJJZFx1MDAyMjpcdTAwMjJlNDkyMTBlN2I0OGU0MzJkOGYyNjA5NDcxYTU4ZTgyZFx1MDAyMixcdTAwMjJDb25uZWN0aW9uVHlwZVx1MDAyMjpcdTAwMjJCdXNpbmVzc0FyZWFcdTAwMjIsXHUwMDIyQ29ubmVjdGlvbklkXHUwMDIyOlx1MDAyMjc4YTI5ZjVjOTg0MGVkMTFhOWI4ODAzOGZiZTEwYzJmXHUwMDIyfSx7XHUwMDIySWRcdTAwMjI6XHUwMDIyZDM0MTc5ODFhYzkzNGQ4ZWJhMzU0ZjI5MjJhNmFlMGFcdTAwMjIsXHUwMDIyQ29ubmVjdGlvblR5cGVcdTAwMjI6XHUwMDIyQnVzaW5lc3NBcmVhXHUwMDIyLFx1MDAyMkNvbm5lY3Rpb25JZFx1MDAyMjpcdTAwMjI3OGEyOWY1Yzk4NDBlZDExYTliODgwMzhmYmUxMGMyZlx1MDAyMn0se1x1MDAyMklkXHUwMDIyOlx1MDAyMjgwNTQ1NDY2Y2RiMTQyZmZhN2RiMDc4NTNlMTg4YjNmXHUwMDIyLFx1MDAyMkNvbm5lY3Rpb25UeXBlXHUwMDIyOlx1MDAyMkJ1c2luZXNzQXJlYVx1MDAyMixcdTAwMjJDb25uZWN0aW9uSWRcdTAwMjI6XHUwMDIyNzhhMjlmNWM5ODQwZWQxMWE5Yjg4MDM4ZmJlMTBjMmZcdTAwMjJ9XSIsInNpZCI6IjQzQjEzQTgzNDUwNTlCRTMyQTlCMTlDMTBFMTEyM0Q5IiwianRpIjoiNTY2M0M4QTAwODVFOUFDM0RCMTFFRjA5QjQwNTQ2MEIifQ.nVMXJ7bjpEcSFgakfcQ9jkar4YU6djBR5l4dAdqAMEGA_ZN-U4qSVwonPtLmyTa4UrKuM28eScj2OO8Gnd9-HnUKujb9HHFWPbpvmkLLQ51tQVbLWFXG0LY-uiWooTLavQ6LYQwMfq1uzTQXxCS4uU7Z-X0JB_m7Q8ge44oG4QbGnsztCSUhWtucsaeo8SdFnml7z0g20YMaaG33AijDOkCbPSNIHDmqye8vWL2eFyTP5HWqnTMowhwz9gI4ufF-CypTmgv6YlFyXjOp7dQ9uGExVyRodGWRx-mqi0y8JEsEv9hVhXLyYM59bhJbTcTfeWjg4yiQCkDoHAAFcEbVWA",
  //   tokenPart:
  //     "eyJhbGciOiJSUzI1NiIsImtpZCI6IkUwM0FBMkNEMzQ1OTE5NkIxNDBEMzVEQUFGOEY3OUQ3IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2lkZW50aXR5LXRybi5zdGFyLmFzdHJhLmNvLmlkLyIsIm5iZiI6MTcyNzg4ODUyNSwiaWF0IjoxNzI3ODg4NTI1LCJleHAiOjE3Mjc5NzQ5MjUsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsInN0YXJfYXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbImV4dGVybmFsIl0sImNsaWVudF9pZCI6InN0YXJfYXBpIiwic3ViIjoiMTlhNWU0ZTA2OWZiNGE4MGI5YmRiOTAyNzMwNjE5ZWQiLCJhdXRoX3RpbWUiOjE3Mjc4ODc2MzksImlkcCI6IkF6dXJlQjJDIiwibmFtZSI6InN0YXJwYXJ0bWFuMDkwNDUgc3RhcnBhcnRtYW4wOTA0NSIsImdpdmVubmFtZSI6InN0YXJwYXJ0bWFuMDkwNDUiLCJzdXJuYW1lIjoic3RhcnBhcnRtYW4wOTA0NSIsImVtYWlsIjoic3RhcnBhcnRtYW4wOTA0NSIsImRlYWxlclRpbWV6b25lIjoiMDc6MDA6MDAiLCJyb2xlcyI6Ilt7XHUwMDIySWRcdTAwMjI6XHUwMDIyZTE0YmYyYmYyZWE5NGEyZWI4OGE5MTA2YjU2YjcyODNcdTAwMjIsXHUwMDIyQ29ubmVjdGlvblR5cGVcdTAwMjI6XHUwMDIyQnVzaW5lc3NBcmVhXHUwMDIyLFx1MDAyMkNvbm5lY3Rpb25JZFx1MDAyMjpcdTAwMjI3OGEyOWY1Yzk4NDBlZDExYTliODgwMzhmYmUxMGMyZlx1MDAyMn1dIiwic2lkIjoiOENFMTZDNkRENTY3MjM1MzA2MUJBQ0M0RTJCODBERDIiLCJqdGkiOiI1MUREN0Y0MjNCNjkwMENFRDQ2QUExMUFDM0ExNEY3QiJ9.q0bBUEgvkpaPW3-i5zpXKVaDJyib-0NNKSHb4AAvpIepNzbUfK_O6KvPYUzyk34YjupKhrHpnjQToB99vtS_vfA-8A5O_LjJfxdm4BgdHiztgGus5zSjMcUNErsvOcXmz-nOANf3drq1XPhZTfL36MtPDQOhwOXJEhmq9dG9bWXfzmMt-k8iodPEPG4fLuaz5mNfCIgV_Cnm7l3OT2ktrYDWy3ZpwYAg1aziZ15zn1whyYijGuGQNLckT1yQYJJ3dYzfLt4PpuhUoOwGQAZKR8D4KCkgsdEuGYQD0p5qGFwywf_xG6UmqwylODyGY48pIEljAQOI67TVW_oYnyzpEw",
  //   akun: "Testing3Akun",
  //   createdAt: "2024-10-02T16:48:28.446Z",
  //   updatedAt: "2024-10-02T17:02:00.916Z",
  //   deletedAt: null,
  //   statusToken: "IS_ACTIVE",
  //   isUseMultiRole: true,
  // };

  const handleOpen = () => {
    onOpen(); // Open the modal
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
          {/*<Button*/}
          {/*  // className={`mt-4 ${profile.statusToken === "IS_ACTIVE" ? "hidden" : ""}`}*/}
          {/*  className={`mt-4`}*/}
          {/*  color={`primary`}*/}
          {/*  variant={`ghost`}*/}
          {/*  onClick={() => {*/}
          {/*    fetchRefreshToken(*/}
          {/*      profile?.refreshTokenAntrian,*/}
          {/*      profile?.refreshTokenWork,*/}
          {/*      profile?.refreshTokenPart,*/}
          {/*    );*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Ambil Token Baru*/}
          {/*</Button>*/}

          <Button
            className="mt-4 capitalize"
            color="primary"
            variant="ghost"
            onPress={() => handleOpen()} // Pass item to handleOpen
          >
            Ganti Token
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
              value={profile?.name}
            />
            <Input
              isDisabled={true}
              label={`Username`}
              type={`text`}
              value={profile?.username}
            />
            <Input
              isDisabled={true}
              label={`Role`}
              type={`text`}
              value={profile?.akun}
            />
            <Input
              isDisabled={true}
              label={`Token Antrian`}
              type={`text`}
              value={profile?.refreshTokenAntrian}
            />
            <Input
              isDisabled={true}
              label={`Token Work`}
              type={`text`}
              value={profile?.refreshTokenWork}
            />
            <Input
              isDisabled={true}
              label={`Token Part`}
              type={`text`}
              value={profile?.refreshTokenPart}
            />
          </div>
        </div>
        <ModalProfileView isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  );
};

export default ProfileView;
