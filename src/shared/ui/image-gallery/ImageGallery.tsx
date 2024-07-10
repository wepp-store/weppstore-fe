import {
  Image,
  Modal,
  Button,
  Divider,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { ImageGalleryProps } from './types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = ({
  title = 'Images',
  isOpen,
  onOpenChange,
  images,
  startIndex = 0,
  ...other
}: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      size="5xl"
      {...other}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {/* Image Gallery */}
            <ModalHeader>{title}</ModalHeader>
            <Divider />
            <ModalBody className="flex flex-row justify-between p-4">
              <Button
                className="self-center"
                isIconOnly
                onPress={handlePrev}
                variant="light"
              >
                <ChevronLeft size={32} />
              </Button>
              <Image
                src={images[currentIndex]}
                alt={`Image ${currentIndex}`}
                className="h-auto w-full max-h-[64vh] object-contain"
              />
              <Button
                className="self-center"
                isIconOnly
                onPress={handleNext}
                variant="light"
              >
                <ChevronRight size={32} />
              </Button>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ImageGallery;
