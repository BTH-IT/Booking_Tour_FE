import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

const ShowMediaModal = ({
  isOpen,
  setIsOpen,
  media,
  video = false,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  media: string[];
  video?: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + media.length) % media.length,
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 w-screen h-screen max-w-screen max-h-screen bg-black [&_.close-icon]:w-10 [&_.close-icon]:h-10">
        <div className="flex relative justify-center items-center h-full w-full">
          <div className="flex h-full items-center justify-center aspect-video mt-12">
            {video ? (
              <video controls className="rounded-md object-contain h-[85vh]">
                <source
                  src={media[currentIndex]}
                  type={
                    `video/${media[0].split('.').reverse()[0]}` || 'video/mp4'
                  }
                />
              </video>
            ) : (
              <img
                src={media[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                className="rounded-md h-[85vh]"
              />
            )}
            <div
              className={cn(
                'absolute top-3 left-3 text-xl text-white px-2 py-1 rounded',
                video && 'hidden',
              )}
            >
              {currentIndex + 1} / {media.length}
            </div>
            <div className="absolute top-3 right-20 text-xl text-white px-2 py-1 rounded">
              <Button
                className="hover:text-gray-200 bg-black text-gray-400 hover:bg-black"
                onClick={() => window.open(media[currentIndex])}
              >
                <Download />
              </Button>
            </div>
          </div>
          <div
            className={cn(
              'absolute flex justify-between w-full p-4 rounded-b-lg',
              (video || media.length === 1) && 'hidden',
            )}
          >
            <Button
              variant="primary2"
              onClick={prevImage}
              className="bg-background w-12 h-12 p-2"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="primary2"
              onClick={nextImage}
              className="bg-background w-12 h-12 p-2"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowMediaModal;
