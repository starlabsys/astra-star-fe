import React, { useRef } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { toast } from 'react-toastify';

interface ModalPkbProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

const ModalPkb: React.FC<ModalPkbProps> = ({ isOpen, onOpenChange }) => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleBrowseFiles = () => {
        // Trigger the file input when "Browse files" is clicked
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };
    
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files?.[0];
        if (files) {
            const fileExtension = files.name.split('.').pop();
            if (fileExtension === 'xlsx') {
              // Handle the xlsx file
              console.log('Excel file selected');
            } else {
              toast.error('Please select an xlsx file');
            }
        }
      };

  return (
    <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg">
                  <div className="flex flex-col items-center justify-center text-gray-500 mb-4">
                    <svg
                      className="w-12 h-12 mb-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2a5 5 0 0 1 5 5v6h3a3 3 0 0 1 0 6H4a3 3 0 0 1 0-6h3V7a5 5 0 0 1 5-5zm2 7V7a2 2 0 1 0-4 0v2H9v7h6v-7h-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="mb-1">Drag & drop to upload</p>
                    <p>
                      or <span className="text-blue-600 cursor-pointer" onClick={handleBrowseFiles}>Browse files</span>
                    </p>
                  </div>
                  {/* Hidden file input */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileChange} 
                  />
                </div>
                </ModalBody>
                <ModalFooter className='flex justify-center item'>
                    {/* <Button color="danger" variant="light" onPress={onClose}>
                    Close
                    </Button> */}
                    <Button color="primary" onPress={onClose}>
                        Upload
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    </>
  )
}

export default ModalPkb