import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

import useProfileService from "@/src/module/admin/profile/profileService";

const ModalProfileView: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const {
    tokenAntrian,
    setTokenAntrian,
    tokenWork,
    setTokenWork,
    fetchRefreshToken,
  } = useProfileService();

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
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg">
                <Input
                  className={`my-3`}
                  label={`Token Antrian`}
                  value={tokenAntrian}
                  onChange={(e) => {
                    setTokenAntrian(e.target.value);
                  }}
                />
                <Input
                  className={`my-3`}
                  label={`Token Work`}
                  value={tokenWork}
                  onChange={(e) => {
                    setTokenWork(e.target.value);
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-center item">
              <Button
                color="primary"
                onPress={() => {
                  onClose();
                  fetchRefreshToken();
                }}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalProfileView;
