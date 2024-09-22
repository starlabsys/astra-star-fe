"use client";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import TablePkb from "./TablePkb";
import ModalPkb from "./ModalPkb";
import { PkbProvider } from "./PkbContext";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isToken, setIsToken] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const token = Cookies.get("status_token");

    if (token === "IS_ACTIVE") {
      setIsToken(false);
    } else {
      setIsToken(false);
    }
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <PkbProvider>
        <div className="w-full flex flex-col px-7 py-2 gap-4">
          <div className="flex justify-end py-2 px-4">
            <Button
              className={`text-xl`}
              color="primary"
              isDisabled={isToken}
              type="button"
              variant={"solid"}
              onPress={handleOpenModal}
            >
              Upload File Excel
            </Button>
          </div>
          <div>
            <TablePkb />
          </div>
          <ModalPkb isOpen={isModalOpen} onOpenChange={handleCloseModal} />
        </div>
      </PkbProvider>
    </>
  );
};

export default page;
