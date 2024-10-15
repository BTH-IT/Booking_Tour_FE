import { Trash2, Upload } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { IRoomFile } from 'file';

const ManageRoomVideo = ({
  files,
  setFiles,
  title,
}: {
  files: IRoomFile[];
  setFiles: Dispatch<SetStateAction<IRoomFile[]>>;
  title: string;
}) => {
  const addFile = (newFiles: FileList | null) => {
    if (!newFiles || files.length >= 1) {
      return;
    }

    Array.from(newFiles).forEach((f: File, idx) => {
      if (idx > 0) {
        return;
      }
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, { id: uuidv4(), data: f }];
        return updatedFiles;
      });
    });
  };

  const editFile = (newFiles: FileList | null) => {
    if (!newFiles) {
      return;
    }

    Array.from(newFiles).forEach((f: File) => {
      setFiles([{ id: uuidv4(), data: f }]);
    });
  };

  const deleteFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className="w-[1000px]">
      <div className="flex items-center mb-6">
        <div className="flex gap-11 items-center">
          <h1 className="w-full text-xl font-medium text-gray-800">{title}</h1>
          <div className="w-full flex justify-between items-center">
            <Input
              accept="video/*"
              type="file"
              onChange={(event) => addFile(event.target.files ?? null)}
              onClick={(event) => (event.currentTarget.value = '')}
              className="add_video hidden"
            />
            <Input
              accept="video/*"
              type="file"
              onChange={(event) => editFile(event.target.files ?? null)}
              onClick={(event) => (event.currentTarget.value = '')}
              className="edit_video hidden"
            />
            <Button
              onClick={() =>
                (
                  document.querySelector('.add_video') as HTMLInputElement
                )?.click()
              }
              type="button"
              className="flex gap-3 items-center justify-center rounded-md text-xl py-7"
              disabled={files.length >= 1}
            >
              Upload Video
              <Upload className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
      <div className="min-h-[200px]">
        {files.length > 0 && (
          <div className="w-fit">
            {files.map((file, idx) => (
              <div
                key={`${idx}-${file.id}`}
                className="flex flex-col min-w-[400px] h-fit mb-2 py-5 px-5 border-solid border-[1px] border-gray-300 rounded-md my-3"
              >
                <div className="w-[400px] h-[200px]">
                  {file.data ? (
                    <video
                      controls
                      className="rounded-md object-contain w-full h-full px-2"
                    >
                      <source
                        src={URL.createObjectURL(file.data)}
                        type={file.data.type}
                      />
                    </video>
                  ) : (
                    <>
                      {file.url ? (
                        <video
                          controls
                          className="rounded-md object-contain w-full h-full px-2"
                        >
                          <source
                            src={file.url}
                            type={file.type ? `${file.type}` : 'video/mp4'}
                          />
                        </video>
                      ) : (
                        <img
                          src="error-video.jpg"
                          alt="video"
                          className="rounded-md object-fit w-[400px] h-[200px]"
                        />
                      )}
                    </>
                  )}
                </div>
                <div className="flex gap-3 px-2 pt-5">
                  <Button
                    onClick={() => {
                      (
                        document.querySelector(
                          '.edit_video',
                        ) as HTMLInputElement
                      )?.click();
                    }}
                    variant="primary"
                    type="button"
                    className="w-[50%] rounded-md"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteFile(file.id)}
                    variant="destructive"
                    type="button"
                    className="w-[50%] rounded-md"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRoomVideo;
