// src/components/ModalPkb.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { toast } from 'react-toastify';
import usePkbService from '@/src/module/admin/pkb/pkbService';

interface ModalPkbProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const ModalPkb: React.FC<ModalPkbProps> = ({ isOpen, onOpenChange }) => {
  const { importExcel, importXlsx } = usePkbService();
  const [fileExcel, setFileExcel] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fileExcel) {
      importXlsx(fileExcel)
        .then(() => {
          toast.success('File successfully imported!');
          setFileExcel(null); // Clear file after import
          onOpenChange(); // Optionally close the modal
        })
        .catch((error) => {
          toast.error('Error importing file');
        });
    }
  }, [fileExcel, importXlsx, onOpenChange]);

  const handleBrowseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split('.').pop();
      if (fileExtension === 'xlsx') {
        setFileExcel(file);
      } else {
        toast.error('Please select an xlsx file');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg">
                <div className="flex flex-col items-center justify-center text-gray-500 mb-4">
                  <svg className="w-12 h-12 mb-3" fill="currentColor" viewBox="0 0 24 24">
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
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </ModalBody>
            <ModalFooter className='flex justify-center item'>
              <Button color="primary" onPress={onClose}>
                Upload
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalPkb;
